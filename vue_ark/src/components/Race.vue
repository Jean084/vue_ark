<template>
    <div>
      <el-form-item label="" class="race_choose">
        <el-select v-model="race" placeholder="选择物种" @change="selectRace(race)">
          <div v-for="(itme, i) in race_list" :key="i">
            <el-option :label="itme.race" :value="itme.race"></el-option>
          </div>
        </el-select>
      </el-form-item>
      
    </div>
    <el-row class="can">
      <el-col :span="10">
        <el-image class="medium" :src="getImg('race/' + activeRace.ico)"/>
      </el-col>
      <el-col :span="14">
        <el-scrollbar class="logintro">{{activeintro}}</el-scrollbar>
      </el-col>
    </el-row>
    <el-row class="empety">
    </el-row>
  </template>
  
  <script setup>
  import {ref,getCurrentInstance} from 'vue'
  const { proxy } = getCurrentInstance();
  var race_list = ref([])
  var race=ref()
  var activeRace=ref({ico:""})
  
  proxy.$request.post(proxy.$urls.m().get_race).then(result => {
    console.log(result.data)
        race_list.value = result.data
        console.log(race_list.value)
    })
    
  
const getImg = (img) => {
    try {
    return require("../../public/img/" + img);
    } catch (e) {
    console.log(img);
    return require("../../public/img/failed.png");
    }
};
const selectRace=(race)=>{
    for(var i=0;i<race_list.value.length;i++){
        if(race_list.value[i].name==race){
            activeRace.value=race_list.value[i]
            console.log(activeRace)
            break
        }
    }
}
  </script>
  <style>
  .canvas{
    height: 300px;
    width:auto;
  }
  .canvas-text{
    height: 300px;
  }
  .camp_choose{
    padding-top: 30px;
  }
  .can{
    display: flex;
    width: 100%;
    height: 300px;
    background-color: rgba(0, 0, 0, 0.8);
    margin-bottom: 20px;
  }
  .logintro{
    font-size: 20px;
    padding: 20px;
    font-family: lanyu;
    color:rgba(199, 199, 199, 0.822);
    
  }
  .empety{
    height: 20px;
  }
    </style>