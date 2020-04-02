<template>
    <div>
        <el-tree 
        :props="defaultProps" 
        @node-click="handleNodeClick"
        :load="loadTreeNodes"
        lazy
        highlight-current
        ></el-tree>
    </div>
</template>

<script>
  export default {
    name:"ProductTree",
    data() {
      return {
        data:[],
        defaultProps:{
          children: 'children',
           label: 'name'
        }
      }
    },
    methods: {
      handleNodeClick(data) {
        // console.log(data.name);
        // 把选择的类目传递到
        this.$emit("onTreeData",data.name)
      },
      loadTreeNodes(node,resolve){//请求数据
        // console.log(node.data)
        // console.log(node.level)//层级

        if (node.level === 0) {// 第一层级访问
          this.$api.getSelectItemCategoryByParentId().then(res=>{
            if(res.status === 200){
              // console.log(res.data.data)
              return resolve(res.data.data)
            }else{
              alert("请求失败")
            }
          })
        }
        if(node.level >= 1){
          this.$api.getSelectItemCategoryByParentId({
            id:node.data.cid//传递的id就是本层级的cid cid就是你要获取数据的id
          }).then(res=>{
            if(res.status === 200){
              return resolve(res.data.data)
            }else{
              alert("请求失败")
            }
          }).catch(error =>{
            resolve([])
          })
        }
      }

    }
  };
</script>