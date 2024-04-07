<template>
  <div  class="clothse_page">
    <el-row :span="24" v-if="back==0">
      <el-radio-group v-model="sort" class="clothes_class" @change="select_sort()">
        <el-radio-button label="按品牌分类" value="按品牌分类" />
        <el-radio-button label="按时间分类" value="按时间分类" />
      </el-radio-group>
    </el-row>
    <el-row>
      <el-breadcrumb separator="/" v-if="back>0">
        <el-breadcrumb-item  v-if="back>0"><a @click="backpage(0)">泰拉时尚</a></el-breadcrumb-item>
        <el-breadcrumb-item  v-if="back>0 && title!='all'"><a @click="backpage(1)">{{title}}</a></el-breadcrumb-item>
        <el-breadcrumb-item  v-if="back>1">{{ cloth.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <div v-if="sort=='按品牌分类' && back==0" class="clothse_itme_page">
        <div v-for="(itme,i) in class_list" class="clothse_itme" @click="select_class(itme)">
            <div class="itme_class">
                <img :src="getImg('board/' + itme.name +'.png')" class="img_cloth_class">
            </div>
            <div class=img_cloth_class_text><p>{{itme.name}}</p></div>
        </div>
    </div>
    <div v-if="sort=='按时间分类' && back==0">
      <div v-for="(item,i) in time_list">
        <div class="clothse_time_tag">{{ item }}</div>
        <div class="clothse_itme_page">
          <div v-for="(item0,index) in clothes_list[i]" class="cloth_itme_all" @click="choose_cloth(item0)">
            <div :id="'mouse_item_'+i+'_'+index" @mousemove="mousemove(i,index)" class="horde"></div>
            <div class="cloth_itme">
              <img class="ico_back" :src="getImg('board/' + item0.class+ '.png')">
              <img class="img_cloth" :src="getImg('chara_all/' + item0.img)" :id="'mouse_item_img_'+i+'_'+index">
            </div>
            <div class="cloth_itme_text">
              <div class="cloth_itme_title">{{ item0.name }}</div>
              <div class="cloth_itme_english">{{get_english(item0.class)}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="back==1 && title!='all'" >
      <div class="broad_introduce">
        <el-carousel :interval="4000" :height="imgheight + 'px'" trigger="hover" class="img_all_board">
          <el-carousel-item v-for="item in img_list" :key="item">
            <el-image class="medium" :src="item" lazy @load="gethe(item)" id="imageRef" />
          </el-carousel-item>
        </el-carousel>
        <el-row class="broad_introduce_text">
          <el-col :span="12">
            <div class="broad_introduce_ico_box">
              <img class="broad_introduce_ico" :src="getImg('board/' + broad.name+ '.png')"/>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="broad_introduce_ico_box">
              <p class="text-style broad_introduce_title">{{ broad. name}}</p>
              <div v-for="(itme,i) in broad. introduce.split('\n')" :key="i" class="text-style">
                  {{itme}}<br>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="clothse_itme_page">
        <div v-for="(item, i) in clothes_list" :key="i" class="cloth_itme_all" @click="choose_cloth(item)">
          <div :id="'mouse_item_0_'+i" @mousemove="mousemove(0,i)" class="horde"></div>
          <div class="cloth_itme">
            <img class="ico_back" :src="getImg('board/' + broad.name+ '.png')">
            <img class="img_cloth" :src="getImg('chara_all/' + item.img)" :id="'mouse_item_img_0_'+i">
          </div>
          <div class="cloth_itme_text">
            <div class="cloth_itme_title">{{ item.name }}</div>
            <div class="cloth_itme_english">{{ broad.english }}</div>
          </div>
        </div>
      </div>

    </div>
    <div v-if="back==2">
      <div class="broad_introduce0">
        <div class="img_all_itme">
          <img class="ico_back0" :src="getImg('board/' + cloth.class+ '.png')">
          <img class="img_cloth_show" :src="getImg('chara_all/' + cloth.img)">
        </div>
        <div class="table_cloth">
          <div class="cloth_intor_item">
            <el-col :span="5" class="cloth_title_item text-style">衣装名称</el-col>
            <el-col :span="7" class="cloth_text_item text-style">{{cloth.name}}</el-col>
            <el-col :span="5" class="cloth_title_item text-style">所属干员</el-col>
            <el-col :span="7" class="cloth_text_item text-style">{{cloth.staff}}</el-col>
          </div>
          <div class="cloth_intor_item">
            <el-col :span="5" class="cloth_title_item text-style">所属品牌</el-col>
            <el-col :span="19" class="cloth_text_item text-style">{{cloth.class}}</el-col>
          </div>
          <div class="cloth_intor_item">
            <el-col :span="5" class="cloth_title_item text-style">简介</el-col>
            <el-col :span="19" class="cloth_text_item text-style">{{cloth.text}}</el-col>
          </div>
          <div class="cloth_intor_item" v-if="cloth.time!='-'">
            <el-col :span="5" class="cloth_title_item text-style">初次发布时间</el-col>
            <el-col :span="19"  class="cloth_text_item text-style">{{cloth.time}}</el-col>
          </div>
          <div class="cloth_intor_item">
            <el-col :span="5" class="cloth_title_item text-style">所属系列</el-col>
            <el-col :span="19" class="cloth_text_item text-style">{{cloth.belong}}</el-col>
          </div>
          <div class="cloth_intor_item">
            <el-col :span="5" class="cloth_title_item text-style">介绍</el-col>
            <el-col :span="19" class="cloth_text_item text-style">
              <div class="cloth_intro0 text-style-cg">{{cloth.intro0}}</div>
              <div>{{cloth.intro1}}</div>
            </el-col>
          </div>
          <div class="cloth_intor_item">
            <el-col :span="5" class="cloth_title_item text-style">获取方式</el-col>
            <el-col :span="7" class="cloth_text_item text-style">{{cloth.get}}</el-col>
            <el-col :span="12" class="cloth_text_item text-style box-shadow">{{cloth.cost}}</el-col>
          </div>
          <div class="cloth_intor_item">
            <el-col :span="5" class="cloth_title_item text-style">设计师</el-col>
            <el-col :span="19" class="cloth_text_item text-style">{{cloth.artist}}</el-col>
          </div>
        </div>

      </div>
    </div>
  </div>   
</template>
  
  <script setup>
  import "../assets/font/font.css"
  //import Vue from "vue";
  import { ref, getCurrentInstance} from "vue";
  // import {useMouseInElement} from '@vueuse/core'
  const { proxy } = getCurrentInstance();
  var class_list=ref([])
  var clothes_list=ref([])
  var broad=ref()
  var back=ref(0)
  var title=ref("all")
  var cloth=ref()
  var imgheight = ref(1);
  var img_list=ref([]);
  var time_list=ref([]);
  proxy.$request.post(proxy.$urls.m().get_clothes_class).then(result=> {
    class_list.value=result.data
  });
  const sort = ref("按品牌分类")
  const getImg = (img) => {
    console.log(img)
    try {
      return require("../../public/img/" + img);
    } catch (e) {
      return require("../../public/img/failed.png");
    }
  };
  const select_class=(itme)=>{
    broad.value=itme;
    back.value=1;
    title.value=itme.name;
    img_list.value=[]
    for(var i=0;i<broad.value.num;i++){
      img_list.value.push(getImg('board/' + broad.value.name+'_'+ (i) + '.png'))
    }
    proxy.$request.post(proxy.$urls.m().get_clothes_b,{class:itme.name}).then(result=> {
      clothes_list.value=result.data
    });
  }
  const backpage=(index)=>{
    back.value=index;
    if(index==0){
      title.value="all"
    }
  }
  const gethe = () => {
    var test = document.getElementById("imageRef")
    imgheight.value = test.clientHeight
  }
  const select_sort=()=>{
    if(sort.value=="按时间分类"){
      proxy.$request.post(proxy.$urls.m().get_clothes).then(result=> {
        time_list.value=[]
        clothes_list.value=[[result.data[0]]]
        time_list.value.push(result.data[0].online)
        var last_time=result.data[0].online;
        var index=0;
        for(var i=1;i<result.data.length;i++){
          const online=result.data[i].online
          if(online==last_time){
            clothes_list.value[index].push(result.data[i])
          }else{
            time_list.value.push(result.data[i].online)
            clothes_list.value.push([result.data[i]])
            index=index+1
            last_time=result.data[i].online
          }
        }
        console.log(time_list.value)
        console.log(clothes_list.value)
      });
    }
  }
  const get_english=(class_name)=>{
    for(var i=0;i<class_list.value.length;i++){
      if(class_list.value[i].name==class_name){
        return class_list.value[i].english
      }
    }
  }
  const mousemove=(i,index)=>{
    var oDiv = document.getElementById("mouse_item_"+i+"_"+index);
    console.log(oDiv)
    //var oDiv = document.querySelector('div')
    oDiv.addEventListener('mousemove', function(e){
      const x_e=(e.offsetX-75)/75
      const y_e=(180-e.offsetY)/180
      const deg_x=x_e*20+'deg'
      const deg_y=y_e*40+'deg'
      const mar_x=x_e*25+'px'
      const mar_y=y_e*50+'px'
      document.documentElement.style.setProperty('--monse_x_deg', deg_x)
      document.documentElement.style.setProperty('--monse_y_deg', deg_y)
      document.documentElement.style.setProperty('--monse_x_mar', mar_x)
      document.documentElement.style.setProperty('--monse_y_mar', mar_y)
      console.log("x:"+deg_x)
      console.log("y:"+deg_y)
    })
  }
  const choose_cloth=(cloth_one)=>{
    console.log(cloth_one)
    back.value=2;
    cloth.value=cloth_one
  }
  </script>
  
  <style>
  .clothse_page {
    padding: 10px;
    background-color: #ffffff75;
  }
  .clothse_itme_page{
    display: flex;
    flex-wrap: wrap;
  }
  .clothes_class {
    display: flex;
    padding-bottom:10px ;
  }
  .img_cloth_class {
    max-width: 150px;
    max-height: 150px;
    /* position: center; */
    position: absolute;
    margin: auto;
    top:0;
    left:0;
    right:0;
    bottom:0;
    filter: drop-shadow(2px 2px 1px #000000);
    transition: all 0.1s ease;
  }
  .itme_class{
    position: relative;
    width: 200px;
    height: 200px;
    text-indent: 100px;
    overflow: hidden;
    /* align-items: center; */
    background-color: #ffffff57;
    transition: background-color 0.3s ease;
  }
  .itme_class:hover {
    background-color: rgba(60, 180, 254, 0.89);
    .img_cloth_class{
      max-width: 190px;
      max-height: 190px;
      /* position: center; */
      position: absolute;
      margin: auto;
      top:0;
      left:0;
      right:0;
      bottom:0;
      filter: drop-shadow(6px 6px 3px #000000)
    }
  }
  .img_cloth_class_text {
    display: flex;
    height: 25px;
    justify-content: center;
    align-items: center;
    background-color: rgb(0, 0, 0);
    color: #fff;
  }
  .clothse_itme {
    margin: 20px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.366);
  }
  .broad_introduce{
    margin: 20px 10px;
    background-color: #ffffff72;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.366);
  }

  .broad_introduce_text{
    height: 250px;
  }
  .broad_introduce_ico_box{
    padding: 10px;
    height: 250px;
    overflow: hidden;
    position: relative;
  }
  .broad_introduce_ico{
    position: absolute;
    max-height: 150px;
    max-width: 200px;
    width: auto;
    height: auto;
    margin: auto;
    top:400px;
    left:0;
    right:0;
    bottom:0;
    filter: drop-shadow(0px -270px 0px #000000);
  }
  .text-style{
    font-family: lanyu;
  }
  .broad_introduce_title{
    font-size: 30px;
    margin-bottom: 0px;
    background-color: #000;
    color: #fff;
  }
  .cloth_itme_all{
    margin: 20px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.366);
    transition: all 0.5s ease;
    transform-style:preserve-3d;
    /* overflow: hidden; */
  }
  .img_cloth {
    width: auto;
    height: 400px;
    margin-top: 120px;
    background-size: auto 100% !important;
    background-position: center !important;
    clip-path: polygon(calc(50% - 75px) 0,calc(50% + 75px) 0 ,calc(50% + 75px) 290px,calc(50% - 75px) 290px);
    z-index: 2;
  }
  .cloth_itme{
    width: 150px;
    height: 300px;
    /* overflow: hidden; */
    background-color: #ffffff6a;
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
  }
  .ico_back{
    position: absolute;
    max-height: 100px;
    max-width: 100px;
    width: auto;
    height: auto;
    margin: auto;
    top:400px;
    left:10px;
    bottom:0;
    z-index:0;
    clip-path: polygon(-100px -400px,100px -400px ,100px -200px,-100px -200px);
    filter: drop-shadow(0px -350px 0px #000000);
  }
  .cloth_itme_text{
    background-color: #fff;
    height: 65px;
    position: relative;
  }
  .cloth_itme_title{
    position: absolute;
    font-size: 17px;
    width: auto;
    color: #3b3b3b;
    font-weight: 800;
    padding: 10px;
    left:0px;
  }
  .cloth_itme_english{
    position: absolute;
    font-size: 10px;
    font-weight: 600;
    color: #7d7c7c;
    left:0px;
    top:40px;
    padding: 0px 10px;
  }
  .cloth_itme_all:hover{
    transform: translateZ(0px) perspective(1000px) rotateY(20deg) rotateX(10deg) scale(1);
    .img_cloth {
      /* transform: translateZ(0px) perspective(10000px); */
      margin: calc(120px - 25px) -25px 0px 0px;
      filter: drop-shadow(-10px -10px 10px #000000);
      clip-path: polygon(calc(50% - 75px - 13px) 0,calc(50% + 75px) 0 ,calc(50% + 75px) calc(290px + 13px),calc(50% - 75px - 13px) calc(290px + 13px));
    }
    .ico_back{
      position: absolute;
      max-height: 100px;
      max-width: 100px;
      width: auto;
      height: auto;
      margin: auto;
      top:400px;
      left:10px;
      bottom:0;
      z-index:3;
      filter: drop-shadow(-50px -400px 0px #000000);
    }
  }
  .clothse_time_tag{
    background-color: #ffffffb2;
    color: #000;
    font-size: 15px;
    font-weight: 700;
    padding: 5px 30px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.366);
    text-align: left;
  }
  .horde{
    position: absolute;
    height: 360px;
    width: 150px;
    z-index: 10;
  }
  .img_cloth_show{
    margin: 0 15vh;
    width: 70%;
    height:auto;
  }
  .img_all_itme{
    width: 100vw;
    position: relative;
    overflow: hidden;
    background-color: #ffffff72;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.366);
    margin: 0px 10px;
    max-width: 600px;
    margin-bottom: 20px;
  }
  .ico_back0{
    position: absolute;
    max-height: 20vh;
    max-width: 20vh;
    width: auto;
    height: auto;
    margin: auto;
    top:100vh;
    left:10px;
    bottom:0;
    z-index:0;
    filter: drop-shadow(0px -90vh 0px #000000);
  }
  .table_cloth{
    position: relative;
    overflow: hidden;
    background-color: #ffffff72;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.366);
    margin: 0px 10px;
    min-width: 200px;
    background-color: #ffffff65;
    width: 100vw;
    max-width: 600px;
    padding: 20px 0px;
  }
  .cloth_intor_item{
    margin: 5px 25px;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.723);
    display: flex;
    flex-wrap: wrap;
  }
  .box-shadow{
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.723);
  }
  .cloth_title_item{
    padding: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.723);
    display: flex;
    justify-content:center;
    align-items: center;
  }
  .cloth_text_item{
    padding: 5px;
    display: flex;
    justify-content:center;
    align-items: center;
    flex-wrap: wrap;
  }
  .broad_introduce0{
    display: flex;
    flex-wrap: wrap;
    justify-content:center;
    align-items: center;
    margin: 20px 10px;
  }
  .cloth_intro0{
    margin: -5px;
    margin-bottom: 5px;
    padding: 10px 10px 5px 10px;
    width: 100%;
    font-family:chenguang;
    text-align: left;
  }
  .text-style-cg{
    font-family:chenguang;
  }
  </style>
  