import User from "../model/userModel.js";
import hashed from "../../utils/encrypting/hashing.js";
import eventEmitter from "../../utils/emailEvents/index.js";
import signing from "../../utils/tokens/signing.js";
import verifying from "../../utils/tokens/veryfing.js";
import { findUser, saveUser } from "../repository/userRepo.js";

export const signUp = async (req, res, next) => {
    const { firstName, lastName, userName, email, password } = req.body;
    const user = await findUser({ payload: { email } });
    if (user)
        return next(new Error("user already exists", { cause: 400 }));
    const hashedPassword = await hashed(password);
    //new user{}
    //sign tomen
    //res.cookie (copy)
    //save user
    const token = await signing({payload:{email},SECRET_KEY:process.env.JWT_SECRET_SIGNUP,expire:{expiresIn:"1d"}});
    eventEmitter.emit("confrimEmail", { email,token });
    const newUser = await saveUser({userData:{ firstName, lastName, userName, email, password: hashedPassword }});
    return res.status(200).json({msg:"user created successfully"});
}

// export const confirmEmail = async (req, res, next) => {
//     const { token } = req.params;
//     const decoded = await verifying({ token, SECRET_KEY: process.env.JWT_SECRET_KEY, next });
//     const user = await User.findOneAndUpdate({ email: decoded.email, confirmed: false }, { confirmed: true });
//     if (!user)
//         return next(new Error("user not found", { cause: 400 }));
//     return res.status(200).json({ msg: "email confirmed" });
// }