import fs from 'fs';
import { Router } from 'express';
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    let temp = file.originalname.split('.');
    let ext = temp[temp.length - 1];
    let ts = +Date.now();
    cb(null, `${file.fieldname}-${ts}.${ext}`)
  }
})
var upload = multer(
  {
    dest: '/public/uploads/',
    limits: {
      fieldNameSize: 100,
      fileSize: 60000000
    },
    storage: storage
  }
);

const router = Router();

const uploadCtrl = {
  create: (req, res, next) => {
    var file = req.file;
    var savePath = file.path;
    if (file.path) {
      res.send({ code: 0, msg: '上传成功', data: savePath.replace('public', '') })
    } else {
      res.send({ code: 500, msg: '服务器错误，请重试' })
    }
    console.log('文件类型：%s', file.mimetype);
    console.log('原始文件名：%s', file.originalname);
    console.log('文件大小：%s', file.size);
    console.log('文件保存路径：%s', file.path);
  }
};

router.route('/')
  .post(upload.single('file'), uploadCtrl.create);
export default router;
