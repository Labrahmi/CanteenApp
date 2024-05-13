import Transaction from '../models/transaction.js';

export const getAllTransactions = async () => {
    return await Transaction.find();
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
