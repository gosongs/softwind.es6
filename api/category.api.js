import { Router } from 'express';
import Category from '../models/category.model';
import moment from 'moment';

const router = Router();

const categoryCtrl = {
  create: (req, res, next) => {
    const { name, desc, status, created_at } = req.body;
    if (!name || name.length > 16 || (desc && desc.length > 256)) res.json({ code: 400, msg: '参数错误, 请重试!' });

    const model = new Category({
      name,
      desc,
      status: status === 'on',
      created_at
    });
    Category.find({ name: name })
      .then((cates) => {
        if (cates.length) {
          res.json({ code: 402, msg: '数据已存在, 请重试!' })
        } else {
          model.save()
            .then(docs => res.json({ code: 0, msg: '操作成功!' }))
            .catch(e => next(e));
        }
      });
  },
  delete: (req, res, next) => {
    const { _id } = req.body;
    if (!_id) res.json({ code: 400, msg: '参数错误, 请重试!' });

    Category.findOneAndRemove({ _id }, (err, doc) => {
      if (err) res.json({ code: 500, msg: '服务器错误，请重试!' });

      res.json({ code: 0, msg: '操作成功!' });
    })
  },
  edit: (req, res, next) => {
    const { _id, name, desc, status } = req.body;
    let updateData;
    if (status === undefined) {
      if (!_id || !name || name.length > 16 || (desc && desc.length > 256)) res.json({ code: 400, msg: '参数错误, 请重试!' });
      updateData = { name, desc };
    } else {
      updateData = { status: status };
    }

    Category.update({ _id }, updateData, err => {
      if (err) res.json({ code: 500, msg: '服务器错误，请重试!' })

      res.json({ code: 0, msg: '操作成功!' });
    })
  },
  find: (req, res, next) => {
    let { page, limit } = req.query;
    page = +page; // 转为 number
    limit = +limit;

    Category.count({}, (err, count) => {
      if (err) res.json({ code: 500, msg: '服务器错误，请重试!' })

      Category.find()
        .skip(limit * (page - 1))
        .limit(limit)
        .then((docs) => {
          let format = [];
          docs.map(item => {
            format.push({
              _id: item._id,
              name: item.name,
              desc: item.desc,
              created_at: moment(item.created_at).format('YYYY-MM-DD'),
              updated_at: moment(item.updated_at).format('YYYY-MM-DD'),
              status: item.status
            })
          });
          res.json({ code: 0, data: format, count: count });
        });
    });
  },
};

router.route('/')
  .put(categoryCtrl.create)
  .delete(categoryCtrl.delete)
  .post(categoryCtrl.edit)
  .get(categoryCtrl.find);

export default router;