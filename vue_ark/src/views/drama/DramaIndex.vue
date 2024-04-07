<template>
    <div id="view" class="vadd">
        
        <el-col :sapn="8" class="tac">
            <div class="mb-2">
                <h4>Taila</h4>
            </div>
            
            <el-menu
              active-text-color="#77DDFF"
              background-color="#545c64"
              class="el-menu-vertical-demo"
              text-color="#fff"
              @select="handleSelect"
            >
            <el-menu-item v-for="item in selectlist" :index="item.content" @click="handleSelect(item.content)" class="item">
            {{ item.title }}
            </el-menu-item>
            </el-menu>
        </el-col>
        <div class="form-drama">
            <Map class="map" v-if="isSelect==0"></Map>
            <Milimouse class="milimouse" v-if="isSelect==0"></Milimouse>
            <Race class="race" v-if="isSelect==1"></Race>
            <Clothes class="race" v-if="isSelect==4"></Clothes>
            <Glory class="race" v-if="isSelect==5"></Glory>
        </div>
        </div>
</template>

<script setup>
import Milimouse from '../../components/Milimouse.vue';
import Map from '../../components/Map.vue'
import Race from '../../components/Race.vue'
import Clothes from '../../components/Clothes.vue'
import Glory from '../../components/Glory.vue'
import { ref, getCurrentInstance } from "vue";
var isSelect=ref()
const selectlist = [{
            title:'泰拉地理',
            content:0,
        },{
            title:'泰拉生物',
            content:1,
        },{
            title:'泰拉物质',
            content:2,
        },{
            title:'泰拉历史',
            content:3,
        },{
            title:'泰拉时尚',
            content:4,
        },{
            title:'光荣之路',
            content:5,
        }]
const handleSelect=(key, keyPath)=>{
    isSelect.value=key;
    console.log(key, keyPath);
}
</script>

<style>
.vadd {
    min-height: 100%;
    padding-top: 10px;
}
.form-drama{
    height: auto;
    margin-left: 160px!important;
    margin-right: 20px!important;
}
.part{
    width: 50px;
    padding: 20px;
    margin: 20px;
    background-color: #ffffff00;
    border-radius: 50px;
    position:fixed;
    left:0;
    height:60px;
    z-index: 99;
}
.tab{
    background-color: rgba(171, 203, 244, 0);
    padding:20px;
}
.tac{
    margin-top: -10px;
    position:fixed;
    min-height: 100%;
    background-color: rgba(255, 255, 255, 0.514);
}
.mb-2{
    background-color: rgba(255, 255, 255, 0.514);
    padding: 1px;

}
.item{
    display: block;
    font-weight: 500;
    top:0
}
</style>
