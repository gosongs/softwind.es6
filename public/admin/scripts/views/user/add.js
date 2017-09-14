layui.use('laydate', function () {
  var laydate = layui.laydate;
  laydate.render({
    elem: '#createdAt',
    value: new Date()
  });
});

// 表单提交
layui.use('form', function () {
  var form = layui.form;

  //监听提交
  form.on('submit(addUserForm)', function (data) {
    $.ajax({
      url: data.form.action,
      method: 'put',
      data: data.field,
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

// 头像上传
layui.use('upload', function () {
  var upload = layui.upload;

  //执行实例
  var uploadInst = upload.render({
    elem: '#uploadAvatar',
    url: '/api/upload/',
    done: function (res) {
      layer.msg(res.msg);
      if (res.code === 0) {
        var path = res.data;
        $('#userAvatar').attr('src', path);
      }
    },
    error: function () {
      //请求异常回调
    }
  });
});