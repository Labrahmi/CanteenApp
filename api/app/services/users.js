import User from '../models/user.js';

export const getAllUsers = async () => {
    return await User.find();
};

export const getUserByUsername = async (username) => {
    return await User.findOne({
        username: username
    });
}

export const getUserByCardId = async (cardId) => {
    return await User.findOne({
        cardId: cardId
    });
};

export const getUserById = async (id) => {
    return await User.findById(id);
};

export const addBalanceByUserName = async (username, amount) => {
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
};


export const getUsersByQuery = async (query) => {
    return await User.find({
        $or: [
            { name: { $regex: query, $options: 'i' } },
            { cardId: { $regex: query, $options: 'i' } }
        ]
    }, { password: 0 });
};
