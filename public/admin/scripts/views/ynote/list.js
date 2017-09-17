layui.use('table', function () {
  var table = layui.table;

  table.on('tool(postListTable)', function (obj) {

  })
});

$(document).ready(function () {
  $.ajax({
    url: '/api/ynote/category',
    method: 'get',
    success: function (res) {
      if (res.code === 0) {
        var html = '';
        res.data.map(function (item) {
          html += '<span class="layui-badge-rim">' + item.name + '</span>'
        });
        $('#cateListBox').append($(html));
      } else {
        layer.msg(res.msg);
      }
    }
  });

  $('#updateCategory').click(function () {
    layer.open({
      title: '提示',
      content: '接下来将会清空分类表，并重新创建，确定继续吗？',
      yes: function(index, layero){
        $.ajax({
          url: '/api/ynote/updateCategory',
          method: 'get',
          success: function (res) {
            layer.msg(res.msg);
          }
        });
        layer.close(index); //如果设定了yes回调，需进行手工关闭
      }
    });
  })
})