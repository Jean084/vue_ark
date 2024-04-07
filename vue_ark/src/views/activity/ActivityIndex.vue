<template>
    <div id="view">
        <el-collapse v-model="activeNames" @change="handleChange">
          <div v-for="(itme,i) in activities_list" :key="i">
            <el-collapse-item :title=itme.year :name=i>
              <div class="collapse-item">
                <div  v-if="i==0" class="activity">
                  <div class="put-img">
                    <img :src="getImg('activities/none.jpg')" class="act-img"/>
                  </div>
                  <p class="act-else">{{"敬请期待"}}</p>
                </div>
                <div v-for="(itme0,i) in itme.activities" :key="i" class="activity">
                  <div class="put-img">
                    <img :src="getImg('activities/'+itme0.pic)" class="act-img"/>
                  </div>
                  <p class="act-text">{{itme0.name}}</p>
                  <p class="act-time" v-if="itme0.time_end">{{itme0.time_start.replace('T'," ").substring(0,16)+'至'+itme0.time_end.replace('T'," ").substring(0,16)}}</p>
                  <p class="act-time" v-else>{{itme0.time_start.replace('T'," ").substring(0,16)+'起'}}</p>
                </div>
              </div>
            </el-collapse-item>
            <div></div>
          </div>
        </el-collapse>
    </div>
</template>

<script setup>
import { ref, getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance();
const currentYear = new Date().getFullYear();
const startTear = 2019;
const num = currentYear-startTear+1;
console.log(currentYear);
console.log(num);
var activeNames= ref([0])
var activities_list=ref([])

for(var i=0; i<num;i++ ){
  var yearId = currentYear-i
  activities_list.value.push({year:yearId,activities:[]})
}


activities_list.value.forEach(active=>{
  proxy.$request.post(proxy.$urls.m().get_activate,{year:active.year}).then((result) => {
    console.log(active)
    active.activities=result.data
    console.log(active.activities)
  });
})
const handleChange=(val)=> {
  console.log(val);
}
const getImg = (img) => {
  try {
    return require("../../../public/img/" + img);
  } catch (e) {
    console.log(img);
    return require("../../../public/img/failed.png");
  }
};
</script>

<style>
  .collapse-item{
    display: flex;
    flex-wrap: wrap;
  }
  .el-collapse-item__header{
    font-size: 20px!important;
    font-weight: 600!important;
    padding-left: 50px;
  }
.activity{
  width: 230px;
  height: 130px;
  padding: 10px;
  padding-bottom: 20px;
}
.put-img{
  height: 100px;
  display: flex;
  align-items: center;
  background-color: black;
}
.act-img{
  width: 100%;
  margin: auto;
}
.act-text{
  line-height: 15px;
  margin-top: 2px;
}
.act-time{
  line-height: 15px;
  margin-top: -5px;
}
.act-else{
  line-height: 15px;
}
</style>
