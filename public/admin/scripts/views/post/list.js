layui.use('table', function () {
  var table = layui.table;

  table.on('tool(postListTable)', function (obj) {
    var data = obj.data;
    var layEvent = obj.event;
    var tr = obj.tr;

    if (layEvent === 'status') { // 启用/禁用
      
    } else if (layEvent === 'del') { //删除
      layer.confirm('真的删除行么', function (index) {
        $.ajax({
          url: '/api/post',
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
      
    }
  })
});