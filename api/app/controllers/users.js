import { getAllUsers } from '../services/users.js';

export const listUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  }
  catch (err) {
    res.status(404).send(err.message);
  }
};
