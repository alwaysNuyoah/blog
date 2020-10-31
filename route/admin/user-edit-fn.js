//引入用户集合的构造函数
const { User, validateUser } = require('../../module/user');
//引入加密模块
const bcrypt = require('bcrypt');

module.exports = async(req, res, next) => {
    //定义对象的验证规则
    try {
        await validateUser(req.body);
    } catch (e) {
        //验证没有通过
        // 错误信息：e.message
        // 重定向回用户添加页面并且通过地址栏传递回去错误信息
        // res.redirect('/admin/user-edit?message='+e.message)//通过+拼接上e.message
        //通过ES6中的模板字符串来拼接
        // return res.redirect(`/admin/user-edit?message=${e.message}`)
        //调用next方法触发app.js内部的错误处理中间件（next方法只能传递一个参数（把两个数据放到一个对象里），并且需要时字符串类型）
        //JSON.stringfy()将对象数据类型转换为字符串数据类型
        return next(JSON.stringify({ path: '/admin/user-edit', message: e.message }))
            //JSON.stringify({ path: '/admin/user-edit', message: e.message }传递到app.use的参数err里
    }
    // res.send(req.body);
    //根据邮箱地址查询用户是否存在
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        //如果用户存在  重定向回用户添加页面并提示用户邮箱地址已经被别人占用了
        // return res.redirect(`/admin/user-edit?message=邮箱地址已经被占用`);
        return next(JSON.stringify({ path: '/admin/user-edit', message: '邮箱地址已经被占用' }))
    }
    //来到这里时，已经知道用户信息符合验证规则，同时邮箱也没有被占用，符合新增用户规则
    //对密码进行加密处理并且添加到数据库
    //对密码进行加密处理  
    // 生成随机字符串
    const salt = await bcrypt.genSalt(10);
    //加密
    //原始密码req.body.password   与    随机字符串salt
    const password = await bcrypt.hash(req.body.password, salt);
    // 替换密码
    //把req.body.password替换成加密的password，再添加到数据库中
    req.body.password = password;
    //将用户信息添加到数据库中（调用用户集合构造函数中的create方法）
    await User.create(req.body) //req.body:用户信息

    //将页面重定向回用户列表页面
    res.redirect('/admin/user');
}