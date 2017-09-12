import { Router } from 'express';

const router = Router();

router.route('/list')
  .get(function (req, res) {
    res.render('admin/post/list', { title: 'Express Babel' });
  });

router.route('/add')
  .get(function (req, res) {
    res.render('admin/post/add', { title: 'Express Babel' });
  });

export default router;