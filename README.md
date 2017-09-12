
v1.0精简版:
  1. 后台管理站, es6
  2. Layui
  3. 部署到服务器

Admin路由:
  ● Dashboard: 	GET /admin
  ● Login:			GET /admin/login
  ● Register:		GET /admin/register
  ● 404:			  GET /admin/404
  ● 500:			  GET /admin/500
  ● 分类模块 category:
      ○ 列表页 	GET /admin/category/list
      ○ 新增页		GET /admin/category/add
  ● 用户模块 user: 
      ○ 列表页 	GET /admin/user/list
      ○ 新增页		GET /admin/user/add
  ● 文章模块 post:
      ○ 列表页 	GET /admin/post/list
      ○ 新增页		GET /admin/post/add
      ○ 导入页		GET /admin/post/import

API: 
  ● 分类模块 category:
      ○ PUT 		/api/category 新增
      ○ DELETE 	/api/category 删除
      ○ POST 		/api/category 修改
      ○ GET 		/api/category 列表, 支持筛选和分页
  ● 用户模块 user: 
      ○ PUT 		/api/user 新增
      ○ DELETE 	/api/user 删除
      ○ POST 		/api/user 修改
      ○ GET 		/api/user 列表, 支持筛选和分页
  ● 文章模块 post:
      ○ PUT 		/api/post 新增
      ○ DELETE 	/api/post 删除
      ○ POST 		/api/post 修改
      ○ GET 		/api/post 列表, 支持筛选和分页