//导入用户集合构造函数
const { User } = require('../../module/user');
const bcrypt = require('bcrypt');

module.exports = async(req, res) => {
    //接收请求参数
    // res.send(req.body);
    const { email, password } = req.body;
    // if (email.trim().length == 0 || password.trim().length == 0) return res.status(400).send('<h4>邮件地址或者密码错误</h4>');
    if (email.trim().length == 0 || password.trim().length == 0) return res.status(400).render('admin/error', { msg: '邮件地址或者密码错误' });
    //根据邮箱地址查询用户信息
    //如果查询到了用户 user变量的值是对象类型  对象中存储的是用户信息
    //如果没有查询到用户  user为空
    let user = await User.findOne({ email })
        //查询到了用户
    if (user) {
        // 将客户端传递过来的密码和用户信息中的密码进行比对
        // isValid比对成功返回true
        // isValid比对失败返回false
        let isValid = await bcrypt.compare(password, user.password);
        if (isValid) {
            //登陆成功
            // 将用户名存储在请求对象中
            //通过请求对象下面的session对象去存储，向session对象存储数据，session方法会在内部自动生成sessionID，在方法内部，它会为当前这个用户生成一个唯一的sessionID,并且把这个sessionID存储在客户端的cookie当中
            req.session.username = user.username;
            //将用户角色存储在session对象中，用以在middleware loginGuard.js中判断它是超级管理员还是普通用户
            // 防止普通用户在登录成功后在地址栏输入localhost/admin/user访问后台管理系统（超级管理员才有的权限）
            req.session.role = user.role;

            // res.send('登陆成功')

            req.app.locals.userInfo = user;

            //对用户的角色进行判断
            if (user.role == 'admin') {
                // 重定向到用户列表页面
                res.redirect('/admin/user');
            } else {
                res.redirect('/home/');
            }

        } else {
            //没有查询到用户
            res.status(400).render('admin/error', { msg: '邮箱地址或者密码错误' })
        }
    } else {
        //没有查询到用户
        res.status(400).render('admin/error', { msg: '邮箱地址或者密码错误' })
    }
};