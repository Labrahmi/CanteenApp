import { getAllUsers, getUserByUsername } from '../services/users.js';

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
    res.status(404).send(err.message);
  }
}

