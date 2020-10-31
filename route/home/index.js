const { Article } = require('../../module/article')
    //导入分页模块
const pagination = require('mongoose-sex-page');

module.exports = async(req, res) => {
    // res.send('欢迎来到博客首页')
    //获取页码值
    const page = req.query.page;
    //标识  表示当前访问的是博客首页
    req.app.locals.currentLink = 'home';

    //从数据库中查询数据
    let result = await pagination(Article).page(page).size(4).display(5).find().populate('author').exec();
    // res.send(result);
    result = JSON.stringify(result);
    result = JSON.parse(result);

    //渲染模板并传递数据
    res.render('home/default.art', {
        result: result
    });
}