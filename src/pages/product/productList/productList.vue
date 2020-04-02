<template>
  <div class="product-list">
    <div>
      <el-button type="primary" round @click="addproduct">添加商品</el-button>
    </div>
    <ElementTable :tableData="tableData">
      <el-table-column show-overflow-tooltip prop="id" label="商品"></el-table-column>
      <el-table-column show-overflow-tooltip prop="title" label="商品标题"></el-table-column>
      <el-table-column show-overflow-tooltip prop="image" label="商品图片"></el-table-column>
      <el-table-column show-overflow-tooltip prop="sellPoint" label="商品卖点"></el-table-column>
      <el-table-column show-overflow-tooltip prop="price" label="商品价格"></el-table-column>
      <el-table-column show-overflow-tooltip prop="num" label="商品数量"></el-table-column>
      <el-table-column show-overflow-tooltip prop="descs" label="商品描述" width="300px"></el-table-column>
      <el-table-column label="操作" width='150px'>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </ElementTable>
    <!-- 分页器 -->
    <Pagination @currentPageEvent="changePage" />

    <!-- 添加产品的对话框 -->
    <el-dialog title="添加商品" append-to-body :visible.sync="dialogVisible" width="80%">
      <!-- 商品类目  -->
      <el-dialog
        width="60%" 
        title="商品类目"
        :visible.sync="dialogTreeVisible"
        append-to-body
      >
        <ProductTree @onTreeData="getTreeData" />
        <el-button type="primary" @click="dialogTreeVisible = false">提交</el-button>
      </el-dialog>

      <el-form ref="form" :model="product" label-width="80px">
        <el-form-item label="商品类目">
          <el-button @click="productTreeHandle"  style="float:left" type="primary">选择类目</el-button>
          <span style="float:left;margin-left:20px;">{{treeData}}</span>
        </el-form-item>

        <el-form-item label="商品标题">
          <el-input v-model="product.title"></el-input>
        </el-form-item>

        <el-form-item label="商品卖点">
          <el-input v-model="product.sellPoint"></el-input>
        </el-form-item>

        <el-form-item label="商品价格">
          <el-input v-model="product.price"></el-input>
        </el-form-item>

        <el-form-item label="库存数量">
          <el-input v-model="product.num"></el-input>
        </el-form-item>

        <el-form-item label="上传图片">
          <el-button @click="uploadHandle" style="float:left" type="primary">上传图片</el-button>
          <span>{{ uploadImg.url }}</span>
          <el-dialog
            title="上传图片"
            :visible.sync="dialogUploadImgVisible"
            width="40%"
            append-to-body
            :before-close="handleClose"
          >
            <ProductUpload  @onUpload="getUpload"/>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogUploadImgVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogUploadImgVisible = false">确 定</el-button>
            </span>
          </el-dialog>
        </el-form-item>

        <el-form-item label="商品描述">
          <!-- -->
          <ProductUEditor @onProductDesc="getProductDesc" />
        </el-form-item>
      </el-form>
      <span>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitProductHandle">提交</el-button>
      </span>
    </el-dialog>

    <!-- 修改产品的对话框 -->
    <el-dialog title="更新商品" append-to-body :visible.sync="dialogUpdateVisible" width="80%">
      <!-- 商品类目  -->
      <el-dialog
        width="60%" 
        title="商品类目"
        :visible.sync="dialogTreeVisible"
        append-to-body
      >
        <ProductTree @onTreeData="getTreeData" />
        <el-button type="primary" @click="dialogTreeVisible = false">提交</el-button>
      </el-dialog>

      <el-form ref="form" :model="updateProduct" label-width="80px">
        <el-form-item label="商品类目">
          <el-button @click="productTreeHandle"  style="float:left" type="primary">选择类目</el-button>
          <span style="float:left;margin-left:20px;">{{treeData}}</span>
        </el-form-item>

        <el-form-item label="商品标题">
          <el-input v-model="updateProduct.title"></el-input>
        </el-form-item>

        <el-form-item label="商品卖点">
          <el-input v-model="updateProduct.sellPoint"></el-input>
        </el-form-item>

        <el-form-item label="商品价格">
          <el-input v-model="updateProduct.price"></el-input>
        </el-form-item>

        <el-form-item label="库存数量">
          <el-input v-model="updateProduct.num"></el-input>
        </el-form-item>

        <el-form-item label="上传图片">
          <el-button @click="uploadHandle" style="float:left" type="primary">上传图片</el-button>
          <span>{{ uploadImg.url }}</span>
          <el-dialog
            title="上传图片"
            :visible.sync="dialogUploadImgVisible"
            width="40%"
            append-to-body
            :before-close="handleClose"
          >
            <ProductUpload  @onUpload="getUpload"/>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogUploadImgVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogUploadImgVisible = false">确 定</el-button>
            </span>
          </el-dialog>
        </el-form-item>

        <el-form-item label="商品描述">
          <!-- -->
          <ProductUEditor @onProductDesc="getProductDesc" :updateProductDesc="updateProductDesc" />
        </el-form-item>
      </el-form>
      <span>
        <el-button @click="dialogUpdateVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateProductHandle">更新</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import ElementTable from "../../../components/ele-Table";
import Pagination from "../productPagination";
import ProductUEditor from "../product-ueditor/index";
import ProductUpload from "../productUpload";
import ProductTree from "../productTree"

export default {
  name: "ProductList",
  components: {
    ElementTable,
    Pagination,
    ProductUEditor,
    ProductUpload,
    ProductTree
  },
  data() {
    return {
      tableData: [],
      page: 1,
      dialogVisible: false,
      dialogUploadImgVisible: false,
      dialogTreeVisible:false,
      product: {}, //添加数据对象
      uploadImg:{},
      treeData:'',
      productDesc:"",
      // 修改数据 更改对象 
      updateProduct:{},
      dialogUpdateVisible:false,
      updateId:0,
      updateProductDesc:""
    };
  },
  mounted() {
    this.http(this.page);
  },
  methods: {
    http(page) {
      //网络请求封装
      this.$api
        .getSelectTabItemAllByPage({
          page: page
        })
        .then(res => {
          if (res.data.status == 200) {
            this.tableData = res.data.data.result;
          } else {
              console.log("暂无数据");
          }
        });
    },
    //点击页码时 请求新的页码数据
    changePage(page) {

      // console.log(page);
      this.http(page);
    },
    // 添加商品事件 点击弹出添加框
    addproduct() {
      this.dialogVisible = true;
    },
    // 实时获取商品描述信息
    getProductDesc(desc) {
      // console.log(desc);
      this.productDesc=desc
    },
    /**
     * 上传图片
     */
    uploadHandle() {
        this.dialogUploadImgVisible = true;
    },
    handleClose() {
        this.dialogUploadImgVisible = false;
    },
    /**
     * 获取上传图片资源
     */
    getUpload(data){
        this.uploadImg = data;
    },
    /**
     * 类目选择点击事件
    */
    productTreeHandle(){
      this.dialogTreeVisible = true
    },
    /* *
      *选择的类目名称 cid..
     */
    getTreeData(treename){
      // console.log(treename);
      this.treeData = treename
    },
    // sql添加产品事件
    submitProductHandle(){
   /*   console.log(this.product);//添加的部分数据
     console.log(this.productDesc)
     console.log(this.uploadImg)
     console.log(this.treeData.cid) */

      this.$api.getInsertTabItem({
          title:this.product.title,
          cid:this.treeData.cid,
          sellPoint:this.product.sellPoint,
          price:this.product.price,
          num:this.product.num,
          desc:this.productDesc,
          image:this.uploadImg.url
      }).then(res=>{
        // console.log(res.data)//打印出成功 status：200
        if(res.data.status === 200){
          // 成功就重新刷新数据  页面数据就自动刷新了
          this.http(this.page);//请求数据的函数
          this.dialogVisible =false //添加成功之后 添加框关闭
        }else{
          alert('添加数据失败')
        }
      })
    },
    // 商品编辑事件   预更新
    // (后台系统应该是很多人在使用，可能会出现多人同时修改一条数据，为了避免此现象 在修改之前 使用预更新效果查看数据是否发生变化)
    handleEdit(index,row){
      this.dialogUpdateVisible = true; //显示修改框
        this.updateId = row.id//更新的哪一条
      // 重新获取本条数据  重新获取后再放在修改框中
      this.$api.getPreUpdateItem({
        id:row.id,
      }).then(res=>{
        console.log(res.data)
        if(res.data.status ===200){
          // 更新后的数据赋值给updateProduct对象
          this.updateProduct ={
            title : res.data.data.title,
            num : res.data.data.num,
            sellPoint : res.data.data.sellPoint,
            price : res.data.data.price
          };
          this.uploadImg.url =res.data.data.image
          this.treeData =res.data.data.id
          this.updateProductDesc = res.data.data.descs
        }
      })
    },
    // 商品删除事件
    handleDelete(index,row){
      console.log(row) //里面是每个产品的信息
      // 点击删除先弹出是否要删除
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.getDeleteItemById({
              id:row.id
            }).then(res=>{
              if(res.data.status === 200){//删除成功
                this.http(this.page)
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              }else{
                this.$message({
                  type: 'info',
                  message: '删除失败'
                }); 
              }
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });    
    },
    // 更新按钮的 事件 点击更新提交修改好的数据
    updateProductHandle(){
      
      this.$api.getUpdataTbItem({
        id:this.updateId,
        title:this.updateProduct.title,
        sellPoint:this.updateProduct.sellPoint,
        price:this.updateProduct.price,
        num:this.updateProduct.num,
        cid:this.treeData,
        image:this.uploadImg.url,
        desc:this.productDesc
      }).then(res=>{
        // console.log(res.data)
        if(res.data.status === 200){//更新成功
            this.dialogUpdateVisible =false //关闭修改页面
            this.http(this.page)
        }else{
          alert('修改数据失败')
        }
      })

    }

  }
};
</script>

<style scoped>
.product-list {
  width: 1200px;
  margin: 0 auto;
  margin-top: 10px;
}
.upload-img {
  width: 200px;
  float: left;
  margin-left: 10px;
}
</style>