// Import express and necessary modules
import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';

// Import routes
import authRouter from './routes/auth.js';
import usersRouter from './routes/users.js';
// import itemsRouter from './routes/books.js';
// import transactionsRouter from './routes/orders.js';

// Create an Express app and setup necessary middlewares
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })); // Use for URL-encoded data

// Use routes for the API endpoints
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);

export default app;
