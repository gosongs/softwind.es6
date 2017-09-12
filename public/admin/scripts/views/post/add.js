var layedit;
var layeditIndex;

layui.use('table', function () {
  var table = layui.table;
});

layui.use('laydate', function () {
  var laydate = layui.laydate;
  laydate.render({
    elem: '#test1'
  });
});

layui.use('upload', function () {
  var upload = layui.upload;

  var uploadInst = upload.render({
    elem: '#uploadImg',
    url: '/upload/',
    done: function (res) {

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
    console.log(JSON.stringify(data.field));
    console.log(layedit.getContent(layeditIndex))
    return false;
  });
});