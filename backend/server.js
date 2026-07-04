import exress from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = exress();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(exress.json());

app.get('/', (req, res) => {
    res.json({message: 'LedgerAI - AI Expense Tracker API is running..'});
})

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`);
})