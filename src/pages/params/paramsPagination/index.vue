<template>
    <div>
        <el-pagination
            background
            layout="prev, pager, next"
            :current-page="currentPage"
            @current-change="CurrentChange"
            :total="total">
        </el-pagination>

    </div>
</template>
<script>
export default {
    name:'ProductPagination',
    data(){
        return{
            currentPage:1,
            total:0
        }
    },
    methods:{
        CurrentChange(currentpage){//当前页码  传递给父级请求相应的数据
            // console.log(currentpage)
            this.$emit('currentPageEvent',currentpage)
        }
    },
    mounted(){
        this.$api.getTotalParams().then(res=>{
        //    console.log(res.data.data.result[0]["COUNT(*)"]) 
           this.total = res.data.data.result[0]["COUNT(*)"]
        })
    }
}
</script>