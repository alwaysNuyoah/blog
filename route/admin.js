//引入express框架
const express = require('express');
//创建博客展示页面路由
const admin = express.Router();

//渲染登录页面
admin.get('/login', require('./admin/loginPage'));

//实现登录功能
admin.post('/login', require('./admin/login'));

//渲染用户列表页面
// 创建用户列表路由
admin.get('/user', require('./admin/userPage'));


//实现退出功能
admin.get('/logout', require('./admin/logout'));

//创建用户编辑页面路由(新增用户)
admin.get('/user-edit', require('./admin/user-edit'))

//创建实现用户添加   功能   路由（对新增用户信息验证判断是否符合规则）
admin.post('/user-edit', require('./admin/user-edit-fn'))

//创建用户信息修改功能对应的路由
admin.post('/user-modify', require('./admin/user-modify'))

//用户删除功能路由
admin.get('/delete', require('./admin/user-delete'))

//文章列表页面路由
admin.get('/article', require('./admin/article'))

//文章编辑页面路由
admin.get('/article-edit', require('./admin/article-edit'))

//实现文章添加功能的路由
admin.post('/article-add', require('./admin/article-add'))

//将路由对象作为模块成员进行导出
module.exports = admin;