const express =require('express');
const router = express();
const SQLConnect =require("./SQLConnect")
const config = require("./config")
const jwt = require('jsonwebtoken')
const url =require('url')
const multer = require("multer")
const fs =require("fs") //流的读取方案 读取文件

// 登录接口
router.post('/login',(req,res)=>{
    const username = req.body.username
    const password = req.body.password
    const sql = "select * from user where username=? and password=? "
    const arr = [username,password]
    SQLConnect(sql,arr,result =>{
        if(result.length>0){
            // 生成token信息
            const token = jwt.sign({
                username:username,
                password:password
            },config.jwtSecret);

            res.send({
                status:200,
                data:result,
                token:token
            })
        }else{
            res.send({
                status:500,
                msg:"登录失败,用户名或密码错误"
            })
        }
    })
})

// 商品查询接口  （接口可以随便起名 但是服务器端如果不一样 联调时候还需要改一般和后台一样） order by id desc 倒序排id
// get  请求   参数page页码
router.get('/backend/item/selectTabItemAllByPage',(req,res)=>{
    const page = url.parse(req.url,true).query.page || 1 ;
    const sql = "select * from project order by id desc limit 10 offset "+(page-1)*10;
    SQLConnect(sql,null,result=>{
        if(result.length > 0){
            res.send({
                status:200,
                data:{
                    result:result
                }
            })
        }else{
            res.send({
                status:500,
                msg:'暂无数据'
            })
        }
    })
})

// 返回数据总条数
router.get('/total',(req,res)=>{
    const sql = "select COUNT(*) from project where id"
    SQLConnect(sql,null,result=>{
        console.log(result)
        if(result.length >0){
            res.send({
                status:200,
                data:{
                    result:result
                }
            })
        }else{
            res.send({
                status:500,
                msg:"总条数查询失败"
            })
        }
    })
})
// params数据库
router.get('/total/params',(req,res)=>{
    const sql = "select COUNT(*) from params where id"
    SQLConnect(sql,null,result=>{
        console.log(result)
        if(result.length >0){
            res.send({
                status:200,
                data:{
                    result:result
                }
            })
        }else{
            res.send({
                status:500,
                msg:"总条数查询失败"
            })
        }
    })
})

/**
 * 图片上传
 */
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './mock/upload/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

var createFolder = function (folder) {
    try {
        fs.accessSync(folder);//读取文件
    } catch (e) {
        fs.mkdirSync(folder);
    }
};
// 上传的图片存在一个upload文件夹下面
var uploadFolder = './mock/upload/';
createFolder(uploadFolder);
var upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), function (req, res, next) {
    var file = req.file;
    console.log('文件类型：%s', file.mimetype);
    console.log('原始文件名：%s', file.originalname);
    console.log('文件大小：%s', file.size);
    console.log('文件保存路径：%s', file.path);
    res.json({ res_code: '0', name: file.originalname, url: file.path });
});

// 类目选择接口
router.get("/backend/itemCategory/selectItemCategoryByParentId",(req,res)=>{
    const id = url.parse(req.url,true).query.id || 1;
    const sql = "select * from category where id=?";
    var arr = [id]
    SQLConnect(sql,arr,result =>{
        if(result.length > 0){
            res.send({
                status:200,
                data:result
            })
        }else{
            res.send({
                status:500,
                msg:'类目接口失败'
            })
        }
    })
})

// 向数据库 添加产品数据
router.get("/backend/item/insertTabItem",(req,res)=>{
    var title = url.parse(req.url,true).query.title || "";  // 标题  如果没有则选择空
    var cid = url.parse(req.url,true).query.cid || "";  // 类目
    var sellPoint = url.parse(req.url,true).query.sellPoint || "";  // 卖点
    var price = url.parse(req.url,true).query.price || "";  // 价格
    var num = url.parse(req.url,true).query.num || "";  // 数量
    var image = url.parse(req.url,true).query.image || "";  // 图片
    var desc = url.parse(req.url,true).query.desc || "";  // 描述

    const sql = "insert into project values (null,?,?,?,?,?,?,'',1,'','',?)"
    var arr =[title,image,sellPoint,price,cid,num,desc]
    SQLConnect(sql,arr,result =>{
        if(result.affectedRows > 0){//if受影响的行数大于0 则插入成功
            res.send({
                status:200,
                success:true
            })
        }else{
            res.status(500).send({
                msg:'添加数据失败'
            })
        }
    })
})

// 产品删除接口
router.get('/backend/item/deleteItemById',(req,res)=>{
    const id = url.parse(req.url,true).query.id;
    const sql = "delete from project where id=?";
    const arr = [id]
    SQLConnect(sql,arr,result=>{
        if(result.affectedRows > 0){//if受影响的行数大于0 则删除成功
            res.send({
                status:200,
                success:true
            })
        }else{
            res.status(500).send({
                msg:'删除数据失败'
            })
        }
    })
})

// 预更新接口  
router.get("/backend/item/preUpdateItem",(req,res)=>{
    // 更新哪一个获取哪一个的id
    const id = url.parse(req.url,true).query.id;
    const sql = "select * from project where id=?";
    const arr = [id]
    SQLConnect(sql,arr,result =>{
        if(result.length >0){
            res.send({
                status:200,
                data:result[0]  //返回查询到的数据 数据库查询返回的是数组
            })
        }else{
            res.send({
                status:500,
                msg:'查询失败'
            })
        }
    })
})

// 更新数据的接口
router.get('/backend/item/updataTbItem',(req,res)=>{
    var id = url.parse(req.url,true).query.id;  // 修改的哪一条语句 id

    var title = url.parse(req.url,true).query.title;  // 标题
    var cid = url.parse(req.url,true).query.cid;  // 类目
    var sellPoint = url.parse(req.url,true).query.sellPoint;  // 卖点
    var price = url.parse(req.url,true).query.price;  // 价格
    var num = url.parse(req.url,true).query.num;  // 数量
    var image = url.parse(req.url,true).query.image;  // 图片
    var desc = url.parse(req.url,true).query.desc;  // 描述

    const sql = "update project set title=?,image=?,sellPoint=?,price=?,cid=?,num=?,descs=? where id=?"
    var arr =[title,image,sellPoint,price,cid,num,desc,id]
    SQLConnect(sql,arr,result =>{
        if(result.affectedRows > 0){//if受影响的行数大于0 则插入成功
            res.send({
                status:200,
                success:true
            })
        }else{
            res.status(500).send({
                msg:'添加数据失败'
            })
        }
    })
})

// 规格参数查询接口
router.get("/backend/itemParams/selectItemParamAll",(req,res)=>{
    // const page = url.parse(req.url,true).query.page || 1 ;
    // const sql = "select * from project order by id desc limit 10 offset "+(page-1)*10;

    const page = url.parse(req.url,true).query.page
    const sql = "select * from params order by id desc limit 10 offset " + (page-1)*10;

    SQLConnect(sql,null,result =>{
        if(result.length > 0){
            res.send({
                status:200,
                data:{
                    result:result
                }
            })
        }else{
            res.send({
                status:500,
                msg:"暂无数据"
            })
        }
    })
})

// 规格参数添加的接口
router.get("/backend/itemParam/insertItemParam",(req,res)=>{
    const itemCatId = url.parse(req.url,true).query.itemCatId
    const paramData = url.parse(req.url,true).query.paramData
    const sql = "insert into params values(null,?,?)";
    const arr = [itemCatId,paramData];

    SQLConnect(sql,arr,result =>{
        if(result.affectedRows > 0){
            res.send({
                status:200,
                success:true
            })
        }else{
            res.status(500).send({
                msg:"添加失败"
            })
        }
    })
})

// 规格参数删除的接口
router.get('/backend/itemParam/deleteItemParamById',(req,res)=>{
    const id = url.parse(req.url,true).query.id;
    const sql ="delete from params where id=?"
    const arr = [id]
    SQLConnect(sql,arr,result=>{
        if(result.affectedRows > 0){
            res.send({
                status:200,
                success:true
            })
        }else{
            res.status(500).send({
                msg:"删除失败"
            })
        }
    })
})

// 内容分类管理页面的导航 查询接口
router.get("/content/selectContentCategoryByParentId",(req,res)=>{
    const id = url.parse(req.url,true).query.id || 1;
    const sql ="select * from content where id=?"
    const arr = [id]

    SQLConnect(sql,arr,result=>{
        if(result.length > 0){
            res.send({
                status:200,
                data:result
            })
        }else{
            res.send({
                status:500,
                msg:"查询失败"
            })
        }
    })
})

// 内容分类管理导航添加
router.get("/content/insertContentCategory",(req,res)=>{
    const pid = url.parse(req.url,true).query.pid//获取父元素的pid 作为自己的id
    const name = url.parse(req.url,true).query.name
    const currentId = Math.floor(Math.random()*100000) //当前自己的id 获取随机数 以免重复
    const sql = "insert into content values (?,?,?)"
    const arr = [pid,name,currentId]

    SQLConnect(sql,arr,result=>{
        if(result.affectedRows > 0){
            res.send({
                status:200,
                success:true
            })
        }else{
            res.status(500).send({
                msg:"添加失败"
            })
        }
    })
})

// 内容分类管理导航删除
router.get("/content/deleteContentCategoryById",(req,res)=>{
    const id =url.parse(req.url,true).query.id
    const sql = "delete from content where pid=?" //pid是唯一的
    const arr = [id]
    SQLConnect(sql,arr,result=>{
        if(result.affectedRows > 0){
            res.send({
                status:200,
                success:true
            })
        }else{
            res.status(500).send({
                msg:"删除失败"
            })
        }
    })
})

// 内容分类管理导航的修改接口
router.get("/content/updateContentCategory",(req,res)=>{
    const id =url.parse(req.url,true).query.id
    const name =url.parse(req.url,true).query.name
    const sql = 'update content set name=? where pid=?'
    const arr = [name,id]
    SQLConnect(sql,arr,result=>{
        if(result.affectedRows > 0){
            res.send({
                status:200,
                success:true
            })
        }else{
            res.status(500).send({
                msg:"删除失败"
            })
        }

    })
})

// 内容分类管理内容的查询接口
router.get("/content/selectTbContentAllByCategoryId",(req,res)=>{
    const id = url.parse(req.url,true).query.id
    const sql = "select * from contentinfo where pid=?"
    const arr = [id]

    SQLConnect(sql,arr,result=>{
        if(result.length > 0){
            res.send({
                status:200,
                data:result
            })
        }else{
            res.send({
                status:500,
                msg:"暂无数据"
            })
        }
    })
})

// 内容分类管理 内容添加接口
router.get("/content/insertTbContent",(req,res)=>{
    const pid = url.parse(req.url,true).query.pid
    const name = url.parse(req.url,true).query.name
    const httpurl = url.parse(req.url,true).query.url
    const  image = url.parse(req.url,true).query.image
    const sql = "insert into contentinfo values (null,?,?,?,?)"
    const arr = [pid,name,httpurl,image]
    SQLConnect(sql,arr,result=>{
        if(result.affectedRows > 0){
            res.send({
                status:200,
                success:true
            })
        }else{
            res.status(500).send({
                msg:"添加失败"
            })
        }
    })
})

// 内容分类管理 内容删除接口
router.get("/content/deleteContentByIds",(req,res)=>{
    const id = url.parse(req.url,true).query.id
    const sql ="delete from contentinfo where id=?"
    const arr = [id]
    SQLConnect(sql,arr,result=>{
        if(result.affectedRows > 0){
            res.send({
                status:200,
                success:true
            })
        }else{
            res.status(500).send({
                msg:"删除失败"
            })
        }
    })
})

module.exports = router