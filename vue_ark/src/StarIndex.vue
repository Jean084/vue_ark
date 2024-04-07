<template>
  <div id="view">
    <div id="all">
      <div id=body>
        <el-carousel :interval="4000" :height="imgheight + 'px'" type="card" id="pic">
          <el-carousel-item v-for="(item, i) in imgList" :key="i">
            <el-image class="medium" :src="item" lazy @load="gethe(item)" id="imageRef" />
          </el-carousel-item>
        </el-carousel>
        <div id="mid">
          <el-row :gutter="20">
            <el-col class="part" :span="4">
              <router-link to="/character_index">
                <a>干员图鉴</a>
              </router-link>
            </el-col>
            <el-col class="part" :span="4">
              <router-link to="/open_index">
                <a>公开招募计算器</a>
              </router-link>
            </el-col>
            <el-col class="part" :span="4">
              <router-link to="/drama_index">
                <a>时间线梳理</a>
              </router-link>
            </el-col>
            <el-col class="part" :span="4">
              <router-link to="/activity_index">
                <a>中大型活动</a>
              </router-link>
            </el-col>
            <el-col class="part" :span="4">
              <router-link to="/self_index">
                <a>自制干员档案</a>
              </router-link>
            </el-col>
          </el-row>
        </div>
        <video id="video" controls>
          <!-- <source :src="video"> -->
        </video>
      </div>
      <div id="form">
        <p>制作：林巧津</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import img0 from '../public/img/0.png'
import img1 from '../public/img/1.png'
import img2 from '../public/img/2.png'
import img3 from '../public/img/3.png'
import img4 from '../public/img/4.png'
import img5 from '../public/img/5.png'
import img6 from '../public/img/6.png'
import img7 from '../public/img/7.png'
import { ref } from 'vue';
var imgList = ref([img0, img1, img2, img3, img4, img5, img6, img7]);
var imgheight = ref(1);
let img = new Image()
img.src = img0;
const gethe = () => {
  var test = document.getElementById("imageRef")
  imgheight.value = test.clientHeight
  console.log(imgheight)
}
</script>
<style>
#view {
  position: fixed;
  top: 60px;
  bottom: 0;
  right: 0;
  overflow-y: scroll;
  width: 100%;
  background:'url('+back+')'
}
#pic {
  width: 90%;
  margin: auto;
  padding-top: 50px;
}

#mid {
  width: 100%;
  margin: auto;
  margin-top: 50px;
  margin-bottom: 50px;
  background-color: rgba(146, 149, 153, 0.601);
}

#video {
  width: 50%;
  margin: auto;
  margin-top: 50px;
  margin-bottom: 50px;
}

#form {
  text-align: center;
  background-color: #000000;
  padding: 10px;
  color: white;
  font-size: 10px;
  text-align: end;
}

.medium {
  width: 100%;
  margin: auto;
}

@media (max-width: 600px) {
  #pic {
    height: 200px;
  }

  #header-img {
    max-height: 90px;
  }

  #goods {
    padding: 140px 0px 50px 0px
  }

  #text-0 {
    text-decoration-color: #fff;

  }
}

.part {
  padding: 10px;
  margin: 10px;
  background-color: #6d6d6d;
  border-radius: 2px;
  text-emphasis-color: #fff;
}</style>