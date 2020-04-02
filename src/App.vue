<template>
  <div id="app">

    <router-view v-if="isRouterAlive"/>

  </div>
</template>
<script>
// 强制刷新页面方法
// 原理v-if="isRouterAlive" 移出和添加

export default {
  name:"app",
  data(){
    return{
      isRouterAlive:true

    }
  },
  //广播机制 监听所有页面
  provide(){ 
    return {
      reload:this.reload
    }
  },
  methods:{
    reload(){
      this.isRouterAlive = false;
      this.$nextTick(()=>this.isRouterAlive = true)//DOM百分百更新

    }
  }
}
</script>

 