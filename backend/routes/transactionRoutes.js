import express from 'express'
import { getTransactions, getTransactionById, updateTransaction, createTransaction, deleteTransaction, analyzeTransactions } from "../controllers/transactionController.js";

import { protect } from "../middleware/authMiddleware.js";

const transactionRouter = express.Router();

transactionRouter.use(protect);

transactionRouter.get('/', getTransactions);
transactionRouter.post('/', createTransaction);
transactionRouter.post('/analyze', analyzeTransactions);
transactionRouter.get('/:id', getTransactionById);
transactionRouter.put('/:id', updateTransaction);
transactionRouter.delete('/:id', deleteTransaction); 


export default transactionRouter;