const base ={
    baseUrl:"/api",
    login:'/api/login',//登录接口
    selectTabItemAllByPage:"/api/backend/item/selectTabItemAllByPage",// 获取查询接口
    total:'/api/total', //product总条数
    totalParams:"/api/total/params", //params总条数
    selectItemCategoryByParentId:"/api/backend/itemCategory/selectItemCategoryByParentId", //类目查询接口
    insertTabItem:"/api/backend/item/insertTabItem", // 添加产品接口
    deleteItemById:"/api/backend/item/deleteItemById", //删除产品数据接口
    preUpdateItem:"/api/backend/item/preUpdateItem", //预更新
    updataTbItem:'/api/backend/item/updataTbItem', // 更新产品
    selectItemParamAll:"/api/backend/itemParams/selectItemParamAll", //规格参数接口
    insertItemParam:"/api/backend/itemParam/insertItemParam", //添加规格参数接口
    deleteItemParamById:"/api/backend/itemParam/deleteItemParamById", //删除规格参数
    selectContentCategoryByParentId:"/api/content/selectContentCategoryByParentId", //内容分类管理的查询
    insertContentCategory:"/api/content/insertContentCategory", //内容分类管理导航的添加
    deleteContentCategoryById:"/api/content/deleteContentCategoryById", //内容分类管理导航的删除
    updateContentCategory:"/api/content/updateContentCategory",//内容分类管理导航的修改
    selectTbContentAllByCategoryId:"/api/content/selectTbContentAllByCategoryId",//内容分类管理内容的查询
    insertTbContent:"/api/content/insertTbContent",//内容分类管理 内容添加
    deleteContentByIds:"/api/content/deleteContentByIds", //内容分类管理 内容删除

}
export default base