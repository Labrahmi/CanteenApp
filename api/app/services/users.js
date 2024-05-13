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
    if (amount < 0 && user.balance + amount < 0) {
        throw new Error('Insufficient balance');
    }
    user.balance += Number(amount);
    await user.save();
    return user;
}
