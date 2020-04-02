import base from "./base"
import axios from "../utils/request"

const api ={
    // 登录接口
    getLogin(params){
        return axios.post(base.baseUrl + base.login,params)
    },
    // 商品查询接口
    getSelectTabItemAllByPage(params){
        return axios.get(base.baseUrl+base.selectTabItemAllByPage,{
            params:params
        })
    },
    // 查询数据库 商品总条数
    getTotal(){
        return axios.get(base.baseUrl+ base.total)
    },
    // 查询数据库params的商品总条数
    getTotalParams(){
        return axios.get(base.baseUrl+ base.totalParams)
    },
    // 类目查询接口
    getSelectItemCategoryByParentId(params){
        return axios.get(base.baseUrl +base.selectItemCategoryByParentId,{
            params:params
        })
    },
    // 添加产品接口  insertTabItem
    getInsertTabItem(params){
        return axios.get(base.baseUrl +base.insertTabItem,{
            params
        })
    },
    // 删除产品接口 
    getDeleteItemById(params){
        return axios.get(base.baseUrl + base.deleteItemById,{
            params
        })
    },
    // 预更新接口
    getPreUpdateItem(params){
        return axios.get(base.baseUrl + base.preUpdateItem,{
            params
        })
    },
    // 更新产品接口 
    getUpdataTbItem(params){
        return axios.get(base.baseUrl+base.updataTbItem,{
            params
        })
    },
    // 规格参数接口 
    getSelectItemParamAll(params){
        return axios.get(base.baseUrl+base.selectItemParamAll,{
            params
        })
    },
    //   规格参数  添加接口
    getInsertItemParam(params){
        return axios.get(base.baseUrl+base.insertItemParam,{
            params
        })
    },
     //   规格参数 删除接口
    getDeleteItemParamById(params){
        return axios.get(base.baseUrl+base.deleteItemParamById,{
            params
        })
    },
    // 内容分类管理接口
    getSelectContentCategoryByParentId(params){
        return axios.get(base.baseUrl+base.selectContentCategoryByParentId,{
            params
        })
    },
    // 内容分类管理导航添加接口
    getInsertContentCategory(params){
        return axios.get(base.baseUrl+base.insertContentCategory,{
            params
        })
    },
    // 内容分类管理导航删除接口 
    getDeleteContentCategoryById(params){
        return axios.get(base.baseUrl+base.deleteContentCategoryById,{
            params
        })
    },
    // 内容分类管理导航修改接口 
    getUpdateContentCategory(params){
        return axios.get(base.baseUrl+base.updateContentCategory,{
            params
        })
    },
    // 内容分类管理内容查询接口 
    getSelectTbContentAllByCategoryId(params){
        return axios.get(base.baseUrl+base.selectTbContentAllByCategoryId,{
            params
        })
    },
    // 内容分类管理 内容添加接口 
    getInsertTbContent(params){
        return axios.get(base.baseUrl+base.insertTbContent,{
            params
        })
    },
    // 内容分类管理 内容删除接口 
    getDeleteContentByIds(params){
        return axios.get(base.baseUrl+base.deleteContentByIds,{
            params
        })
    },
}


export default api