import {User} from "../../user/model/userModel.js";

export const findUser = async ({payload}) => {
    return await User.findOne(payload);
}

export const saveUser = async ({ userData }) => {
    // const user = await User(userData);
    return await userData.save();
}