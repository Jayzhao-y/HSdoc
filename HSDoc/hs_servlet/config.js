const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
 
var appConfig = app => {
    // 设置获取请求体
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json()); 
 
    // // cookie的注册
    // app.use(cookieParser());  
    // // session的注册
    // app.use(cookieSession({
    //     name:"my_session",
    //     keys:["%$#^&^%&TSFR#$TRGDRG$%GFDG%^$#%#^GFDGRDHG$#@^Y%"],
    //     maxAge:1000*60*60*24*2    //过期时间设置为2天
    // }));
}
 
module.exports = appConfig;