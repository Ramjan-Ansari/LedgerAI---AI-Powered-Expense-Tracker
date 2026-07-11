import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRouter from './routes/authRoutes.js';
import categoryRouter from './routes/categoryRoutes.js';
import transactionRouter from './routes/transactionRoutes.js';
import budgeRouter from './routes/budgetRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({message: 'LedgerAI - AI Expense Tracker API is running..'});
})

app.use('/api/auth', authRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/transactions', transactionRouter);
app.use('/api/budgets', budgeRouter);

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`);
})