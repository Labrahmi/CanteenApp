import { getAllUsers, getUserByUsername, getUserByCardId, addBalanceByUserName, getUserById, getUsersByQuery, putUserSubscription } from '../services/users.js';
import { postTransaction, getTransactionsByUserId } from '../services/transactions.js';

export const listUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    users.forEach(user => {
      user.password = undefined;
    });
    res.json(users);
  }
  catch (err) {
    res.status(404).send(err.message);
  }
};

export const listUserByUsername = async (req, res) => {
  try {
    let username = req.params.username;
    if (!username) {
      res.status(400).json({ error: "Username is required" });
      return;
    }
    const user = await getUserByUsername(username);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    user.password = undefined;
    res.json(user);
  }
  catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const listUserByCardId = async (req, res) => {
  try {
    let cardId = req.params.cardId;
    if (!cardId) {
      res.status(400).json({ error: "Card ID is required" });
      return;
    }
    const user = await getUserByCardId(cardId);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    user.password = undefined;
    res.json(user);
  }
  catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const addBalance = async (req, res) => {
  try {
    let username = req.params.username;
    let amount = req.query.amount;
    if (!username || !amount) {
      res.status(400).json({ error: "Username and Amount are required" });
      return;
    }
    const user = await addBalanceByUserName(username, amount);
    const transaction = await postTransaction(user, amount, "top-up");
    res.json({ success: "Balance Added Successfully" });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const subscribe = async (req, res) => {
  try {
    let username = req.params.username;
    let { plan } = req.body;
    if (!username || !plan) {
      res.status(400).json({ error: "Username and Plan are required" });
      return;
    }
    await putUserSubscription(username, plan);
    res.json({ success: "Subscribed Successfully" });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

export const listUserById = async (req, res) => {
  try {
    let id = req.params.id;
    if (!id) {
      res.status(400).json({ error: "ID is required" });
      return;
    }
    const user = await getUserById(id);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    user.password = undefined;
    res.json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const searchUsers = async (req, res) => {

  try {
    let query = req.query.query;
    if (!query) {
      res.status(400).json({ error: "Query is required" });
      return;
    }
    const users = await getUsersByQuery(query);
    const newUsers = [];
    for (let i = 0; i < users.length; i++) {
      const transactions = await getTransactionsByUserId(users[i]._id);
      newUsers.push({ user: users[i], transactions: transactions });
    }
    res.json(newUsers);
  }
  catch (err) {
    res.status(404).send(err.message);
  }

};