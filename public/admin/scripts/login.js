function getUrlParams() {
  var url = window.location.search;
  var obj = {};
  var reg = /[?&][^?&]+=[^?&]+/g;
  var arr = url.match(reg);
  if (arr) {
    arr.forEach(function (item) {
      var tempArr = item.substring(1).split('=');
      var key = decodeURIComponent(tempArr[0]);
      var val = decodeURIComponent(tempArr[1]);
      obj[key] = val;
    });
  }
  return obj;
}

layui.use('form', function () {
  var form = layui.form;

  //监听提交
  form.on('submit(loginForm)', function (data) {
    $.ajax({
      url: data.form.action,
      method: 'post',
      data: data.field,
      success: function (res) {
        if (res.code === 0) {
          var from = getUrlParams()['from'] || '/admin';
          window.location.href = from;
        } else {
          layer.msg(res.msg);
        }
      },
      error: function (err) {
        console.error(err)
      }
    });
    return false;
  });
});