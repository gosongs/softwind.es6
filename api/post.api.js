import { Router } from 'express';
import Post from '../models/post.model';
import moment from 'moment';

const router = Router();

const postCtrl = {
  create: (req, res, next) => {

  },
  delete: (req, res, next) => {

  },
  edit: (req, res, next) => {

  },
  find: (req, res, next) => {

  }
};

router.route('/')
  .put(postCtrl.create)
  .delete(postCtrl.delete)
  .post(postCtrl.edit)
  .get(postCtrl.find);
export default router;
