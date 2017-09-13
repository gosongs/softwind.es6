import { Router } from 'express';
import Category from '../../models/category.model';
import api from '../../api/category.api';
const router = Router();

router.route('/list')
  .get(function (req, res) {
    res.render('admin/category/list');
  });

router.route('/add')
  .get(function (req, res) {
    res.render('admin/category/add', { title: 'Express Babel' });
  });

export default router;