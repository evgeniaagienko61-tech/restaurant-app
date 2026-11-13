import express from 'express';
import {
  getDishes,
  getDishById,
  createDish,
  updateDish,
  deleteDish,
} from '../controllers/dishController.js';
import { validateDish } from '../middleware/validateDish.js';

const router = express.Router();

router.get('/', getDishes);
router.get('/:id', getDishById);
router.post('/', validateDish, createDish);
router.put('/:id', validateDish, updateDish);
router.delete('/:id', deleteDish);

export default router;