import { Router } from 'express';

const router = Router();

router.route('/timeline')
  .get(function (req, res) {
    res.render('admin/census/timeline', {});
  });

export default router;