import express from 'express';
import { getInsights, generateInsight } from '../controllers/insightController.js';
import { protect } from '../middleware/authMiddleware.js';

const insightRouter = express.Router();

insightRouter.use(protect);

insightRouter.get('/', getInsights);
insightRouter.post('/generate', generateInsight)


export default insightRouter;