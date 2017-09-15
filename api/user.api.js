import { Router } from 'express';
import User from '../models/user.model';
import moment from 'moment';
import md5 from 'md5';

const router = Router();

const userCtrl = {
  create: (req, res, next) => {
    // req.checkBody({
    //   username: {
    //     notEmpty: true,
    //     isLength: {
    //       min: 5,
    //       max: 16
    //     }
    //   },
    //   nickname: {
    //     isLength: {
    //       min: 2,
    //       max: 8
    //     }
    //   },
    //   email: {
    //     notEmpty: true
    //   },
    //   password: {
    //     notEmpty: true
    //   },
    //   sign: {
    //     isLength: {
    //       min: 1,
    //       max: 168
    //     }
    //   }
    // });

    req.getValidationResult()
      .then(result => {
        // console.log(result.useFirstErrorOnly().array())
        const errors = !result.isEmpty();
        if (errors) {
          res.json({ code: 400, msg: '参数错误, 请重试!' })
        } else {
          const a = User.find({ username: req.body.username }).exec();
          const b = User.find({ nickname: req.body.nickname }).exec();
          const c = User.find({ email: req.body.email }).exec();

          Promise.all([a, b, c]).then(function (users) {
            console.log(users)
            if (users[0].length) {
              res.json({ code: 402, msg: '用户名已存在, 请重试!' })
            }
            if (users[1].length) {
              res.json({ code: 402, msg: '昵称已存在, 请重试!' })
            }
            if (users[2].length) {
              res.json({ code: 402, msg: '邮箱已存在, 请重试!' })
            }
            // 格式化请求参数
            let data = req.body;
            data.status = data.status === 'on';
            data.subscribe_status = data.subscribe_status === 'on';
            data.password = md5(data.password);

            const model = new User(data);
            model.save()
              .then(docs => res.json({ code: 0, msg: '操作成功!' }))
              .catch(e => next(e));
          })

        }
      })
  },
  delete: (req, res, next) => {

  },
  edit: (req, res, next) => {

  },
  find: (req, res, next) => {
    let { page, limit } = req.query;
    page = +page; // 转为 number
    limit = +limit;

    User.count({}, (err, count) => {
      if (err) res.json({ code: 500, msg: '服务器错误，请重试!' })

      User.find()
        .skip(limit * (page - 1))
        .limit(limit)
        .then((docs) => {
          let format = [];
          docs.map(item => {
            format.push({
              _id: item._id,
              avatar_url: item.avatar_url,
              username: item.username,
              nickname: item.nickname,
              email: item.email,
              city: item.city,
              level: item.level,
              subscribe_status: item.subscribe_status,
              created_at: moment(item.created_at).format('YYYY-MM-DD'),
              updated_at: moment(item.updated_at).format('YYYY-MM-DD'),
              status: item.status
            })
          });
          res.json({ code: 0, data: format, count: count });
        });
    });
  }
};

router.route('/')
  .put(userCtrl.create)
  .delete(userCtrl.delete)
  .post(userCtrl.edit)
  .get(userCtrl.find);
export default router;
