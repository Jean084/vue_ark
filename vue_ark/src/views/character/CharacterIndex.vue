<template>
  <div id="view" class="vadd">
    <el-col :sapn="2" class="tac_cha">
      <div class="mb-2_cha">
          <h4 class="mb-text_cha">职业大类</h4>
      </div>
      <el-menu
        default-active="0"
        active-text-color="#77DDFF"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        :collapse=true
        text-color="#fff"
        @select="handleSelect2"
      >
      <el-menu-item index="0" class="item_cha">
          <el-icon>
            <p class="icon element-icons el-icon-ALL"></p>
          </el-icon>
      </el-menu-item>
      <el-sub-menu v-for="item in professions" :index="item.content" class="item_cha">
        <template #title>
          <img class="ico_cha" :src="getImg('ico/' + item.ico + '.webp')"/>
          <p class="pro_title">{{ item.title }}</p>
        </template>
        <el-menu-item :index="item.content" @click.native="handleSelect(item.content)" class="item_cha">
          <template #title>
            <el-icon><p class="icon element-icons el-icon-ALL"></p></el-icon>
          </template>
        </el-menu-item>
        <el-menu-item v-for="item_0 in item.professions_2" :index="item_0.cio" class="item_cha">
          <template #title>
            <img class="ico_cha" :src="getImg('ico/' + item_0.cio + '.webp')"/>
            <p>{{ item_0.profession_2 }}</p>
          </template>
        </el-menu-item>
      </el-sub-menu>
      </el-menu>
    </el-col>
    <el-main>
      <div class="el-chara">
        <div v-if="isSelect == 0" class="charas">
          <div v-for="(item, i) in character" :key="i">
            <router-link :to="'/look/' + item.staff">
              <div class="img" :style="{background:'url(' + getImg('chara_all/' + item.staff + '_'+(Math.floor(item.stars/4)+1)+'.png') + ')',}">
                <div class="black">
                  <div :class="'line ' + getcolor(item.stars)"></div>
                  <img
                    class="place"
                    :src="getImg('ico/' + item.camp + '.webp')"
                  />
                </div>
              </div>
            </router-link>
            <router-link :to="'/edit/' + item.staff">
              <p class="img-text">{{ item.staff }}</p>
            </router-link>
          </div>
        </div>
        <div v-else v-for="(item, i) in professions_2" :key="i">
          <el-row class="classify">
            <img
              class="ico-itme"
              :src="getImg('ico/' + item.cio + '.webp')"
            />
            <p>{{ item.profession_2 }}</p>
          </el-row>
          <div class="charas">
            <div v-for="(item0, i) in character" :key="i" class="role">
              <div v-if="item0.profession_2 == item.profession_2">
                <router-link :to="'/look/' + item0.staff">
                  <div class="img" :style="{background:'url(' + getImg('chara_all/' + item0.staff + '_'+(Math.floor(item0.stars/4)+1)+'.png').toString+ ')',}">
                    <div class="black">
                      <div :class="'line ' + getcolor(item0.stars)"></div>
                      <img class="place" :src="getImg('ico/' + item0.camp + '.webp')"/>
                    </div>
                  </div>
                </router-link>

                <router-link :to="'/edit/' + item0.staff">
                  <p class="img-text">{{ item0.staff }}</p>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
        <el-backtop :bottom="100" />
    </el-main>
  </div>
</template>

<script setup>
import axios from "axios";
//import Vue from "vue";
import { ref, getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance();
var professions_2 = ref([]);
var character = ref([]);
var professions = ref([])
proxy.$request.post(proxy.$urls.m().get_profession).then(async(result) => {
  for (var i=0;i<result.data.length;i++){
    const profession_now = result.data[i]
    await axios.post(proxy.$urls.m().get_profession_2, {
        profession: profession_now.profession,
      })
      .then((result_0) => {
        professions.value.push({title:profession_now.profession,content:profession_now.ico,ico:profession_now.ico,professions_2:result_0.data})
      });
  }
});
var isSelect = ref(0);
const handleSelect=(key, keyPath)=>{
  isSelect.value=key;
  if (key > 0) {
    proxy.$request
      .post(proxy.$urls.m().get_profession_2, {
        profession: professions.value[key-1].title,
      })
      .then((result) => {
        professions_2.value = result.data;
      });
  }
}
const handleSelect2=(key, keyPath)=>{
  isSelect.value=key;
  professions_2.value = [{cio:key,profession_2:key.substring(1)}];
}
proxy.$request.post(proxy.$urls.m().get_character_list).then((result) => {
  character.value = result.data;
});
const star_color = [
  { star: 6, color: "line6" },
  { star: 5, color: "line5" },
  { star: 4, color: "line4" },
  { star: 3, color: "line3" },
  { star: 2, color: "line2" },
  { star: 1, color: "line1" },
];
const getcolor = (stars) => {
  let choose = star_color.filter((i) => {
    return i.star == stars;
  });
  return choose[0].color;
};
const getImg = (img) => {
  console.log(img)
  try {
    return require("../../../public/img/" + img);
  } catch (e) {
    return require("../../../public/img/failed.png");
  }
};
</script>

<style>
.el-menu-vertical {
  padding-top: 20px;
}
.vadd {
    min-height: 100%;
    padding-top: 10px;
}
.el-chara {
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 160px !important;
  padding-right: 20px !important;
}

.charas {
  display: flex;
  flex-wrap: wrap;
  background-color: rgba(255, 255, 255, 0.559);
  padding-bottom: 20px;
}

.img {
  width: 150px;
  height: 300px;
  margin: 20px 20px 0px 20px;
  border: 1px solid #000;
  background-size: auto 100% !important;
  background-position: center !important;
}

.classify {
  padding-left: 25px;
  font-size: 25px;
  text-align: start;
  font-weight: 600;
  background-color: lightgray;
  display: flex;
}

.ico-itme {
  width: 50px;
  height: 50px;
  margin-top: 15px;
  padding-right: 10px;
}

.black {
  height: 50px;
  width: 0px;
  margin-top: 192px;
  border-left: 151px solid;
  border-top: 60px solid transparent;
  color: #000;
  bottom: 0;
}

.line {
  height: 20px;
  width: 152px;
  margin-left: -152px;
  margin-top: -49px;
  transform: skew(0deg, 22deg);
}

.line6 {
  background-image: linear-gradient(#fff0, 7px, #ff9900);
}

.line5 {
  background-image: linear-gradient(#fff0, 7px, #fff900);
}

.line4 {
  background-image: linear-gradient(#fff0, 7px, #a317ca);
}

.line3 {
  background-image: linear-gradient(#fff0, 7px, #178dca);
}

.line2 {
  background-image: linear-gradient(#fff0, 7px, #ddf65c);
}

.line1 {
  background-image: linear-gradient(#fff0, 7px, #e4e4e4);
}

.place {
  width: 80px;
  height: 80px;
  margin-left: -220px;
  margin-top: -10px;
  z-index: 99;
}

.img-text {
  background-color: #fff;
  width: 80%;
  margin: auto;
  border-radius: 20px;
}
.tac_cha{
  margin-top: -10px;
  position:fixed;
  min-height: 100%;
  background-color: rgba(255, 255, 255, 0.514);
  width: 140px;
}
.mb-2_cha{
  background-color: rgba(255, 255, 255, 0.514);
  padding: 1px;
  height: 50px;
}
.mb-text_cha{
  margin-top: 11px;
}
.item_cha{
  display: flex;
  font-weight: 500;
  height: 45px;
  align-items: center;
  justify-content: center;
}
.ico_cha{
  width: 30px;
  height: 30px;
}
.el-menu-vertical-demo{
  width: 140px;
  padding-bottom: 10px;
}

.is-active .pro_title{
  filter: drop-shadow(1000px 0 0 #77DDFF)!important;
  transform: translate(-1000px)!important;
}
.is-active .ico_cha {
  filter: drop-shadow(1000px 0 0 #77DDFF)!important;
  transform: translate(-1000px)!important;
}
</style>
