import { Router } from 'express';
import Post from '../models/post.model';
import moment from 'moment';

const router = Router();

const postCtrl = {
  create: (req, res, next) => {
    const { title } = req.body;
    const model = new Post(req.body);
    Post.find({ title: title })
      .then((posts) => {
        if (posts.length) {
          res.json({ code: 402, msg: '数据已存在, 请重试!' })
        } else {
          model.save()
            .then(docs => res.json({ code: 0, msg: '操作成功!' }))
            .catch(e => next(e));
        }
      });
  },
  delete: (req, res, next) => {

  },
  edit: (req, res, next) => {

  },
  find: (req, res, next) => {
    let { page, limit } = req.query;
    page = +page; // 转为 number
    limit = +limit;

    Post.count({}, (err, count) => {
      if (err) res.json({ code: 500, msg: '服务器错误，请重试!' })

      Post.find()
        .skip(limit * (page - 1))
        .limit(limit)
        .then((docs) => {
          let format = [];
          docs.map(item => {
            format.push({
              _id: item._id,
              title: item.title,
              desc: item.desc,
              views: `${item.views}/${item.real_views}`,
              stars: `${item.stars}/${item.real_stars}`,
              created_at: moment(item.created_at).format('YYYY-MM-DD'),
              updated_at: moment(item.updated_at).format('YYYY-MM-DD'),
              status: item.status ? '<span class="layui-badge layui-bg-green">启用</span>' : '<span class="layui-badge">禁用</span>',
              is_draft: item.is_draft ? '<span class="layui-badge layui-bg-green">是</span>' : '<span class="layui-badge">否</span>',
              is_top: item.is_top ? '<span class="layui-badge layui-bg-green">是</span>' : '<span class="layui-badge">否</span>',
            })
          })
          res.json({ code: 0, data: format, count: count });
        });
    });
  }
};

router.route('/')
  .put(postCtrl.create)
  .delete(postCtrl.delete)
  .post(postCtrl.edit)
  .get(postCtrl.find);
export default router;
