import { Router } from 'express';
import categoryApi from './category.api';
import userApi from './user.api';
import uploadApi from './upload';
import postApi from './post.api';
import loginApi from './login.api';
import ynoteApi from './ynote.api';

const router = Router();

router.use('/category', categoryApi);
router.use('/user', userApi);
router.use('/upload', uploadApi);
router.use('/post', postApi);
router.use('/login', loginApi);
router.use('/ynote', ynoteApi);

export default router;