module.exports = (req, res) => {
    // 删除session(destroy()方法内部它会自动根据cookie当中存储的sessionID来删除当前用户所对应的session信息)
    //删除成功后，调用function回调函数
    req.session.destroy(function() {
        // 删除cookie
        res.clearCookie('connect.sid');
        // 重定向到用户登录页面
        res.redirect('/admin/login');
        //清除模板中的用户信息(避免用户退出登录后，还能在文章详情页面进行评论)
        req.app.locals.userInfo = null;
    });
}