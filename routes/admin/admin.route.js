import { Router } from 'express';
import userRoutes from './user.route';
import postRoutes from './post.route';
import categoryRoutes from './category.route';
import censusRoutes from './census.route';
import ynoteRoutes from './ynote.route';

const router = Router();

router.get('/', (req, res) => {
  res.render('admin/index', { title: 'Express Babel' });
});

router.get('/login', (req, res) => {
  res.render('admin/login', { title: 'Express Babel' });
});

router.use('/user', userRoutes);
router.use('/post', postRoutes);
router.use('/category', categoryRoutes);
router.use('/census', censusRoutes);
router.use('/ynote', ynoteRoutes);

export default router;