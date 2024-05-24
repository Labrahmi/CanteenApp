import Transaction from '../models/transaction.js';

export const getAllTransactions = async () => {
    let date = new Date();
    date.setMonth(date.getMonth() - 1);
    date.setDate(1);
    date.setHours(0, 0, 0, 0);
    return await Transaction.find({ createdAt: { $gte: date } }).sort({ createdAt: -1 });
};

export const getTransactionsByUserId = async (userId) => {
    return await Transaction.find({ userId: userId }).sort({ createdAt: -1 }).limit(30);
};

export const postTransaction = async (user, amount, transactionType) => {
    let transaction = new Transaction({
        userId: user._id,
        amount: amount,
        transactionType: transactionType,
        items: []
    });
    await transaction.save();
    return transaction;
};
