import {User} from "../../user/model/userModel.js";

export const findUser = async ({payload}) => {
    return await User.findOne(payload).select(' -__v -role');
}

export const saveUser = async ({ userData }) => {
    return await userData.save();
}