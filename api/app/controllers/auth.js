import User from '../models/user.js';
import { loginService, registerService } from '../services/auth.js';

export const login = async (req, res) => {
    try {
        console.log("body:", req.body);
        const { username, password } = req.body;
        const token = await loginService(username, password);
        const user = await User.findOne({ username: username });
        if (user.role === 'student') {
            res.status(401).json({ error: 'You are not authorized to access this resource' });
            return;
        }
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
            throw new Error('All fields are required');
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

export const forgotPassword = async (req, res) => {
    // Implement the forgot password functionality here
    res.json({ message: 'Forgot password functionality not implemented' });
}
