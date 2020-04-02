<template>
    <div>
        <el-tree
            :props="defaultProps"
            :load="loadTreeNodes"
            lazy
            highlight-current
            @node-click="handleNodeClick"
            :render-content="renderContent"
            :expand-on-click-node = "false"
        >
        </el-tree>
        <!-- 添加对话框 -->
        <el-dialog
            title="添加广告"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose"
            
        >
        <span>
            <el-input type="text" v-model="categoryName" placeholder="请添加广告名称"></el-input>
        </span>
        <span>
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="sureHandler">确定</el-button>
        </span>
        </el-dialog>

         <!-- 修改对话框 -->
        <el-dialog
            title="修改广告"
            :visible.sync="updateVisible"
            width="30%"
            :before-close="handleClose"
            
        >
        <span>
            <el-input type="text" v-model="updataName" :placeholder="clickUpdateData.name"></el-input>
        </span>
        <span>
            <el-button @click="updateVisible = false">取消</el-button>
            <el-button type="primary" @click="sureupdateHandler">确定</el-button>
        </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name:"ContentNav",
    inject:["reload"],//监听广播
    data(){
        return{
            defaultProps:{
                children:"children",
                label:"name"
            },
            dialogVisible:false, //dhk
            categoryName:"",
            categroyData:{}, //append点击到的 存储数据
            updateVisible:false,//修改对话框
            updataName:"",
            clickUpdateData:""
        }
    },
    
    methods:{
        loadTreeNodes(node,resolve){
            console.log(node)
            if(node.level === 0){//0第一次请求
                this.$api.getSelectContentCategoryByParentId()
                .then(res=>{
                    console.log(res.data)
                    if(res.status === 200){
                        return resolve(res.data.data)
                    }
                }).catch(error=>{
                    resolve([])
                })
            }
            if(node.level >= 1){//二级嵌套需要传递id
               this.$api.getSelectContentCategoryByParentId({
                   id:node.data.pid
                }).then(res =>{
                    console.log(res.data)
                    if(res.status === 200){
                        return resolve(res.data.data)
                    }
                }).catch(error=>{
                    resolve([])
                })
            }
        },

        handleNodeClick(data){
            // console.log(data)//获取点击到的数据
            // 传递给兄弟内容 页面  同级之间传递有很多方法 watch监听数据的变化.. vent-bus传递
            this.$bus.$emit("Navdata",data) //发送数据
        },

        // 给tree增加增加和更改、修改
        renderContent(h, { node, data, store }) {
            return (
                <span class="custom-tree-node">
                    <span>{node.label}</span>
                    <span>
                    <el-button size="mini" type="text" on-click={ () => this.append(data) }>添加</el-button>
                    <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>删除</el-button>
                    <el-button size="mini" type="text" on-click={ () => this.editor(node, data) }>修改</el-button>
                    </span>
                </span>
            );
        },
        // 添加
        append(data){
            console.log(data)
            this.dialogVisible =true,
            this.categroyData = data
        },
        // 确定按钮
        sureHandler(){
            this.$api.getInsertContentCategory({
                name:this.categoryName,
                pid:this.categroyData.pid
            }).then(res=>{
                console.log(res.data)
                if(res.status === 200){
                    // alert('添加成功') 添加成功 
                    this.dialogVisible =false
                    // 刷新页面  强制刷新页面方法
                    this.reload()
                }else{
                    alert("添加失败")
                }
            })
        },
        // 删除
        remove(node,data){
            // console.log(data)
            this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
                center:true
            }).then(()=>{
                this.$api.getDeleteContentCategoryById({
                    id:data.pid
                }).then(res=>{
                    if(res.data.status === 200){
                        this.$message({
                            type: "success",
                            message: "删除成功!",
                        })
                        // 刷新页面  强制刷新页面方法
                         this.reload()
                    }else{
                        this.$message({
                            type: "error",
                            message: "删除失败!",
                        })
                    }
                })
                 
            }).catch(()=>{
                 this.$message({
                    type: "info",
                    message: "取消删除!",
                })

            })
        },
        // 修改
        editor(node,data){
            // console.log(data)//所点击的所有获取数据
            this.updateVisible = true
            this.clickUpdateData = data
        },
        // 确定修改  提交给后台
        sureupdateHandler(){
            if(this.updataName){//有内容才修改
                this.$api.getUpdateContentCategory({
                    id:this.clickUpdateData.pid,
                    name:this.updataName
                }).then(res=>{
                    if(res.data.status === 200){
                        this.$message({
                            type: "success",
                            message: "修改成功!",
                        })
                        // 刷新页面  强制刷新页面方法
                        this.reload()
                    }else{
                        this.$message({
                            type: "error",
                            message: "修改失败!",
                        })
                    }
                })
            }else{
                alert("请输入修改的数据")
            }
        },
        // 关闭对话框
        handleClose(){
            this.dialogVisible = false
            this.updateVisible =false

        },
    }
}
</script>