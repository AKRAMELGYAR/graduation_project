import hashed from "../../utils/encrypting/hashing.js";
import eventEmitter from "../../utils/emailEvents/index.js";
import signing from "../../utils/tokens/signing.js";
import { findUser, saveUser } from "../repo/authRepo.js";
import User from "../../user/model/userModel.js";

export const signUp = async (req, res, next) => {
    const { firstName, lastName, userName, email, password } = req.body;
    const user = await findUser({ payload: { email } });
    if (user)
        return next(new Error("user already exists", { cause: 400 }));
    const hashedPassword = await hashed(password);
    const addUser = await User({ firstName, lastName, userName, email, password: hashedPassword });

    const token = await signing({ payload: { email: addUser.email, id: addUser._id }, SECRET_KEY: process.env.JWT_SECRET_SIGNUP, expire: { expiresIn: "1d" } });
    res.cookie('JWT', token, {
        httpOnly: true,
        maxAge:24 * 60 * 60 * 1000
    })
    addUser.token = token;
    eventEmitter.emit("confrimEmail", { email,token });
    const newUser = await saveUser({ userData: addUser });
    return res.status(200).json({msg:"user created successfully"});
}