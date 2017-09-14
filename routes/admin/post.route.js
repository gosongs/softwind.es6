import { Router } from 'express';
import Category from '../../models/category.model'

const router = Router();

router.route('/list')
  .get(function (req, res) {
    res.render('admin/post/list', {});
  });

router.route('/add')
  .get(function (req, res) {
    Category.find({ status: true })
      .then(cates => {
        res.render('admin/post/add', { cates });
      })
  });

export default router;