import { Router } from 'express';

const router = Router();

router.route('/list')
  .get(function (req, res) {
    res.render('admin/ynote/list');
  });

export default router;