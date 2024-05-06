// authMiddleware.js
import jwt from 'jsonwebtoken';
import UnauthorizedError from 'http-errors';

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return next(new UnauthorizedError('Missing authorization header'));
    }

    const token = authHeader.split(' ')[1]; // Extract the token from Bearer

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Add the decoded user data to the request object
        next(); // Proceed if the token is valid
    } catch (err) {
        return next(new UnauthorizedError('Invalid or expired token'));
    }
}

export default authMiddleware;
