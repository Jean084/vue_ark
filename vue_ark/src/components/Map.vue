<template>
  <el-row>
    <el-col :span="12">
      <div class="map" id="mapEchart" width="300" height="300"></div>
    </el-col>
    <el-col :span="12">
      <el-scrollbar class="intro">
      <p class="title-text">{{ place_show.name }}</p>
      <p class="title-context">{{ place_show.de.introduce }}</p>
      </el-scrollbar>
    </el-col>
  </el-row>
  
  <el-row class="empety-top">
    <el-image class="medium" :src="getImg('place/' + place_show.de.ico)"/>
  </el-row>
</template>
  
<script setup>
import geoJson from "../../public/map.json";
import {onMounted,ref,getCurrentInstance} from "vue";
import * as echarts from 'echarts';
import "echarts-gl";
import axios from "axios";
import "../assets/font/font.css"
const { proxy } = getCurrentInstance()
var camps = []
var place_show=ref({name:"泰拉大陆",de:{introduce:"123",ico:"尚蜀城.webp"}})
const chartMap=async()=>{
    var region_list=[]
    await axios.post(proxy.$urls.m().get_place).then(result=>{
      //region_list.push({name: '空',itemStyle: {color: "#FFFFFF"},emphasis:{itemStyle:{areaColor: "inherit",color:"auto"},label: {show:false}}})
      //region_list.push({name: '边界',itemStyle: {color: '#121212'},emphasis:{show:false,itemStyle:{color: "#121212"},label: {show:false}}})
      //camps.push({name: '空',itemStyle: {color: "#FFFFFF"},select:{itemStyle:{selectedMode: false}},label:{show:false}})
      camps.push({name: '边界',value:"boundary",itemStyle: {color: '#121212'},emphasis:{show:false,disabled:false,itemStyle:{color:"#121212"},label: {show:false}},selectedMode: false})
      for(var i=0;i<result.data.length;i++){
        if(i>22){
          continue
        }
        camps.push({name:result.data[i].place,value:result.data[i].value,de:result.data[i],itemStyle:{color:result.data[i].color},emphasis:{itemStyle:{color:result.data[i].color},label: {show:false}}})
        region_list.push({name:result.data[i].place,itemStyle:{color:result.data[i].color},emphasis:{itemStyle:{color:result.data[i].color},label: {show:false}}})
      }
    })
     var myChart = echarts.init(document.getElementById("mapEchart"));
      echarts.registerMap("Taila", geoJson);
      // 图表配置项
      let option = {
        tooltip:{
          show:true,
        },
        // geo3D: {
          //zlevel:100,
          // map: "Taila",
          // roam: true,
          // selectedMode:'multiple',
          // itemStyle: {
          //   opacity: 1,
          //   borderColor: "#fff",
          //   shadowColor: "#fff",//地图模糊颜色
          //   shadowBlur: 6,//地图模糊
          //   // areaColor: '#fff'
          // },
          // emphasis:{
          //   itemStyle:{},
          //   label: {
          //     show:false
          //   }},
          // viewControl: {
          //   distance: 100,
          //   minAlpha: 5, // 上下旋转的最小 alpha 值。即视角能旋转到达最上面的角度。[ default: 5 ]
          //   maxAlpha: 90, // 上下旋转的最大 alpha 值。即视角能旋转到达最下面的角度。[ default: 90 ]
          //   minBeta: -360, // 左右旋转的最小 beta 值。即视角能旋转到达最左的角度。[ default: -80 ]
          //   maxBeta: 360, // 左右旋转的最大 beta 值。即视角能旋转到达最右的角度。[ default: 80 ]
          //   animation: true, // 是否开启动画。[ default: true ]
          //   animationDurationUpdate: 1000, // 过渡动画的时长。[ default: 1000 ]
          //   animationEasingUpdate: "cubicInOut" // 过渡动画的缓动效果。[ default: cubicInOut ]
          // },
          // shading: "lambert",
          
          // regions:region_list,
          //[{name: '空',itemStyle: {color: "#FFFFFF"},emphasis:{itemStyle:{color: "#FFFFFF"},label: {show:false}}},
          //{name: '边',itemStyle: {color: '#121212'},emphasis:{itemStyle:{color: "#121212"},label: {show:false}}}],
          // selected:{itemStyle:true}
        // },
        series:[
          {
            type: "map3D",
            name:"Taila",
            map:  "Taila", // 地图类型。
            data:camps,
            tooltip:{
              show:true,
            },
            itemStyle: {
              color: "transparent",
            },
            emphasis:{
              itemStyle: {
                color: "transparent",
              },
              label:{
                show:false,
              }
            },
            light: {
            //光照阴影
            main: {
              color: "#fff", //光照颜色
              intensity: 0.5, //光照强度
            },
            ambient: {
              intensity: 0.7
            }
          },
          },
          // {
          //   type: "map3D",
          //   name:"Taila",
          //   map:  "Taila", // 地图类型。
          //   data:camps,
          //   tooltip:{
          //     show:true,
          //   },
          //   emphasis: {
          //     label: { show: false },
          //     itemStyle: {
          //       color: "transparent",
          //     },
          //   },
          // }
        ]
      };
      myChart.setOption(option);
      window.addEventListener("resize", () => {
        myChart.resize();
      });
      myChart.on('click',(params)=>{
        console.log(params.data)
        if (params.data.name=="边界"){
          place_show.value=camps[22]
        }else{
          place_show.value=params.data
        }
      })
    }
onMounted(()=>{
    chartMap();
})
const getImg = (img) => {
  try {
    return require("../../public/img/" + img);
  } catch (e) {
    console.log(img);
    return require("../../public/img/failed.png");
  }
};
</script>
<style>
.view_map{
  width: 100%;
  height: 50vh;
  display: flex;
}
.map{
    display: flex;
    justify-content: center;
    width: 100%;
    height: 300px;
}
.intro{
  width: 100%;
  height: 300px;
  background-color:rgba(255, 255, 255, 0.87) ;
  scroll-margin-right: true;
}
.title-text{
  padding: 0px 0px 0px 0px;
  margin-bottom: -20px;
  margin-top: 10px;
  font-family: feitian;
  font-size: 40px;
}
.empety-top{
  padding: 5px;
  justify-content: center;
  margin: auto;
}
.title-context{
  padding: 10px;
  font-size: 20px;
  font-family: lanyu;
}
.place-img{
  height: 200px;
}
</style>