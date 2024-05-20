import { getAllUsers, getUserByUsername, getUserByCardId, addBalanceByUserName, getUserById } from '../services/users.js';
import { postTransaction } from '../services/transactions.js';


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
    // Create a transaction
    const transaction = await postTransaction(user, amount, "top-up");
    console.log(transaction);
    res.json({ success: "Balance Added Successfully" });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

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