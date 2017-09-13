layui.use('laydate', function () {
  var laydate = layui.laydate;
  laydate.render({
    elem: '#createdDate',
    value: new Date()
  });
});

layui.use('form', function () {
  var form = layui.form;

  form.on('submit(AddCategoryForm)', function (data) {
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