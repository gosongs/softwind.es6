import { Router } from 'express';
import User from '../models/user.model';
import md5 from 'md5';
import jwt from 'jsonwebtoken';

const router = Router();

router.route('/')
  .post(function (req, res, next) {
    const { username, password } = req.body;
    User.findOne({ username, password: md5(password) })
      .then(user => {
        if (!user) res.json({ code: 1404, msg: '登录失败，请确认是否输入正确的用户名和密码！' });

        if (!user.status) res.json({ code: 1403, msg: '您的账号被封禁！' });

        // 生成 token, 7天有效
        const token = jwt.sign({
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
          data: username
        }, 'softwind');
        res.cookie('token', token);

        // token 存储到数据库
        user.token = token;
        user.save(err => {
          if (err) console.log('token存储失败');
          res.json({ code: 0, msg: '登录成功！' });
        });
      })
  })

export default router;