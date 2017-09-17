var layedit;
var layeditIndex;

layui.use('table', function () {
  var table = layui.table;
});

layui.use('laydate', function () {
  var laydate = layui.laydate;
  laydate.render({
    elem: '#postDate',
    value: new Date()
  });
});

layui.use('upload', function () {
  var upload = layui.upload;

  var uploadInst = upload.render({
    elem: '#uploadBanner',
    url: '/api/upload/',
    done: function (res) {
      layer.msg(res.msg);
      if (res.code === 0) {
        var path = res.data;
        $('#banner').attr('src', path);
      }
    },
    error: function () {
      //请求异常回调
    }
  });
});

// 编辑器
layui.use('layedit', function () {
  layedit = layui.layedit;
  layeditIndex = layedit.build('postContent'); //建立编辑器
});

// 表单提交
layui.use('form', function () {
  var form = layui.form;

  //监听提交
  form.on('submit(postForm)', function (data) {
    var cates = []; // 分类id数组
    var field = data.field;

    for (key in data.field) {
      console.log(key)
      if (key.indexOf('cate') !== -1) {
        cates.push(key.slice(4))
      }
    }
    var fireData = {
      title: field.title,
      category_id: cates.join(','),
      desc: field.desc,
      banner: $('#banner').attr('src') || '',
      author_id: field.author_id,
      from: field.from,
      type: 'markdown',
      content: field.content,
      is_draft: field.is_draft === 'on',
      is_top: field.is_top === 'on',
      created_at: field.created_at
    };

    $.ajax({
      url: data.form.action,
      method: 'put',
      data: fireData,
      success: function (res) {
        layer.msg(res.msg);
      },
      error: function (err) {
        console.error(err)
      }
    });
    return false;
  });
});