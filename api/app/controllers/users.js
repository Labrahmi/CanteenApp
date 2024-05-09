import { getAllUsers, getUserByUsername, addBalanceByUserName } from '../services/users.js';

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

export const getUser = async (req, res) => {
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
}

export const addBalance = async (req, res) => {
  try {
    let username = req.params.username;
    let amount = req.query.amount;
    if (!username || !amount) {
      res.status(400).json({ error: "Username and Amount are required" });
      return;
    }
    await addBalanceByUserName(username, amount);
    res.json({ success: "Balance Added Successfully" });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

