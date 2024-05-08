import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const loginService = async (username, password) => {
    const user = await User.findOne({
        username: username
    });

    if (!user) throw new Error('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid password');

    // Generate JWT token
    const token =
        jwt.sign({ id: user.id, role: user.role }
            , process.env.JWT_SECRET
            , { expiresIn: '4h' });
    return token;
};

export const registerService = async (username, password, name, role, cardId, balance) => {
    // 1. Check if the user already exists
    const existingUser = await User.findOne({ username: username });
    if (existingUser) throw new Error('Username already exists');

    // 2. Hash the password
    const salt = await bcrypt.genSalt(10); // Generate a salt
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Create a new User object
    const newUser = new User({
        username: username,
        password: hashedPassword,
        name: name,
        role: role,
        balance: balance,
        cardId: cardId
        // Add other relevant fields
    });

    // 4. Save the user to the database
    try {
        const savedUser = await newUser.save();

        // 5. Generate a JWT token
        const token = jwt.sign(
            { id: savedUser.id, role: savedUser.role },
            process.env.JWT_SECRET,
            { expiresIn: '4h' }
        );
        return token;
    } catch (error) {
        throw new Error('Error registering user: ' + error.message);
    }
};
