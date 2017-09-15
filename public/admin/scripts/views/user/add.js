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

  // 表单验证
  // form.verify({
  //   username: function (value) {
  //     if (value.length < 5 || value.length > 16) {
  //       return '验证错误：用户名5-16位！'
  //     }
  //     if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
  //       return '验证错误：用户名中含有特殊字符';
  //     }
  //   },
  //   nickname: function (value) {
  //     if (value.length < 2 || nickname.length > 8) {
  //       return '验证错误：昵称2-8位！'
  //     }
  //   },
  //   email: [/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/, '验证错误：邮箱格式错误！'],
  //   password: function (value) {
  //     if (value.length < 5 || value.length > 16) {
  //       return '验证错误：密码6-16位！'
  //     }
  //   }
  // })

  //监听提交
  form.on('submit(addUserForm)', function (data) {
    console.log(data)
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