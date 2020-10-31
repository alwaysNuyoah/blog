//通过解构的方式把用户集合的构造函数解构出来
const { User } = require('../../module/user');

module.exports = async(req, res) => {
    //获取要删除的用户id
    // res.send(req.query.id);
    await User.findOneAndDelete({ _id: req.query.id });
    res.redirect('/admin/user');
}