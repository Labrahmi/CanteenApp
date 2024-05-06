import { loginService, registerService } from '../services/auth.js';

export const login = async (req, res) => {
    try {
        console.log("body:", req.body);
        const { username, password } = req.body;
        const token = await loginService(username, password);
        res.json({ token });
    } catch (error) {
        // Handle authentication errors (invalid credentials, etc.) and send appropriate status codes
        console.error(error.message);
        res.status(401).json({ error: 'Invalid credentials' });
    }
};

export const register = async (req, res) => {
    try {
        const { username, password, name, role, cardId, balance } = req.body;

        if (!username || !password || !name || !role || !cardId || !balance) {
            throw new Error('Missing fields');
        }
        if (username.length < 4 || password.length < 4) {
            throw new Error('Username and password must be at least 4 characters long');
        }
        const token = await registerService(username, password, name, role, cardId, balance);
        res.json({ token });
    } catch (error) {
        // Handle registration errors (username taken, etc.) and send appropriate status codes
        console.error(error.message);
        res.status(400).json({ error: error.message });
    }
}