import express, { Express } from 'express';
import { errorHandler } from './middleware/errorHandler.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import tweetRoutes from './routes/tweetRoutes.js';
import followRoutes from './routes/followRoutes.js';
import { feed } from './controllers/tweetController.js';
import { getAllUsers } from './controllers/userController.js';
import { authMiddleware } from './middleware/auth.js';

const app: Express = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tweets', tweetRoutes);
app.use('/api/followers', followRoutes);
app.get('/api/feed', authMiddleware, feed);
app.get('/api/getAllUsers', authMiddleware, getAllUsers);

app.use(errorHandler);

export default app;
