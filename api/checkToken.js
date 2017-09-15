import User from '../models/user.model';
import jwt from 'jsonwebtoken';

export default function checkToken(req, res, next) {
  const { token } = req.cookies;
  const path = req.path;
  const loginUrl = `/admin/login?from=${escape(req.originalUrl)}`;
  
  if (path === '/admin/login' || path === '/api/login') {
    next(); // 登录页面不校验token
  } else if (path.indexOf('admin') === -1) {
    next(); // 前台页面不校验
  } else {
    if (!token) res.redirect(loginUrl);
    User.findOne({ token })
      .then(user => {
        if (!user) res.redirect(loginUrl);
        // 校验token
        jwt.verify(token, 'softwind', (err, decoded) => {
          if(err) res.redirect(loginUrl);
          next();
        });
      })
  }
}