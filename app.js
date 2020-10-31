//引入express框架
const express = require('express');
//处理路径
const path = require('path');
//引入body-parser模块并且对模块进行全局配置，也就是说要拦截请求，然后把这个请求交给body-parser处理，body-parser这个第三方模块在处理完成后会在req这个对象下面添加一个body属性，在body属性里存储的实际上就是Post参数。
// 引入body-parser模块  用来处理post请求参数
//bodyParser只能处理普通表单传递过来的请求参数，不能处理客户端传递过来的二进制数据
//要接收客户端传递过来的二进制数据，需要用到formidable第三方模块
const bodyParser = require('body-parser');
//导入express-session模块
const session = require('express-session');
//导入art-template模板引擎
const template = require('art-template');
//导入dateformat第三方模块
const dateFormat = require('dateformat');
//导入morgan这个第三方模块
//在开发环境中，将客户端向服务器端发送的请求信息打印到控制台中，方便开发人员观察这个请求信息
//它是node.js的第三方模块，也是express框架的中间件函数
const morgan = require('morgan');
//导入config模块(config模块对象下面有一个方法叫做get，使用这个方法就可以获取json文件当中的配置信息)
const config = require('config');

//创建网站服务器
const app = express();
//数据库连接
require('./module/connect');
//对模块进行配置，处理post请求参数
//extended: false   使用系统模块querystring去处理post请求参数的格式
//extended: true    使用第三方模块qs去处理post请求参数的格式
app.use(bodyParser.urlencoded({ extended: false }))

//通过调用app.use()方法拦截所有请求，把这个请求交给session方法处理
//配置session
app.use(session({
    secret: 'secret key',
    // secret: 'keyboard cat',
    //resave是指每次请求都重新设置session cookie，假设你的cookie是10分钟过期，每次请求都会再设置10分钟
    resave: true,
    // 当用户没有登录的情况下，不要保存cookie
    saveUninitialized: true,
    cookie: {
        //设置cookie的过期时间（在过期之前可以保持登录状态）
        // 设置1天（24小时）     以毫秒为单位（1s=1000ms）
        maxAge: 24 * 60 * 60 * 1000
    }
}))


//告诉express框架模板所在的位置
app.set('views', path.join(__dirname, 'views'));
//告诉express框架模板的默认后缀是什么
app.set('view engine', 'art');
//当渲染后缀为art的模板时，所使用的模板引擎是什么
app.engine('art', require('express-art-template'));
//向模板内部导入dateFormate变量
template.defaults.imports.dateFormat = dateFormat;

//开放静态资源文件
app.use(express.static(path.join(__dirname, 'public')))

console.log(config.get('title'));

//process对象是全局对象global下面的一个属性对象  在process对象下面又有一个env对象，env是获取当前操作系统当中的系统环境变量，在系统环境变量里面有一个变量的名字叫做NODE_ENV 可用.获取
// env是environment的简写，代表环境
//process.env就是在获取电脑操作系统当中的系统环境变量   
//返回值是一个对象  在对象当中存储的就是当前系统当中的系统环境变量以及其值
//process.env.NODE_ENV获取NODE_ENV的值 development或者production
if (process.env.NODE_ENV == 'development') {
    // 当前是开发环境
    // morgan是express框架的中间件函数,可用app.use调用
    console.log('当前是开发环境');

    //在开发环境中，将客户端向服务器端发送的请求信息打印到控制台中
    //包含  请求方式  请求地址  响应信息：http状态码  响应的内容长度(请求的时间)
    app.use(morgan('dev'))
} else {
    // 当前是生产环境
    console.log('当前是生产环境');
}
//引入路由模块
const home = require('./route/home');
const admin = require('./route/admin');

//拦截请求，判断用户登录状态
app.use('/admin', require('./middleware/loginGuard'));

//为路由匹配请求路径
app.use('/home', home);
app.use('/admin', admin);

// 错误处理中间件
app.use((err, req, res, next) => {
    // JSON.parse()将字符串类型转换为对象类型
    //result即 { path: '/admin/user-edit', message: '密码比对失败，不能进行用户信息的修修改', id: id }
    const result = JSON.parse(err);
    // 通过循环的方式对参数进行拼接   把拼接好的字符串放到问号?后面
    let params = [];
    //当前的attr即为path，message，id
    for (let attr in result) {
        if (attr != 'path') {
            params.push(attr + '=' + result[attr]);
        }
    }
    // 当get参数有多个的时候，多个参数要用&符合进行分隔
    // params.join('&')将数组params里的元素按照字符&进行拼接
    res.redirect(`${result.path}?${params.join('&')}`);
})

//监听端口
app.listen(8083);
console.log('网站服务器启动成功，请访问localhost');