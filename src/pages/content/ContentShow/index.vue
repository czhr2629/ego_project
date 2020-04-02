<template>
    <div>
        <el-button v-show="addShowBtn" class="addBtn" type="primary" @click="addDialogVisible = true">添加{{categroy.name}}</el-button>
        <el-table :data="content" style="width:'100%'">
            <el-table-column show-overflow-tooltip prop="id" label="id"></el-table-column>
            <el-table-column show-overflow-tooltip prop="name" label="标题"></el-table-column>
            <el-table-column show-overflow-tooltip prop="url" label="url地址"></el-table-column>
            <el-table-column show-overflow-tooltip prop="image" label="图片"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                <el-button circle size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 添加弹出框 -->
        <el-dialog
            title="添加内容"
            :visible.sync="addDialogVisible"
            width="60%"
            :before-close="handleClose"
        >
            <el-form :model="form" ref="form" label-width="80px">
                <el-form-item  label="标题">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item  label="URL地址">
                    <el-input v-model="form.url"></el-input>
                </el-form-item>
                <el-form-item  label="图片地址">
                    <el-input v-model="form.image"></el-input>
                </el-form-item>
            </el-form>
            <span>
                <el-button @click="addDialogVisible=false" >取消</el-button>
                <el-button @click="addDialogHandle" type="primary">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name:"ContentShow",
    inject:["reload"],//强制刷新
    data(){
        return{
            content:[],
            addDialogVisible:false,
            form:{},
            categroy:{},
            addShowBtn:false
        }
    },
    mounted(){
        this.http()
    },
    methods:{
        // 获取列表内容
        http(){
            this.$bus.$on("Navdata",msg=>{//读取$bus传递的数据
                //  console.log(msg)
                this.categroy = msg
                this.addShowBtn = true
                this.$api.getSelectTbContentAllByCategoryId({
                    id:msg.pid
                }).then(res=>{
                    console.log(res.data)
                    if(res.data.status === 200){
                        this.content = res.data.data
                    }else{
                        this.content = []
                    }
                })
            })
        },
        handleClose(){
           this.addDialogVisible = false
        },
        // 添加事件
        addDialogHandle(){
            this.$api.getInsertTbContent({
                pid:this.categroy.pid,
                name:this.form.name,
                url:this.form.url,
                image:this.form.image
            }).then(res=>{
                if(res.data.status === 200){
                    this.addDialogVisible = false,
                    this.reload()
                }else{
                    alert("添加失败")
                }
            })
        },
        // 删除事件
        handleDelete(index,row){
            this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    this.$api.getDeleteContentByIds({
                        id:row.id
                    }).then(res=>{
                        if(res.data.status === 200){
                            this.$message({
                                type: "success",
                                message: "删除成功!",
                            })
                            this.http()
                            this.reload()
                        }else{
                            this.$message({
                                type: "error",
                                message: "删除失败!",
                            })
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                })
        }
    }
}
</script>