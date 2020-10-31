//将评论集合构造函数进行导入
const { Comment } = require('../../module/comment');

module.exports = async(req, res) => {
    //接收客户端传递过来的请求参数
    const { content, uid, aid } = req.body;

    //将评论信息存储到评论集合中
    await Comment.create({
        content: content,
        uid: uid,
        aid: aid,
        //当前这个评论发布的时间   让时间为发布评论时的时间
        time: new Date()
    });

    //将页面重定向回文章详情页面
    res.redirect('/home/article?id=' + aid);
}