import express from 'express';
import { getBudgets, updateBudget, createBudget, deleteBudget } from '../controllers/budgetController.js';

import { protect } from '../middleware/authMiddleware.js'

const budgeRouter = express.Router();
budgeRouter.use(protect);

budgeRouter.get('/', getBudgets);
budgeRouter.post('/', createBudget);
budgeRouter.put('/:id', updateBudget);
budgeRouter.delete('/:id', deleteBudget);

export default budgeRouter;
