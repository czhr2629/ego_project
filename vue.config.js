// 解决跨域
module.exports ={
    devServer:{
        proxy:{
            "/api":{
                target:'http://localhost:4000/',
                pathRewrite:{
                    "^/api":''
                },
                changeOrigin:true //允许跨域
            }
        }
    }
}