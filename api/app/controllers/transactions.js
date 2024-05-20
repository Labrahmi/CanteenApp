import { getAllTransactions, postTransaction } from '../services/transactions.js';
import { addBalanceByUserName, getUserById } from '../services/users.js';

export const listTransactions = async (req, res) => {
    try {
        const transactions_with_users = [];
        const transactions = await getAllTransactions();
        if (!transactions) {
            res.status(404).json({ error: "No transactions found" });
            return;
        }
        for (let i = 0; i < transactions.length; i++) {
            const user = await getUserById(transactions[i].userId);
            const transObj = {
                transaction: transactions[i],
                user: user
            }
            transactions_with_users.push(transObj);
        }
        res.json(transactions_with_users);
    }
    catch (err) {
        res.status(404).json({ error: err.message });
    }
}

export const createTransaction = async (req, res) => {
    try {
        let username = req.body.username;
        let amount = req.body.amount;
        let transactionType = req.body.transactionType;
        if (!username || !amount || !transactionType) {
            res.status(400).json({ error: "Missing required fields" });
            return;
        }
        let user = await addBalanceByUserName(username, (amount * -1));
        await postTransaction(user, amount, transactionType);
        res.json({ success: "Transaction Created Successfully" });
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}
