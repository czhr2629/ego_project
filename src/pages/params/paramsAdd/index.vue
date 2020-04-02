<template>
    <div>
        <el-button @click="addDomain">添加分组</el-button>
        <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px">
            <el-form-item
                v-for="(domain,index) in dynamicValidateForm.domains"
                :key="index"
                :label="'规格参数'+index"
                :prop="'规格参数'+index"
                >
                <el-input v-model="domain.value" style="width:60%;margin-right:10px;"></el-input>
                <el-button @click.prevent="addJieShao(index)">添加规格参数</el-button>
                <el-button @click="removeDomain(domain)">删除</el-button>
                <div 
                    v-for="(item,index2) in dynamicValidateForm.domains[index].children"
                    :key="index2"
                    :label="'参数'+index2"
                    :prop="'参数'+index2"
                >
                <el-input v-model="item.childValue" style="width:60%;margin-right:10px;"></el-input>
                <el-button @click.prevent="removeChild(index,item)">删除</el-button>
                </div>
                
            </el-form-item>
            <el-form-item>
                <el-button @click="submitForm('dynamicValidateForm')" type="primary">提交</el-button>
                <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
            </el-form-item>
        </el-form>

    </div>
</template>
<script>
export default {
    name:"ParamsAdd",
    data(){
        return{
            dynamicValidateForm:{
                domains:[
                    {
                        value:"",
                        children:[
                            {
                                childValue:"",
                                value:""
                            }
                        ]
                    }
                ]
            }
        }
        
    },
    methods:{
        // 注：添加分组添加子结构input框 都是在给js中的data添加数据 页面中循环显示
        addDomain(){
            this.dynamicValidateForm.domains.push({
                value:"",
                children:[{
                    value:"",
                    children:[]
                }]
            })
        },
      // 点击删除大的分组 
        removeDomain(item){
            var index = this.dynamicValidateForm.domains.indexOf(item)
            if(index !== -1){
               this.dynamicValidateForm.domains.splice(index,1)
           }
        },
        // 添加分组
        addJieShao(index){
            this.dynamicValidateForm.domains[index].children.push({
                childValue:"", 
                value:""
            })
        },
        // 删除子结构   找到对应要删除的
        removeChild(index,item){
           var num = this.dynamicValidateForm.domains[index].children.indexOf(item)
           if(num !== -1){
               this.dynamicValidateForm.domains[index].children.splice(num,1)
           }
        },
        // 提交数据  获取数据  回传给调用的父级
        submitForm(data){
            this.$refs[data].validate(valid=>{
                if(valid){
                    // console.log(this.dynamicValidateForm.domains)
                    this.$emit("onParamsAdd",JSON.stringify(this.dynamicValidateForm.domains))
                }else{
                    console.log("错误的提交")
                    return false
                }
            })

            
        },
        //重置
        resetForm(formName){
            this.$refs[formName].resetFilds();
        }
    }
}
</script>