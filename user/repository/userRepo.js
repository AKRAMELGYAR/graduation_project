import User from "../model/userModel.js";

export const findUser = async ({payload}) => {
    return await User.findOne(payload);
}

export const saveUser = async ({ userData }) => {
    return await User.create(userData);
}

// export const findAndUpdate = async (data) => {
//     const { email } = data;
//     const user = await User.findOneAndUpdate({ email }, { password });
//     return user;
// }