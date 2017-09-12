import { Router } from 'express';

const router = Router();

router.route('/list')
  .get(function (req, res) {
    res.render('admin/category/list', { title: 'Express Babel' });
  });

router.route('/add')
  .get(function (req, res) {
    res.render('admin/category/add', { title: 'Express Babel' });
  });

export default router;