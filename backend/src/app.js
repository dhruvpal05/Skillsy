import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'API is running' });
});

//routes
import { userRoutes } from './modules/user/index.js';
import { skillRoutes } from './modules/skill/index.js';
import { swapRoutes } from './modules/swap/index.js';
import { adminRoutes } from './modules/admin/index.js';
import { feedbackRoutes } from './modules/feedback/index.js';


app.use('/api/users', userRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/swaps', swapRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/feedback', feedbackRoutes);

export default app;
