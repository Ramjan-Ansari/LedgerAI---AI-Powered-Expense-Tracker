import express from 'express';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../controllers/categoryController.js';
import { protect } from '../middleware/authMiddleware.js';

const categoryRouter = express.Router();

categoryRouter.use(protect); //all router protected by auth middleware

categoryRouter.get('/', getCategories);
categoryRouter.post('/', createCategory);
categoryRouter.put('/:id', updateCategory);
categoryRouter.delete('/:id', deleteCategory);


export default categoryRouter;