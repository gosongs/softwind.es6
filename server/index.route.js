import { Router } from 'express';
import adminRoutes from '../routes/admin/admin.route';

const router = Router();

router.use('/admin', adminRoutes);
export default router;
