// 导入用户集合构造函数
const { User } = require('../../module/user')

module.exports = async(req, res) => {

    //标识  表示当前访问的是用户管理页面
    req.app.locals.currentLink = 'user';

    //接收客户端传递过来的当前页参数
    //当用户没有输入页码时(req.query.page为空)，取默认值页码1
    let page = req.query.page || 1;
    //每一页显示的数据条数
    let pagesize = 6;
    //查询用户数据的总数
    let count = await User.countDocuments({});
    //总页数
    let total = Math.ceil(count / pagesize);

    //页码对应的查询开始位置
    let start = (page - 1) * pagesize;

    //将用户信息从数据库中查询出来
    //limit(2) // limit 限制查询数量  传入每页显示的数据数量
    //skip(1) // skip 跳过多少条数据  传入显示数据的开始位置
    // 数据开始查询位置=（当前页-1）* 每页显示的数据条数
    let users = await User.find({}).limit(pagesize).skip(start)
        // 渲染用户列表页面的模板 并把查询出来的用户信息users（ 是个数组） 传递过去
    res.render('admin/user', {
        users: users,
        page: page,
        total: total
    })
}