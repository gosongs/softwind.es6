layui.use('table', function () {
  var table = layui.table;

  table.on('tool(userListTable)', function (obj) {
    var data = obj.data;
    var layEvent = obj.event;
    var tr = obj.tr;

    if (layEvent === 'status') { // 启用/禁用
      $.ajax({
        url: '/api/category',
        method: 'POST',
        data: {
          _id: data._id,
          status: !data.status
        },
        success: function (res) {
          obj.update({
            status: !data.status
          });
          layer.msg(res.msg);
        }
      });
    } else if (layEvent === 'del') { //删除
      layer.confirm('真的删除行么', function (index) {
        $.ajax({
          url: '/api/category',
          method: 'DELETE',
          data: { _id: data._id },
          success: function (res) {
            obj.del();
            layer.close(index);
            layer.msg(res.msg);
          }
        })
      });
    } else if (layEvent === 'edit') { //编辑
      $.ajax({
        url: '/api/category',
        method: 'POST',
        data: {
          _id: data._id,
          name: data.name,
          desc: data.desc
        },
        success: function (res) {
          obj.update({
            name: data.name,
            desc: data.desc
          });
          layer.msg(res.msg);
        }
      });
    }
  })
});