const express = require('express')
const app = express()
const router = require('./router')
const debug =require("debug")('my-application')
const bodyParser = require('body-parser');
const cors = require('cors')

app.use(cors()) 

app.use(bodyParser.urlencoded({
    extended:true
}))

app.use('/api',router);

// cors跨域处理 后台处理跨域  前台不在生效
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4000");
    res.header("Access-Control-Allow-Headers", "Content-Type,Access-Token");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
}) 

app.listen(4000,function(){
    debug('运行在4000端口')
})