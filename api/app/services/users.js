import User from '../models/user.js';

export const getAllUsers = async () => {
    return await User.find();
};

export const getUserByUsername = async (username) => {
    return await User.findOne({
        username: username
    });
}

export const addBalanceByUserName = async(username, amount) => {
    let user = await User.findOne({
        username: username
    });
    if (!user) {
        throw new Error('User not found');
    }
    user.balance += Number(amount);
    await user.save();
}
