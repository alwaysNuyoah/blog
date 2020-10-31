//连接数据库
//引入mongoose第三方模块
const mongoose = require('mongoose');
//导入config模块
const config = require('config');
//连接数据库
mongoose.set('useCreateIndex', true);

// console.log(config.get('db.host'));

// 在项目中使用账号连接数据库
// mongoose.connect('mongodb://user:pass@localhost:port/database')
//user:用户名   pass：密码     port：端口号   database：数据库的名字
//使用模板字符串反引号``对字符串进行拼接
mongoose.connect(`mongodb://${config.get('db.user')}:${config.get('db.pwd')}@${config.get('db.host')}:${config.get('db.port')}/${config.get('db.name')}`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('数据库连接成功'))
    .catch(() => console.log('数据库连接失败'))