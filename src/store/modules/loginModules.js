export default {
    namespaced:true,//加上它模块不会冲突报错
    state:{
        token:'',
        user:""
    },
    mutations:{
        setToken(state,value){
            state.token = value
        },
        clearToken(state){
            state.token =""
        },
        setUser(state,value){
            state.user = value
        },
        clearUser(state){
            state.user =""
        }
    }
}