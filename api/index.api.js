import { Router } from 'express';
import categoryApi from './category.api';
import userApi from './user.api';
import uploadApi from './upload';

const router = Router();

router.use('/category', categoryApi);
router.use('/user', userApi);
router.use('/upload', uploadApi);

export default router;