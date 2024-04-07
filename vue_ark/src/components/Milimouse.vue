<template>
  <div>
    <el-form-item label="" class="camp_choose">
      <el-select v-model="activeLogo" placeholder="选择阵营" @change="clickLogo(particleCanvas,activeLogo)">
        <div v-for="(itme, i) in logoImgs" :key="i">
          <el-option :label="itme.name" :value="itme.name"></el-option>
        </div>
      </el-select>
    </el-form-item>
    
  </div>
  <el-row class="can">
    <el-col :span="10">
      <canvas ref="canvas" class="canvas" width="300" height="300"></canvas>
    </el-col>
    <el-col :span="14">
      <el-scrollbar class="logintro">{{activeintro}}</el-scrollbar>
    </el-col>
  </el-row>
  <el-row class="empety">
  </el-row>
</template>

<script setup>
import {ref,onMounted,getCurrentInstance} from 'vue'
const { proxy } = getCurrentInstance();
var camp_list = ref([])
var logoImgs=ref([])

proxy.$request.post(proxy.$urls.m().get_camp).then(result => {
    camp_list.value = result.data
    for (let i=0;i<camp_list.value.length;i++) {
        const item = camp_list.value[i]
        logoImgs.value.push(new LogoImg('img/ico/' +item.ico+ '.webp', item.name));
    }
  })
  
var activeLogo = ref("罗德岛")
var activeintro = ref()
const canvas = ref()
let context = ref()
var particleCanvas = ref()
const animateTime=20
const opacityStep=1/animateTime
const Radius=40;
const Inten = 0.95;
const width = 300,
  height = 300;

class Particle {
  constructor(totalX, totalY, time, color) {
    // 设置粒子的初始位置x、y，目标位置totalX、totalY，总耗时time
    this.x = (Math.random() * width) >> 0;
    this.y = (Math.random() * height) >> 0;
    this.totalX = totalX;
    this.totalY = totalY;
    this.time = time;
    // 设置粒子的颜色和半径
    this.r = 0.6;
    this.color = color;
    this.opacity = 0;
  }
  // 在画布中绘制粒子
  draw() {
    context.value.fillStyle = `rgba(${this.color.toString()})`;
    context.value.fillRect(this.x, this.y, this.r * 2, this.r * 2);
    context.value.fill();
  }
  /** 更新粒子
   * @param {number} mouseX 鼠标X位置
   * @param {number} mouseY 鼠标Y位置
   */
  update(mouseX, mouseY) {
    // 设置粒子需要移动的距离
    this.mx = this.totalX - this.x;
    this.my = this.totalY - this.y;
    // 设置粒子移动速度
    this.vx = this.mx / this.time;
    this.vy = this.my / this.time;
    // 计算粒子与鼠标的距离
    if (mouseX && mouseY) {
      let dx = mouseX - this.x;
      let dy = mouseY - this.y;
      let distance = Math.sqrt(dx ** 2 + dy ** 2);
      // 粒子相对鼠标距离的比例 判断受到的力度比例
      let disPercent = Radius / distance;
      // 设置阈值 避免粒子受到的斥力过大
      disPercent = disPercent > 7 ? 7 : disPercent;
      // 获得夹角值 正弦值 余弦值
      let angle = Math.atan2(dy, dx);
      let cos = Math.cos(angle);
      let sin = Math.sin(angle);
      // 将力度转换为速度 并重新计算vx vy
      let repX = cos * disPercent * -Inten;
      let repY = sin * disPercent * -Inten;
      this.vx += repX;
      this.vy += repY;
    }
    this.x += this.vx;
    this.y += this.vy;
    if (this.opacity < 1) this.opacity += opacityStep;
  }
  // 切换粒子
  change(x, y, color) {
    this.totalX = x;
    this.totalY = y;
    this.color = [...color];
  }
}

class LogoImg {
constructor(src, name) {
    this.src = src;
    this.name = name;
    this.particleData = [];
    let img = new Image();
    img.crossOrigin = "";
    img.src = src;
    // canvas 解析数据源获取粒子数据
    img.onload = () => {
      // 获取图片像素数据
      const tmp_canvas = document.createElement("canvas"); // 创建一个空的canvas
      const tmp_ctx = tmp_canvas.getContext("2d");
      const imgW = width;
      const imgH = ~~(width * (img.height / img.width));
      console.log(img.width,img.height)
      tmp_canvas.width = imgW;
      tmp_canvas.height = imgH;
      tmp_ctx?.drawImage(img, 0, 0, imgW, imgH); // 将图片绘制到canvas中
      const imgData = tmp_ctx?.getImageData(0, 0, imgW, imgH).data; // 获取像素点数据
      tmp_ctx?.clearRect(0, 0, width, height);

      // 筛选像素点
      for (let y = 0; y < imgH; y += 3) {
        for (let x = 0; x < imgW; x += 3) {
          // 像素点的序号
          const index = (x + y * imgW) * 4;
          // 在数组中对应的值
          const r = imgData[index];
          const g = imgData[index + 1];
          const b = imgData[index + 2];
          const a = imgData[index + 3];
          const sum = r + g + b + a;
          // 筛选条件
          if (sum >= 100) {
            const particle = new Particle(x, y, animateTime, [r, g, b, a]);
            this.particleData.push(particle);
          }
        }
      }
    };
  }
}

class ParticleCanvas {
  constructor(target) {
    // 设置画布 获取画布上下文
    this.canvasEle = target;
    this.ctx = target.getContext("2d");
    this.width = target.width;
    this.height = target.height;
    this.ParticleArr = [];
    // 监听鼠标移动
    this.canvasEle.addEventListener("mousemove", (e) => {
      const { left, top } = this.canvasEle.getBoundingClientRect();
      const { clientX, clientY } = e;
      this.mouseX = clientX - left;
      this.mouseY = clientY - top;
    });
    this.canvasEle.onmouseleave = () => {
      this.mouseX = 0;
      this.mouseY = 0;
    };
  }
  // 改变图片 如果已存在图片则根据情况额外操作
  changeImg(img) {
    if (this.ParticleArr.length) {
      // 获取新旧两个粒子数组与它们的长度
      let newPrtArr = img.particleData;
      let newLen = newPrtArr.length;
      let arr = this.ParticleArr;
      let oldLen = arr.length;

      // 调用change修改已存在粒子
      for (let idx = 0; idx < newLen; idx++) {
        const { totalX, totalY, color } = newPrtArr[idx];
        if (arr[idx]) {
          // 找到已存在的粒子 调用change 接收新粒子的属性
          arr[idx].change(totalX, totalY, color);
        } else {
          // 新粒子数组较大 生成缺少的粒子
          arr[idx] = new Particle(totalX, totalY, animateTime, color);
        }
      }

      // 新粒子数组较小 删除多余的粒子
      if (newLen < oldLen) this.ParticleArr = arr.splice(0, newLen);
      arr = this.ParticleArr;
      let tmp_len = arr.length;
      // 随机打乱粒子最终对应的位置 使切换效果更自然
      while (tmp_len) {
        // 随机的一个粒子 与 倒序的一个粒子
        let randomIdx = ~~(Math.random() * tmp_len--);
        let randomPrt = arr[randomIdx];
        let { totalX: tx, totalY: ty, color } = randomPrt;

        // 交换目标位置与颜色
        randomPrt.totalX = arr[tmp_len].totalX;
        randomPrt.totalY = arr[tmp_len].totalY;
        randomPrt.color = arr[tmp_len].color;
        arr[tmp_len].totalX = tx;
        arr[tmp_len].totalY = ty;
        arr[tmp_len].color = color;
      }
    } else {
        for(var i=0;i<img.particleData.length;i++){
            const item = img.particleData[i]
            this.ParticleArr.push(new Particle(item.totalX, item.totalY, animateTime, item.color))
        }
    }
  }
  drawCanvas() {
    if(!this.ParticleArr.length && logoImgs.value.length){
      var active
      active=logoImgs.value[24]
      this.changeImg(active);
    }
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ParticleArr.forEach((particle) => {
      particle.update(this.mouseX, this.mouseY);
      particle.draw();
    });
    window.requestAnimationFrame(() => this.drawCanvas());
  }
}
//console.log(camp_list)

function clickLogo(prt_canvas,item_name) {
  var active
  for(var i=0;i<logoImgs.value.length;i++){
    if(logoImgs.value[i].name==item_name){
      active=logoImgs.value[i]
      activeintro.value=camp_list.value[i].intro
    }
  }
  prt_canvas.changeImg(active);
}

onMounted(() => {
    if (canvas.value) {
    context.value = canvas.value.getContext("2d");

    particleCanvas.value = new ParticleCanvas(canvas.value);
    particleCanvas.value.drawCanvas();
  }
})


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