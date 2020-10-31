// 将文章集合的构造函数导入到当前文件中
const { Article } = require('../../module/article');
//导入mongoose-sex-page模块(分页查询)
const pagination = require('mongoose-sex-page');

module.exports = async(req, res) => {
    //接收客户端传递过来的页码
    const page = req.query.page;

    //标识  表示当前访问的是文章管理页面
    req.app.locals.currentLink = 'article';

    //查询所有文章数据
    //多级和联合查询.populate，可查询到作者的详细信息
    //此时author内部存储的是_id，.populate可根据_id查询作者的详细信息,此时author是一个对象，对象下面有username属性
    //page 指定当前页    size 指定每页显示的数据条数     display 指定客户端要显示的页码数量
    //exec  向数据库中发送查询请求
    // pagination(集合构造函数).page(1) .size(20) .display(8) .exec();
    let articles = await pagination(Article).find().page(page).size(2).display(3).populate('author').exec();

    //---------------------重要bug解决方法！！！！！！！------------------------
    //解决mongoose中populate方法导致模板引擎art-template无法渲染的问题
    //or解决mongoose返回的文档过大导致模板引擎art-template无法渲染的问题
    //错误  -RangeError:Maximmun call stack size exceeded

    //解决方案1：使用lean()   可以在查询链上使用lean(),告诉mongoose返回普通对象而不返回mongoose文档对象
    //let articles = await Article.find().populate('author').lean();

    //解决方案2：如果使用了第三方模块mongoose-sex-page控制查询数据，则不能使用lean().
    //const pagination = require('mongoose-sex-page');
    //let articles = await pagination(Article).find().page(page).size(2).display(3).populate('author').exec();
    //先用JSON.stringify()这个方法将文档对象转换为字符串，将它的其他属性全部格式掉，只需要留下需要的数据字符串
    //然后再通过JSON.parse()这个方法转为对象
    //articles = JSON.stringify(articles);
    // articles = JSON.parse(articles);


    articles = JSON.stringify(articles);
    articles = JSON.parse(articles);
    // res.send(articles);

    //渲染文章列表页面模板
    res.render('admin/article.art', {
        articles: articles
    });
}