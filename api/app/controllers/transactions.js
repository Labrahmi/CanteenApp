import { getAllTransactions, postTransaction } from '../services/transactions.js';
import { addBalanceByUserName, getUserById, getUserByUsername } from '../services/users.js';

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
        let items = req.body.items;
        items = JSON.parse(items);
        if (!username || !amount || !transactionType) {
            res.status(400).json({ error: "Missing required fields" });
            return;
        }
        let user = await getUserByUsername(username);
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        if (transactionType == "subscription") {
            const currentDate = new Date();
            items = [
                {
                    name: 'Main Lunch',
                    price: amount,
                    image: 'unknown',
                }
            ];
            if (user.subscriptionPlan) {
                // -------------------------------------------------------------- [  FREE  ] --------------------------------------------------------------
                if (user.subscriptionPlan.planName == 'free') {
                    transactionType = 'purchase'
                    await addBalanceByUserName(username, (amount * -1), transactionType);
                    await postTransaction(user, amount, transactionType, items);
                    return res.json({ success: "Transaction Created Successfully" });
                }
                // -------------------------------------------------------------- [  PREMIUM  ] --------------------------------------------------------------
                else {
                    if ((user.subscriptionPlan.status == 'active') && ((currentDate >= user.subscriptionPlan.startDate) && (currentDate <= user.subscriptionPlan.endDate))) {
                        await addBalanceByUserName(username, 0, transactionType);
                        await postTransaction(user, 0, transactionType, items);
                        return res.json({ success: "Transaction Created Successfully" });
                    } else {
                        return res.status(400).json({ error: "There was a problem creating the transaction" });
                    }
                }
                // -------------------------------------------------------------- [  --------  ] --------------------------------------------------------------
            }
        }
        await addBalanceByUserName(username, (amount * -1), transactionType);
        await postTransaction(user, amount, transactionType, items);
        res.json({ success: "Transaction Created Successfully" });
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}
