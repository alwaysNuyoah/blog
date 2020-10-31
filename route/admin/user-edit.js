const { User } = require('../../module/user')

//渲染用户编辑（修改和新建）页面
module.exports = async(req, res) => {

    //标识  表示当前访问的是用户管理页面
    req.app.locals.currentLink = 'user';

    //获取地址栏里传过来的新建用户注册信息验证的报错信息提示
    //获取地址栏中的id参数
    const { message, id } = req.query;

    //如果当前传递了id参数
    if (id) {
        let user = await User.findOne({ _id: id });
        //修改操作
        //渲染用户编辑页面（修改）
        res.render('admin/user-edit', {
            message: message,
            user: user,
            link: '/admin/user-modify?id=' + id,
            button: '修改'
        })
    } else {
        // 添加（新建）操作
        res.render('admin/user-edit', {
            message: message,
            link: '/admin/user-edit',
            button: '添加'
        })
    }
}