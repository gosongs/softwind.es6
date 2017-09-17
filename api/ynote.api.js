import { Router } from 'express';
import md5 from 'md5';
import rp from 'request-promise';
import moment from 'moment';
import Category from '../models/category.model';

const router = Router();

const HEADERS = {
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
  'Accept-Encoding': 'gzip, deflate, br',
  'Accept-Language': 'zh-CN,zh;q=0.8,en;q=0.6,zh-TW;q=0.4',
  'Content-Type': 'application/x-www-form-urlencoded',
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36',
  'Cookie': 'JSESSIONID=aaaMpxKdCFTeQeTByV05v; Hm_lvt_30b679eb2c90c60ff8679ce4ca562fcc=1505612579; Hm_lpvt_30b679eb2c90c60ff8679ce4ca562fcc=1505612579; OUTFOX_SEARCH_USER_ID_NCOO=255195457.60159954; ___rl__test__cookies=1505612580814; __yadk_uid=WVZHIHgqnIZznrDWwlh0z19uOdO59iKv; YNOTE_SESS=v2|xkAA3UWeaW64OLPuhfpuRQzhM6Bn4lGRJK6MJ4hLQS0zMnLPzOMUfRlM0LQBnHYl0UAOLUWn46z0euOLYf64kf0k5PLwuhfTFR; YNOTE_PERS=v2|urstoken||YNOTE||web||-1||1505612602587||180.173.68.48||go_songs@163.com||UWP4eLnH64Rp40HgBnMqK0ez6MTFkMzm0eyhHUm6464Re4OfTyPLey0llhLkfnMqu0kmhLkfnHQ40pBhHkYO4kGR; YNOTE_LOGIN=3||1505612602745; YNOTE_CSTK=aLFCYSIf; Hm_lvt_4566b2fb63e326de8f2b8ceb1ec367f2=1505612583; Hm_lpvt_4566b2fb63e326de8f2b8ceb1ec367f2=1505616682; _ga=GA1.2.725472992.1505612583; _gid=GA1.2.1974605141.1505612583; _gat=1'
}

const getRecent = (page) => {
  const url = 'https://note.youdao.com/yws/api/personal/file?method=listRecent&offset=1&limit=30&keyfrom=web&cstk=aLFCYSIf';

  const options = {
    url: url,
    method: "POST",
    headers: HEADERS,
    gzip: true,
    body: JSON.stringify({
      cstk: 'aLFCYSIf'
    })
  };

  return rp(options, (err, response, body) => {
    if (!err && response.statusCode == 200) {
      return body;
    } else {
      return null;
    }
  })
}

const getCategory = () => {
  const url = 'https://note.youdao.com/yws/api/personal/file?method=listEntireByParentPath&keyfrom=web&cstk=aLFCYSIf';
  const options = {
    url: url,
    method: "POST",
    headers: {
      ...HEADERS,
      Host: 'note.youdao.com',
      Origin: 'https://note.youdao.com',
      Referer: 'https://note.youdao.com/web/'
    },
    gzip: true,
    body: 'path=%2F&dirOnly=true&f=true&cstk=aLFCYSIf'
  };

  return rp(options, (err, response, body) => {
    if (!err && response.statusCode == 200) {
      return body;
    } else {
      return null;
    }
  })
};

const ynoteCtrl = {
  recent: (req, res, next) => {
    getRecent()
      .then(recents => {
        let results = [];
        JSON.parse(recents).map(file => {
          if ('fileEntry' in file) {
            let { fileEntry, fileMeta, otherProp } = file;
            if (fileEntry.name[0] !== '_' && otherProp.parentName[0] !== '_') {
              results.push({
                id: fileEntry.id,
                name: fileEntry.name,
                summary: fileEntry.summary,
                parentName: otherProp.parentName,
                parentId: fileEntry.parentId,
                created_at: moment(fileEntry.createTimeForSort * 1000).format('YYYY-MM-DD'),
                updated_at: moment(fileEntry.modifyTimeForSort * 1000).format('YYYY-MM-DD'),
                fileSize: `${fileEntry.fileSize}kb`,
                noteType: fileEntry.orgEditorType === 1 ? '<span class="layui-badge">有道笔记</span>' : '<span class="layui-badge layui-bg-cyan">Markdown</span>'
              })
            }
          }
        })
        res.json({ code: 0, data: results });
      })
      .catch(err => {
        if (err) {
          res.json({ code: 500, msg: err })
        }
      })
  },
  category: (req, res, next) => {
    getCategory()
      .then(categorys => {
        let results = [];
        JSON.parse(categorys).map(file => {
          let { fileEntry, fileMeta, otherProp } = file;
          if (fileEntry.name[0] !== '_') { // 过滤_开头的笔记本
            results.push({
              id: fileEntry.id,
              name: fileEntry.name,
              subTreeFileNum: fileEntry.subTreeFileNum,
              created_at: moment(fileEntry.createTimeForSort * 1000).format('YYYY-MM-DD'),
              updated_at: moment(fileEntry.modifyTimeForSort * 1000).format('YYYY-MM-DD'),
            })
          }
        })
        res.json({ code: 0, data: results })
      })
      .catch(err => {
        if (err) {
          res.json({ code: 500, msg: err })
        }
      })
  },
  updateCategory: (req, res, next) => {
    getCategory()
      .then(categorys => {
        let results = [];
        JSON.parse(categorys).map(file => {
          let { fileEntry, fileMeta, otherProp } = file;
          if (fileEntry.name[0] !== '_') { // 过滤_开头的笔记本
            results.push({
              name: fileEntry.name,
              child_num: fileEntry.subTreeFileNum,
              created_at: fileEntry.createTimeForSort * 1000,
              updated_at: fileEntry.modifyTimeForSort * 1000
            })
          }
        });

        Category.remove({}, e => {
          if (e) res.json({ code: 500, msg: e });
          Category.insertMany(results, (err, docs) => {
            if (err) res.json({ code: 500, msg: err })

            res.json({ code: 0, msg: '操作成功！' });
          })
        })
      })
  }
}

router
  .get('/recent', ynoteCtrl.recent)
  .get('/category', ynoteCtrl.category)
  .get('/updateCategory', ynoteCtrl.updateCategory)

export default router;