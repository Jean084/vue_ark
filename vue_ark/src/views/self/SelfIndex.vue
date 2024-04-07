<template>
  <el-button :plain="true" @click="open">Show message</el-button>
</template>

<script setup>

const open = () => {
  ElMessage({
    message:'this is a message.',
    duration:300
  })
}
</script>

<style>
.con{
  position: relative;
}
.is-message-box{
  position:inherit
}
</style>
