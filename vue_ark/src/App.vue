<template>
  <el-container class="layout-container-demo">
    <el-container>
      <el-header>
          <el-menu :default-active="navActive.path" class="el-menu" mode="horizontal" 
        background-color="#000" text-color="#fff" active-text-color="#77DDFF" router id="menu">
        <el-menu-item index="/">主页</el-menu-item>
        <el-menu-item index="/character_index">干员信息</el-menu-item>
        <el-menu-item index="/open_index">公开招募</el-menu-item>
        <el-menu-item index="/drama_index">泰拉信息</el-menu-item>
        <el-menu-item index="/activity_index">历史活动</el-menu-item>
        <el-menu-item index="/self_index">自拟干员</el-menu-item>
        <el-menu-item index="/add_index">添加信息</el-menu-item>
      </el-menu>
      </el-header>
      <el-main>
          <router-view :style="{ background: 'url(' + back + ')' }" no-repeat class="vie" />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import back from '../public/img/000.webp'
import {useRouter} from 'vue-router'
import {watchEffect,ref} from 'vue'
let router=useRouter();
let navActive=ref()
watchEffect(() => {
  navActive.value = router.currentRoute.value
  console.log(navActive.value)
})
</script>

<style>
.layout-container-demo{
  height: 99vh;
  margin: -8px;
  position: relative;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
}
.el-header{
  padding: 0;
}
.el-main{
  height: 100%;
  width: 100%;
  padding: 0;
  background: 'url(' +back+')'
}

</style>