<template>
  <div id="view">
    <div id="main-doc">
      <div id="fist" :style="{background:'url('+getImg('ico/' + character.camp + '.webp')+')'}" >
          <img :src="getImg('chara/' + character.staff + '.webp')" class="img-itme">
          <div>
            <div class="skill">
              <div v-for="(itme,i) in character.skill_f" :key="i">
                  <el-popover placement="top-start" trigger="hover" effect="dark" width="350">
                    <template #reference>
                    <div slot="reference" class="skill-re">
                      <img :src="getImg('skill/' + itme.name + '.webp')" class="skill-img">
                      <div>{{itme.name}}</div>
                    </div>
                    </template>
                    <div class="skill-de">
                      <div class="skill-name">{{itme.name}}</div>
                        <div class="skill-text">
                            <img :src="getImg('skill/' + itme.name + '.webp')" class="skill-text-img">
                            <div>
                                <div class="skill-pow">
                                    <div v-if="itme.reply_way!='被动'" class="skill-con">{{itme.reply_way+"回复 "}}</div>
                                    <div v-if="itme.release_way!=''" class="skill-con">{{itme.release_way+"触发"}}</div>
                                    <div v-if="itme.reply_way=='被动'" class="skill-con">{{itme.reply_way}}</div>
                                </div>
                                <div class="skill-pow">
                                    <img :src="getImg('use.png')" class="use">
                                    <div class="use-num">
                                      <div>{{itme.start_tec}}</div>
                                      <div>{{itme.use_tec}}</div>
                                    </div>
                                    <div v-if="itme.time!=0" class="skill-time">
                                      <img :src="getImg('time.png')" class="time">
                                      {{itme.time+"s"}}
                                    </div>
                                </div>
                                <div class="skill-text">
                                    {{itme.de}}
                                </div>
                                <div class="text-y">{{itme.else}}</div>
                            </div>
                        </div>
                    </div>
                  </el-popover>
              </div>
            </div>
            <div class="basic">
              <div class="stars">
                <div v-for="index of character.stars" :key="index">
                  <img :src="getImg('star.png')" class="star">
                </div>
              </div>
              <div class="id">{{character.english}}</div>
              <div class="name">{{character.staff}}</div>
            </div>
            <div class="skill">
              <img :src="getImg('ico/' + character.profession_de.cio[0] + '.webp')" class="ico-img0">
              <div>
                <div class="ico0">
                  <el-popover placement="top-start" trigger="hover" effect="dark" width="200">
                    <template #reference>
                      <div slot="reference" class="ico1">
                    <img :src="getImg('ico/' + character.profession_de.cio + '.webp')" class="ico-img">
                    <div>{{character.profession_2}}</div>
                  </div>
                    </template>
                  <div class="talen-text">
                    <div class="skill-name">{{character.profession_de.de}}</div>
                  </div>
                </el-popover>
                  <div class="ico1">
                    <div v-for="(itme,i) in character.tag.tag_list.split(',')" :key="i">
                      <div v-if="itme=='远程位'||itme=='近战位'">{{"&nbsp;"+itme+"&nbsp;"}}</div>
                    </div>
                  </div>
                </div>
                <div class="tag">
                  <div v-for="(itme,i) in character.tag.tag_list.split(',')" :key="i">
                    <div v-if="itme!='高级资深干员'&&itme!='资深干员'&&itme!='远程位'&&itme!='近战位'
                    &&itme!='狙击干员'&&itme!='先锋干员'&&itme!='近卫干员'&&itme!='重装干员'
                    &&itme!='术师干员'&&itme!='特种干员'&&itme!='辅助干员'&&itme!='医疗干员'">{{"&nbsp;"+itme+"&nbsp;"}}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="skill">
              <div v-for="(itme,i) in character.modesec" :key="i">
                <el-popover placement="left-start" trigger="hover" effect="dark" width="400">
                  <template #reference>
                    <div slot="reference" class="mo-url" :style="{background:'url('+getImg('mode/模组类型_' + itme.code + '.png')+')'}">
                    <div class="mo-urlname">{{itme.code}}</div>
                  </div>
                  </template>
                  <el-scrollbar class="mode">
                    <div class="mo-de"> 
                      <img :src="getImg('mode/模组_' + itme.name + '.png')" class="mo-img">
                      <div class="name">{{itme.name}}</div>
                    </div>
                    <div v-if="itme.code == 'ORIGINAL'">
                      <div class="mo-de">
                      <div class="mo-detext">
                        {{getmode(i) }}
                      </div>
                    </div>
                    </div>
                    <div v-else>
                      <div class="mo-de">
                        <img :src="getImg('ico/模组等级_1.png')" class="mo-level">
                        <div class="mo-detext">
                          {{itme.add1}}<br>
                          {{ "特性追加：" + getmode(i) }}
                        </div>
                      </div>
                      <div class="mo-de">
                        <img :src="getImg('ico/模组等级_2.png')" class="mo-level">
                        <div class="mo-detext">
                          {{itme.add2}}<br>
                          <div v-if="itme.new==0">
                            {{ "天赋【" + itme.talant + "】更新：" + itme.talent2 }}
                          </div>
                          <div v-else>
                            {{ "新增天赋【" + itme.talant + "】：" + itme.talent2 }}
                          </div>
                        </div>
                      </div>
                      <div class="mo-de">
                        <img :src="getImg('ico/模组等级_3.png')" class="mo-level">
                        <div class="mo-detext">
                          {{itme.add3}}<br>
                          <div v-if="itme.new==0">
                            {{ "天赋【" + itme.talant + "】更新：" + itme.talent3 }}
                          </div>
                          <div v-else>
                            {{ "新增天赋【" + itme.talant + "】：" + itme.talent3 }}
                          </div>
                        </div>
                      </div>
                    </div>
                    <br/>
                    <div> 
                      <div v-for="(itme, i) in itme.story.split('\n')" :key="i">
                        {{ itme }}<br />
                      </div>
                    </div>
                  </el-scrollbar>
                </el-popover>
              </div>
              <div class="bskill">
                <div v-for="(itme,i) in character.skill_b" :key="i">
                  <el-popover placement="top-start" trigger="hover" effect="dark" width="300">
                    <template #reference>
                      <img :src="getImg('bskill/Bskill_'+pos_dict[itme.pos]+'_' + itme.icon + '.png')" class="bskill-img">
                    </template>
                    <div class="talen-text">
                      {{itme.name+"&nbsp;["+itme.need+"]"}}<br>
                      {{itme.de}}
                    </div>
                  </el-popover>
                </div>
              </div>
            </div>
            <div class="skill">
              <div v-for="(itme,i) in character.skill_t" :key="i">
                <el-popover placement="top-start" trigger="hover" effect="dark" width="400">
                  <template #reference>
                    <div slot="reference" class="talen">{{itme.name}}</div>
                  </template>
                  <div class="talen-text">
                    {{itme.name}}<br>
                    <div v-if="itme.de_zero!=''">{{'精零：'+itme.de_zero}}<br></div>
                    <div v-if="itme.de_one!=''">{{'精一：'+itme.de_one}}<br></div>
                    <div v-if="itme.de_two!=''">{{'精二：'+itme.de_two}}<br></div>
                    <div v-if="itme.notes!=''">{{itme.notes}}</div>
                  </div>
                </el-popover>
              </div>
            </div>
          </div>
      </div>
      <section class="main-section" id="基础信息">
        <p class="main-section-header"><b>基础信息</b></p>
        <p class="text">
          <div v-if="character.stars>1">
            {{ "【代号】"+character.staff}}<br>
            {{ "【性别】" + character.sex }}<br />
            {{ "【战斗经验】" + character.exp }}<br />
            {{ "【出身地】" + character.orgin }}<br />
            {{ "【生日】" + character.birth }}<br />
            {{ "【种族】" + character.race }}<br />
            {{ "【身高】" + character.height }}<br />
          </div>
          <div v-if="character.spelical" v-for="(itme, i) in character.spelical.split('\n')" :key="i">
            {{ itme }}<br />
          </div>
        </p>
        
        <div v-if="character.sto==1">
          <li class="text">矿石病感染情况：<br />
          <div>体表有原石结晶分布，参照医学检测报告，确认为感染者。</div>
          <div v-if="character.note" v-for="(itme,i) in character.note.split('\n')" :key="i">
              {{itme}}<br>
          </div>
        </li><br />
        <li class="text">
          临床诊断分析：<br />
          <div>造影检测结果显示，该干员体内脏器轮廓模糊，可见异常阴影，循环系统内源石颗粒检测异常，有矿石病感染迹象，现阶段可确认为是矿石病感染者。</div>
          <br />
          <div  class="text">体细胞与源石融合率：
              {{character.sto_act+'%'}}<br>
              {{character.sto_act_de}}<br>
            </div><br>
            <div  class="text">血液源石结晶密度：
              {{character.sto_mi+'u/L'}}<br>
              <div v-for="(itme,i) in character.sto_mi_de.split('\n')" :key="i">
                  {{itme}}<br>
              </div>
            </div><br>
        </li>
        </div>
        <div v-else-if="character.sto==0">
          <li class="text">矿石病感染情况：<br />
          <div>参照医学检测报告，确认为非感染者。</div>
        </li><br />
        <li class="text">
          临床诊断分析：<br />
          <div>造影检测结果显示，该干员体内脏器轮廓清晰，未见异常阴影，循环系统内源石颗粒检测未见异常，无矿石病感染迹象，现阶段可确认为非矿石病感染者。</div>
          <br />
          <div  class="text">体细胞与源石融合率：
              {{character.sto_act}}<br>
              {{character.sto_act_de}}<br>
            </div><br>
            <div  class="text">血液源石结晶密度：
              {{character.sto_mi}}<br>
              <div v-for="(itme,i) in character.sto_mi_de.split('\n')" :key="i">
                  {{itme}}<br>
              </div>
            </div><br>
        </li>
        </div>
        <div v-else>
          <div v-for="(itme,i) in character.sto_mi_de" :key="i">
                  {{itme}}<br>
            </div>
        </div>
      </section>
      <section class="main-section" id="作战信息">
        <p class="main-section-header"><b>作战信息</b></p>
        <p class="text">
          {{ "职业：" + character.profession }}<br />
          {{ "二级职业：" + character.profession_2 }}<br />
          {{ "星级：" + character.stars + "星" }}<br />
          {{ "阵营：" + character.camp }}<br />
          {{ "特性：" + character.profession_de.de }}<br />
          {{ "标签：" + character.tag.tag_list }}<br />
        </p>
        <p class="text">综合体检测试：</p>
        <code class="code">
          <div v-if="character.stars>1">
            {{ "物理强度：" + test_list[character.test.phy] }}<br />
            {{ "战场机动：" + test_list[character.test.speed] }}<br />
            {{ "生理耐受：" + test_list[character.test.blood] }}<br />
            {{ "战术规划：" + test_list[character.test.pla] }}<br />
            {{ "战斗技巧：" + test_list[character.test.ski] }}<br />
            {{ "源石技艺适应性：" + test_list[character.test.stone]}}<br /> 
          </div>
          <div v-if="character.test.note" v-for="(itme, i) in character.test.note.split('\n')" :key="i">
            {{ itme }}<br />
          </div>
        </code><br>
      </section>
      <section class="main-section" id="技能信息">
        <p class="main-section-header"><b>技能信息</b></p>
        <p class="text"><b>天赋：</b><br></p>
        <div v-for="(itme, i) in character.skill_t" :key="i">
          <p class="text">
            {{ itme.name }}<br />
            <code v-if="itme.de_zero!=''">
                {{itme.de_zero }}<br />
            </code>
            <code v-if="itme.de_one!=''">
                {{'精一获得：'+ itme.de_one }}<br />
            </code>
            <code v-if="itme.de_two!=''">
                {{'精二获得：'+ itme.de_two }}<br />
            </code>
            <code v-if="itme.notes!=''">
                {{ itme.notes }}<br />
            </code>
          </p>
        </div>
        <p class="text"><b>技能：</b></p>
        <div v-for="(itme, i) in character.skill_f" :key="i">
          <p class="text">
            {{ itme.name }}<br />
            <code>
              <div v-if="itme.reply_way == '被动'">
                {{ itme.reply_way }}<br />
              </div>
              <div v-else>
                {{ itme.reply_way + "回复 " + itme.release_way + "触发" }}<br />
              </div>
              <div v-if="itme.use_tec != 0">
                {{ "消耗技力" + itme.use_tec }}<br />
              </div>
              <div v-if="itme.time != 0">
                {{ "初始技力" + itme.start_tec + " 持续时间" + itme.time + "s"
                }}<br />
              </div>
              {{ itme.de }}
            </code>
          </p>
        </div>
        <p class="text"><b>基建技能：</b></p>
        <div v-for="(itme, i) in character.skill_b" :key="i">
          <p class="text">
            {{ itme.name }}<br />
            <code>
              {{ itme.de }}
            </code>
          </p>
        </div>
      </section>
      <section class="main-section" id="背景信息">
        <p class="main-section-header"><b>背景信息</b></p>
        <p class="text"><b>客观履历：</b></p>
        <p class="text">
          {{ character.obj }}
        </p><br />
        <div v-if="character.dang1">
          <p class="text"><b>档案资料一</b></p>
          <code class="text">
            <div v-for="(itme, i) in character.dang1.split('\n')" :key="i">
              {{ itme }}<br />
            </div>
          </code><br />
        </div>
        <div v-if="character.dang2">
          <p class="text"><b>档案资料二</b></p>
          <code class="text">
            <div v-for="(itme, i) in character.dang2.split('\n')" :key="i">
              {{ itme }}<br />
            </div>
          </code><br />
        </div>
        <div v-if="character.dang3">
          <p class="text"><b>档案资料三</b></p>
          <code class="text">
            <div v-for="(itme, i) in character.dang3.split('\n')" :key="i">
              {{ itme }}<br />
            </div>
          </code><br />
        </div>
        <div v-if="character.dang4">
          <p class="text"><b>档案资料四</b></p>
          <code class="text">
            <div v-for="(itme, i) in character.dang4.split('\n')" :key="i">
              {{ itme }}<br />
            </div>
          </code><br />
        </div>
        <br />
        <div v-if="character.up">
          <p class="text"><b>晋级记录</b></p>
          <code class="text">
            <div v-for="(itme, i) in character.up.split('\n')" :key="i">
              {{ itme }}<br />
            </div> 
          </code><br />
        </div>
        
      </section>
      <section class="main-section" id="模组信息">
        <p class="main-section-header"><b>模组信息</b></p>
        <div v-for="(itme, i) in character.modesec">
          <p class="text">
            <b>{{ itme.code }}</b
            ><br />
          </p>
          <p class="text">
            <b>模组名称：</b><br />
            {{ itme.name }}
          </p>
          <div v-if="itme.code == 'ORIGINAL'">
            <p class="text"><b>模组效果</b></p>
            <div class="text">
            {{ getmode(i) }}
            </div>
            <br />
            <code class="text">
              <div v-for="(itme, i) in itme.story.split('\n')" :key="i">
                {{ itme }}<br />
              </div>
            </code>
          </div>
          <div v-else>
            <p class="text"><b>模组效果</b></p>
            <li class="text">
              <b>一级</b><br />
              {{ itme.add1 }}<br />
              {{ "特性追加：" + getmode(i) }}
            </li>
            <li class="text">
              <b>二级</b><br />
              {{ itme.add2 }}<br />
              <div v-if="itme.new==0">
                {{ "天赋【" + itme.talant + "】更新：" + itme.talent2 }}
              </div>
              <div v-else>
                {{ "新增天赋【" + itme.talant + "】：" + itme.talent2 }}
              </div>
            </li>
            <li class="text">
              <b>三级</b><br />
              {{ itme.add3 }}<br />
              <div v-if="itme.new==0">
                {{ "天赋【" + itme.talant + "】更新：" + itme.talent3 }}
              </div>
              <div v-else>
                {{ "新增天赋【" + itme.talant + "】：" + itme.talent3 }}
              </div>
            </li>
            <br />
            <code class="text">
              <div v-for="(itme, i) in itme.story.split('\n')" :key="i">
                {{ itme }}<br />
              </div>
            </code>
          </div>
        </div>
      </section>
    </div>
    <nav id="navbar">
      <p id="navbar-header">{{character.staff+"详细信息说明"}}</p>
      <a class="nav-link" href="#fist">立绘</a>
      <a class="nav-link" href="#基础信息">基础信息</a>
      <a class="nav-link" href="#作战信息">作战信息</a>
      <a class="nav-link" href="#技能信息">技能信息</a>
      <a class="nav-link" href="#背景信息">背景信息</a>
      <a class="nav-link" href="#模组信息">模组信息</a>
    </nav>
  </div>
</template>
<script setup>
import { ref, getCurrentInstance, watch } from "vue";
import { useRouter } from "vue-router";
import { watchEffect } from "vue";
let router = useRouter();
let navActive = ref();
var id = ref();
const test_list = ["■■", "缺陷", "普通", "标准", "优良", "卓越"];
var pos_dict = {'控制中枢':'ctrl', '发电站':'pow', '制造站':'man', '贸易站':'tra', '宿舍':'dorm', '加工站':'ws', '办公室':'hire', '训练室':'train', '会客室' :'meet'};
watchEffect(() => {
  navActive.value = router.currentRoute.value;
  id.value = navActive.value.params.id;
});
const { proxy } = getCurrentInstance();
var character = ref({
  staff: "",
  birth: "",
  camp: "",
  dang1: "",
  dang2: "",
  dang3: "",
  dang4: "",
  english: "Skadi",
  exp: "十三年",
  height: 0,
  modesec: [],
  name: "",
  note: "",
  obj: "",
  orgin: "",
  profession: "",
  profession_2: "",
  profession_de: { profession_1: "", profession_2: "", cio: "", de: "" },
  race: "",
  sex: "",
  skill_b: [],
  skill_f: [],
  skill_t: [],
  spelical: "",
  stars: 0,
  sto: 0,
  sto_act: 0,
  sto_act_de: "",
  sto_mi: "",
  sto_mi_de: "",
  sto_note: "",
  tag: { staff: "", open: 0, tag_list: "" },
  test: { blood: 0, phy: 0, pla: 0, ski: 0, speed: 0, stone: 0, staff: "",note:"" },
  up: "",
});
var mode = ref(["","","",""])
proxy.$request
  .post(proxy.$urls.m().get_character_one, { staff: id.value })
  .then((result) => {
    character.value = result.data;
    if(!character.value.tag){
      character.value.tag={ staff: "", open: 0, tag_list: "" }
    }
    if(!character.value.test){
      character.value.test = { phy: 0, speed: 0, blood: 0, pla: 0, ski: 0, stone: 0 }
    }
    console.log(result.data)
  });
const getmode = (index) => {
    proxy.$request.post(proxy.$urls.m().get_modeinit_code, {code:character.value.modesec[index].code}).then(result => {
        mode.value[index] = result.data.de
    })
    return mode.value[index]
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
#navbar{
  grid-area: header;
  top:60px;
  left:0;
  bottom:0;
  width:200px;
  z-index:99;
  position:fixed;
  background:rgba(0,0,0,0.08);
  display:flex;
  flex-direction:column;
  border: 1px solid #ccc;
  box-shadow: 0 0 20px rgba(0,0,0,0.19), 0 0 6px rgba(0,0,0,0.23);
  align-items:center;
}
#navbar-header{
  padding:20px 0px 20px 0px;
  width:100%;
  text-align:center;
  font-size:20px;
  border-bottom:3px solid #ccc;
  box-shadow: 0 0 20px rgba(0,0,0,0.19), 0 0 6px rgba(0,0,0,0.23);
}
.img-itme{
  
  width: 60%;
  height: 100%;
  min-width: 200px;
}
.use{
  width: 25px;
  height:100%;
}
.use-num{
  font-size: 9px;
}
.time{
  margin-left: 20px;
  width: 18px;
  margin-top:5px;
}
.nav-link{
  padding:20px 0px 20px 0px;
  width:100%;
  text-align:center;
  font-size:15px;
  border-top:3px solid #ccc;
  box-shadow: 0 0 10px rgba(0,0,0,0.19), 0 0 3px rgba(0,0,0,0.23);
  text-decoration: none;
  color:rgba(0,0,0,0.7);
}
#main-doc{
  overflow:overlay;
  padding-left:215px;
  background-color: rgba(255, 255, 255, 0.949);
  text-align: start;
}
#fist{
  width: 95%;
  border-radius: 25px;
  margin:20px;
  background-color: rgba(75, 72, 72, 0.784)!important;
  background-repeat: no-repeat!important;
  background-size: 25%!important;
  display: flex;
  align-items: center;
  justify-content: center;
  color:#fff
}
.skill{
  margin: 10px;
  display: flex;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.366);
  border-radius: 10px;
  font-size: 90%;
  width:90%;
  text-align: center;
}
.skill-re{
  width: 100px;
  margin: 0 10px;
}
.skill-img{
  height:  70px;
}
.skill-img-none{
  height:  64px;
  width: 64px;
  border: 3px solid rgba(165, 165, 165, 0.248);
}
.skill-none{
  height:  50px;
  width: 2px;
  transform: rotate(45deg);
  margin: 7px 0px 0px 30px;
  background-color: rgba(165, 165, 165, 0.751);
}
.el-popover{
  background-color: #1c1c1ccb;
  border:1px solid rgba(0, 0, 0, 0.851);
  color: #fff;
}
.skill-text{
  display: flex;
  padding: 0 10px;
  white-space: pre-wrap;
}
.skill-text-img{
  width: 100px;
  height: 100%;
}
.basic{
  padding-left: 20px;
}
.stars{
  display: flex;
}
.star{
  width: 25px;
  margin-right: -8px;
  transform: rotate(20deg);
}
.id{
  text-shadow: 3px 2px 3px #000;
}
.name{
  font-size: 40px;
  font-weight: 600;
  text-shadow: 3px 2px 3px #000;
}
.ico-img0{
  width: 50px;
  background-color: rgba(255, 255, 255, 0.166);
  border:1px solid rgba(255, 255, 255, 0.547);
}
.ico0{
  display: flex;
  align-items: center;
  justify-self: center;
}
.ico1{
  display: flex;
  margin: 0 0 0 10px;
  background-color: rgba(255, 255, 255, 0.166);
  border:1px solid rgba(255, 255, 255, 0.547);
  padding: 0 10px;
  height: 25px;
  align-self:center;
  justify-content: center;
}
.ico-img{
  width: 20px;
  padding: 2px;
}
.tag{
  display: flex;
  background-color: rgba(255, 255, 255, 0.166);
  border:1px solid rgba(255, 255, 255, 0.547);
  padding: 0 20px 0 10px;
  margin-left: 10px;
  margin-top: 5px;
  align-self:center;
  justify-content: center;
}
.ico-skill{
  margin: 10px;
  background-color: rgba(0, 0, 0, 0.366);
  border-radius: 10px;
}
.skill-name{
  padding-left: 10px;
  padding-top: 10px;
}
.skill-pow{
  display: flex;
  margin-left: 10px;
  margin-bottom: 10px;
  font-size: 80%;
}
.skill-con{
  background-color: rgba(0, 0, 0, 0.279);
  padding:2px;
  margin-right: 10px;
  border:1px solid rgba(0, 0, 0, 0.229);
}
.ico{
  padding-top: 5px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  font-size: 15px;
}
.mo-url{
  width: 40px;
  height: 40px;
  box-shadow: 0px 0px 15px rgba(255, 255, 255, 0.547) inset;
  padding: 10px;
  margin: 0 10px 10px 10px;
  background-repeat: no-repeat!important;
  background-size: auto auto!important;
  background-position: center!important;
}
.mo-urlname{
  text-shadow: 3px 2px 3px #000;
  margin-top: 45px;
  margin-left: -10px;
}
.mo-de{
  display: flex;
  align-items: center;
  justify-content: center;
}
.mo-img{
  width: 40%;
}
.mo-level{
  margin: 5px;
  background-color: rgba(255, 255, 255, 0.607);
  padding: 5px;
  width: 50px;
}
.mo-detext{
  width: 500px;
  padding: 10px;
  white-space: pre-wrap;
}
.bskill{
  display: flex;
  margin-left: 30px;
  background-color: rgba(255, 255, 255, 0.166);
  border-radius: 5px;
}
.bskill-img{
  width: 30px;
  margin: 10px;
}
.talen{
  display: flex;
  margin: 0 10px;
  padding: 2px 10px;
  background-color: rgba(255, 255, 255, 0.34);
  border:1px solid rgba(255, 255, 255, 0.547);
  border-radius: 8px;
  align-self:center;
  justify-content: center;
}
.talen-text{
  font-size:90%;
  padding: 0px 20px;
  padding-bottom: 10px;
  max-width: 600px;
  white-space: pre-wrap;
}
.text-y{
  color: rgb(249, 164, 45);
  padding: 0 10px;
}
.main-section{
  margin:40px;
}
.main-section-header{
  width:100%;
  font-size:20px;
}
@media (max-width: 700px) { 
  .main-section{
    margin:20px;
  }
}
.text{
  font-size:15px;
  line-height:25px;
  white-space: pre-wrap;
}
.mode{
  height: 70vh;
}
</style>
