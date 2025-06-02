import { Router } from 'express';

import { getAllBooks, getBook } from '../controllers/booksController.js';

const router = Router();

router.get('', getAllBooks);

router.get('/:_id', getBook);

export default router;