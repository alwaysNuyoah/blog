const { User } = require('../../module/user')
const bcrypt = require('bcrypt');

module.exports = async(req, res, next) => {
    //接收客户端传递过来的请求参数(能从post请求里获取除id以外的用户信息)并解构
    const {
        username,
        email,
        role,
        state,
        password
    } = req.body;
    //即将要修改的用户id(从get请求（地址栏）里获取)
    const id = req.query.id;

    //通过_id从数据库中查询用户信息
    let user = await User.findOne({ _id: id });

    //数据库中的密码是通过哈希加密加密过的
    // 参数1：明文密码（即客户端传递过来的密码）
    // 参数2：密文密码（即数据库中存储的密码 ）
    // bcrypt.compare返回布尔值，如果密码比对成功返回true，否则返回false
    // bcrypt.compare方法是异步方法，需加await并且放在异步函数async 中
    let isValid = await bcrypt.compare(password, user.password);

    if (isValid) {
        //密码比对成功   将用户信息更新到数据库当中
        // res.send('密码比对成功')
        //参数1：要更新的用户的id
        //参数2：要更新的属性及新的属性值
        await User.updateOne({ _id: id }, {
            username: username,
            email: email,
            role: role,
            state: state
        });
        // 更新完用户信息后，将页面重定向到用户列表页面
        res.redirect('/admin/user');
    } else {
        //密码比对失败
        // 触发错误处理中间件并且重定向到用户编辑页面并且提示错误信息
        // 参数1：path重定向的页面   参数2：错误提示信息   参数3：传递当前用户id，保证重新渲染页面时能准确渲染原来用户的信息
        let obj = { path: '/admin/user-edit', message: '密码比对失败，不能进行用户信息的修改', id: id }
            //next方法的第一个参数接收一个字符串
        next(JSON.stringify(obj));
    }

    // res.send(user);
}