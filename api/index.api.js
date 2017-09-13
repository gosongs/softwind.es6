import { Router } from 'express';
import categoryApi from './category.api';
import userApi from './user.api';

const router = Router();

router.use('/category', categoryApi);
router.use('/user', userApi);

export default router;