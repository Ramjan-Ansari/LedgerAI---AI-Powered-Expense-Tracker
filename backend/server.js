import exress from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routes/authRoutes.js';
import categoryRouter from './routes/categoryRoutes.js';

dotenv.config();

const app = exress();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(exress.json());

app.get('/', (req, res) => {
    res.json({message: 'LedgerAI - AI Expense Tracker API is running..'});
})

app.use('/api/auth', authRouter);
app.use('/api/categories', categoryRouter);

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`);
})