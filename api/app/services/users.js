import User from '../models/user.js';

export const getAllUsers = async () => {
    return await User.find();
};

export const getUserByUsername = async (username) => {
    return await User.findOne({
        username: username
    });
}
