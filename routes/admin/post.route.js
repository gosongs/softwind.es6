import { Router } from 'express';
import marked from 'marked';
import moment from 'moment';
import Category from '../../models/category.model';
import Post from '../../models/post.model';
import User from '../../models/user.model';

marked.setOptions({
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value;
  }
});
const router = Router();

router.route('/list')
  .get(function (req, res) {
    res.render('admin/post/list', {});
  });

router.route('/detail')
  .get(function (req, res) {
    const { id } = req.query;
    if (!id) res.redirect('/admin/post/list');

    Post.findOne({ _id: id })
      .then(docs => {
        // todo 验证文章是否属于当前用户
        if (!docs) {
          res.redirect('/admin/post/list');
        } else {
          let detail = JSON.parse(JSON.stringify(docs));
          detail.created_at = moment(detail.created_at).format('YYYY-MM-DD');
          detail.updated_at = moment(detail.updated_at).format('YYYY-MM-DD');
          if (detail.type === 'markdown') {
            detail.content = marked(detail.content);
          }

          // 查询用户信息
          User.findOne({ _id: detail.author_id })
            .then(author => {
              detail.author = author;
            })
            .then(() => {
              // 查询文章所属分类
              let catesIds = detail.category_id.split(',');
              Category.find({ _id: { $in: catesIds } })
                .then(cates => {
                  detail.cates = cates;
                })
                .then(() => {
                  res.render('admin/post/detail', { detail });
                })
            })
        }
      })
  });

router.route('/add')
  .get(function (req, res) {
    Category.find({ status: true })
      .then(cates => {
        res.render('admin/post/add', { cates });
      })
  });

export default router;