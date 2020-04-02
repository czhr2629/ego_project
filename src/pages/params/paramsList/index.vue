<template>
  <div class="params">
    <div>
      <el-button type="primary" round @click="addParamsHandle">添加规格参数</el-button>
    </div>
    <ElementTable :tableData="paramsData">
      <el-table-column show-overflow-tooltip prop="id" label="规格参数"></el-table-column>
      <el-table-column show-overflow-tooltip prop="itemCatId" label="分类Id"></el-table-column>
      <el-table-column show-overflow-tooltip prop="paramData" label="规格参数数据" width="800px"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </ElementTable>
    <!-- 分页器 -->
    <Pagination @currentPageEvent="changePage" />
    <!--添加规格参数的 对话框 -->
    <el-dialog width="50%" title="商品类目选择" :visible.sync="paramsVisible">
      <ParamsTree @onTreeData="getTreedata" />
      <el-dialog append-to-body width="50%" title="添加分组" :visible.sync="groupVisible">
        <ParamsAdd @onParamsAdd="getaParamsAdd" />
      </el-dialog>

      <div slot="footer" class="dialog-footer">
        <el-button @click="paramsVisible = false">取消</el-button>
        <el-button type="primary" @click="groupVisibleHandle">确定并添加分组</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 引入分页
import Pagination from "../paramsPagination/index"
// 表格引入
import ElementTable from "@/components/ele-Table";
// tree 结构树
import ParamsTree from "../paramsTree";
// 添加分组的格式
import ParamsAdd from "../paramsAdd";
export default {
  name: "ParamsList",
  components: {
    ElementTable,
    ParamsTree,
    ParamsAdd,
    Pagination
  },
  data() {
    return {
      paramsData: [],
      page:1,
      paramsVisible: false, //添加规格参数的对话框
      groupVisible: false, //添加分组的对话框
      itemCatId: {},
      currentpage:1
    };
  },
  mounted() {
    this.http(this.page);
  },
  methods: {
    //点击页码时 请求新的页码数据
    changePage(page) {
      // console.log(page);
      this.currentpage = page
      this.http(page);
    },
    //   封装
    http(page) {
      this.$api
        .getSelectItemParamAll({
          page:page
        })
        .then(res => {
          // console.log(res.data);
          if (res.data.status === 200) {
            this.paramsData = res.data.data.result;
          } else {
            alert(res.data.msg);
          }
        });
    },
    // 添加规格参数 按钮
    addParamsHandle() {
      this.paramsVisible = true;
    },
    // tree回传的数据
    getTreedata(data) {
      // console.log(data);
      this.itemCatId = data;
    },
    // 添加分组的事件
    groupVisibleHandle() {
      this.groupVisible = true;
    },
    // 获取子级传递的 表单数据 提交到后台
    getaParamsAdd(data) {
      //规格参数添加
      // console.log(data);
      this.$api
        .getInsertItemParam({
          itemCatId: this.itemCatId.id, //id
          paramData: data //表单数据内容
        })
        .then(res => {
          // console.log(res.data)
          if (res.data.status === 200) {
            // console.log(res.data);
            // 成功之后  关闭弹出框 刷新页面
            (this.paramsVisible = false), (this.groupVisible = false);
            this.http(this.currentpage);
          } else {
            console.log(res.data.msg);
          }
        });
    },
    // 删除规格参数shijian
    handleDelete(index, row) {
      // console.log(row)
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$api.getDeleteItemParamById({
              id: row.id
            })
            .then(res => {
              if (res.data.status === 200) {
                // console.log(res.data)
                 this.$message({
                    type: "success",
                    message: "删除成功!",
                })
                this.http(this.currentpage);//重新调用
              } else {
                this.$message({
                    type: "error",
                    message: res.data.msg
                });
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style scoped>
.params {
  width: 1200px;
  margin: 0 auto;
  margin-top: 10px;
}
</style>