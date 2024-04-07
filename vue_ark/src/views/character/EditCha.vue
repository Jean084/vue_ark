<template>
    <h1 id="title">信息录入</h1>
    <p id="description">罗德岛新干员信息录入表<em>（医疗部门录入，PRST保存）</em></p>
    <div id="selfform">
      <el-row type="flex" class="row">
        <el-col id="left" :lg="12">
          <div class="border">
            <el-form :model="form0" label-width="80px" class="pad">
              <div class="flex1">
                <el-form-item label="代号">
                  <el-input v-model="form0.staff"></el-input>
                </el-form-item>
                <el-form-item label="英文代号">
                  <el-input v-model="form0.english"></el-input>
                </el-form-item>
              </div>
              <div class="flex1">
                <el-form-item label="职业大类">
                  <el-select v-model="form0.profession" placeholder="选择职业" @change="selectpro1">
                    <div v-for="(itme, i) in professions" :key="i">
                      <el-option :label="itme.profession" :value="itme.profession"></el-option>
                    </div>
                  </el-select>
                </el-form-item>
                <el-form-item label="二级职业">
                  <el-select v-model="form0.profession_2" @change="selectIcoDe">
                    <div v-for="(itme, i) in professions_2" :key="i">
                      <el-option :label="itme.profession_2" :value="i"></el-option>
                    </div>
                  </el-select>
                </el-form-item>
              </div>
              <div class="flex1">
                <el-form-item label="稀有度">
                  <el-select v-model="form0.stars" @change="selectStars">
                    <div v-for="index of 6" :key="index">
                      <el-option :label="index" :value="index"></el-option>
                    </div>
                  </el-select>
                </el-form-item>
                <el-form-item label="阵营">
                  <el-select v-model="form0.camp">
                    <div v-for="(itme, i) in camp_list" :key="i">
                      <el-option :label="itme.name" :value="itme.name"></el-option>
                    </div>
                  </el-select>
                </el-form-item>
              </div>
              <div class="flex1">
                <el-form-item label="特性">
                  <div class="text">
                    <p>{{ form0.feat }}</p>
                  </div>
                </el-form-item>
              </div>
              <div class="flex1">
                <el-form-item label="标签">
                  <el-radio-group v-model="form0.pos" class="pos-tag">
                    <el-radio label="近战位">近战位</el-radio>
                    <el-radio label="远程位">远程位</el-radio>
                    <el-switch v-model="form0.open" class="ml-2" inline-prompt active-text="可招募" inactive-text="不可招募" />
                  </el-radio-group>
                  <el-checkbox-group v-model="form0.tag_list">
                    <el-checkbox v-for="(item, i) in tag_list" :key="i" :label="item" name="type"></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </div>
            </el-form>
            <el-form :model="form0" label-width="140px" class="pad">
              <div class="border1 slice_width">
                <div class="title0">
                  <el-button size="small" circle @click="addtianfu">
                    <i-ep-Plus />
                  </el-button>
                  <el-button size="small" circle @click="minustianfu">
                    <i-ep-Minus />
                  </el-button>
                  天赋
                </div>
                <div v-for="(item, i) in form0.skill_t" :key="i">
                  <el-form-item label="天赋名称">
                    <el-input v-model="item.name"></el-input>
                  </el-form-item>
                  <el-form-item label="天赋描述（初始）">
                    <el-input v-model="item.de_zero"></el-input>
                  </el-form-item>
                  <el-form-item label="天赋描述（精一）">
                    <el-input v-model="item.de_one"></el-input>
                  </el-form-item>
                  <el-form-item label="天赋描述（精二）">
                    <el-input v-model="item.de_two"></el-input>
                  </el-form-item>
                  <el-form-item label="备注">
                    <el-input v-model="item.notes"></el-input>
                  </el-form-item>
                  <hr />
                </div>
              </div>
            </el-form>
            <el-form :model="form0" label-width="90px" class="pad">
              <div class="border1 slice_width" v-if="form0.stars > 2">
                <div class="title0">作战技能</div>
                <div v-for="(item, i) in form0.skill_f" :key="i">
                  <el-form-item label="技能名称">
                    <el-input v-model="item.name"></el-input>
                  </el-form-item>
                  <div class="flex1">
                    <el-form-item label="回复类型">
                      <el-select v-model="item.reply_way">
                        <el-option label="自动" value="自动"></el-option>
                        <el-option label="攻击" value="攻击"></el-option>
                        <el-option label="被动" value="被动"></el-option>
                        <el-option label="受击" value="受击"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="释放类型">
                      <el-select v-model="item.release_way">
                        <el-option label="自动" value="自动"></el-option>
                        <el-option label="手动" value="手动"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="flex1">
                    <el-form-item label="初始技力">
                      <el-input v-model="item.start_tec"></el-input>
                    </el-form-item>
                    <el-form-item label="消耗技力">
                      <el-input v-model="item.use_tec"></el-input>
                    </el-form-item>
                    <el-form-item label="持续时间">
                      <el-input v-model="item.time"></el-input>
                    </el-form-item>
                  </div>
                  <el-form-item label="技能描述">
                    <el-input v-model="item.de"></el-input>
                  </el-form-item>
                  <el-form-item label="备注">
                    <el-input v-model="item.note"></el-input>
                  </el-form-item>
                  <hr />
                </div>
              </div>
            </el-form>
          </div>
        </el-col>
        <el-col id="right" :lg="12">
  
          <div class="border pad-bot">
            <el-form :model="form0" label-width="90px" class="pad">
              <div class="border1 slice_width">
                <div class="title0">
                  <el-button size="small" circle @click="addskill">
                    <i-ep-Plus />
                  </el-button>
                  <el-button size="small" circle @click="minusskill">
                    <i-ep-Minus />
                  </el-button>基建技能
                </div>
                <div v-for="(item, i) in form0.skill_b" :key="i">
                  <el-form-item label="技能名称">
                    <el-input v-model="item.name"></el-input>
                  </el-form-item>
                  <div class="flex1">
                    <el-form-item label="生效房间">
                      <el-select v-model="item.pos">
                        <div v-for="(itme, i) in pos_list" :key="i">
                          <el-option :label="itme" :value="itme"></el-option>
                        </div>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="技能图标">
                      <el-input v-model="item.icon"></el-input>
                    </el-form-item>
                  </div>
                  <el-form-item label="技能描述">
                    <el-input v-model="item.de"></el-input>
                  </el-form-item>
                  <el-form-item label="备注">
                    <el-input v-model="item.need"></el-input>
                  </el-form-item>
                  <hr />
                </div>
              </div>
            </el-form>
            <el-form ref="form" :model="form0" label-width="80px" class="pad">
              <div class="flex1">
                <el-form-item label="性别">
                  <el-switch v-model="form0.se" class="ml-2" inline-prompt
                    style="--el-switch-on-color: #f89898; --el-switch-off-color: #79bbff" active-text="女"
                    inactive-text="男" />
                </el-form-item>
              </div>
              <div class="flex1">
                <el-form-item label="真实姓名">
                  <el-input v-model="form0.name"></el-input>
                </el-form-item>
                <el-form-item label="作战经验">
                  <el-input v-model="form0.exp"></el-input>
                </el-form-item>
              </div>
              <div class="flex1">
                <el-form-item label="出生地">
                  <el-select v-model="form0.orgin">
                    <div v-for="(itme, i) in orgins" :key="i">
                      <el-option :label="itme.place" :value="itme.place"></el-option>
                    </div>
                  </el-select>
                </el-form-item>
                <el-form-item label="出生日期">
                  <el-input v-model="form0.birth"></el-input>
                </el-form-item>
              </div>
              <div class="flex1">
                <el-form-item label="种族">
                  <el-select v-model="form0.race">
                    <div v-for="(itme, i) in races" :key="i">
                      <el-option :label="itme.race" :value="itme.race"></el-option>
                    </div>
                  </el-select>
                </el-form-item>
                <el-form-item type="number" label="身高">
                  <el-input v-model="form0.height"></el-input>
                </el-form-item>
              </div>
              <div class="flex1">
                <el-form-item type="textarea" label="特殊">
                  <el-input type="textarea" v-model="form0.spelical"></el-input>
                </el-form-item>
              </div>
            </el-form>
            <el-form ref="form" :model="form0" label-width="140px" class="pad">
              <el-form-item label="是否矿石病感染者">
                <el-radio-group v-model="form0.sto" class="pos-tag" @change="selectsto">
                  <el-radio label="0">否</el-radio>
                  <el-radio label="1">是</el-radio>
                  <el-radio label="2">未公开</el-radio>
                  <el-radio label="3">特殊</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="矿石病感染情况" v-if="form0.sto<2">
                <div class="text">
                  <p>{{ form0.stu }}</p>
                </div>
              </el-form-item>
              <el-form-item label="备注">
                  <el-input type="textarea" v-model="form0.note"></el-input>
              </el-form-item>
              <div class="border1 slice_width">
                <div class="title0">综合体检测试</div>
                <el-form-item label="物理强度" class="test">
                  <div class="demo-rate-block">
                    <el-rate v-model="form0.test.phy" />
                  </div>
                  <div class="text">
                    <p>{{ acc_list[form0.test.phy] }}</p>
                  </div>
                </el-form-item>
                <el-form-item label="战场机动" class="test">
                  <div class="demo-rate-block">
                    <el-rate v-model="form0.test.speed" />
                  </div>
                  <div class="text">
                    <p>{{ acc_list[form0.test.speed] }}</p>
                  </div>
                </el-form-item>
                <el-form-item label="生理耐受" class="test">
                  <div class="demo-rate-block">
                    <el-rate v-model="form0.test.blood" />
                  </div>
                  <div class="text">
                    <p>{{ acc_list[form0.test.blood] }}</p>
                  </div>
                </el-form-item>
                <el-form-item label="战术规划" class="test">
                  <div class="demo-rate-block">
                    <el-rate v-model="form0.test.pla" />
                  </div>
                  <div class="text">
                    <p>{{ acc_list[form0.test.pla] }}</p>
                  </div>
                </el-form-item>
                <el-form-item label="战斗技巧" class="test">
                  <div class="demo-rate-block">
                    <el-rate v-model="form0.test.ski" />
                  </div>
                  <div class="text">
                    <p>{{ acc_list[form0.test.ski] }}</p>
                  </div>
                </el-form-item>
                <el-form-item label="源石技艺适应性" class="test">
                  <div class="demo-rate-block">
                    <el-rate v-model="form0.test.stone" />
                  </div>
                  <div class="text">
                    <p>{{ acc_list[form0.test.stone] }}</p>
                  </div>
                </el-form-item>
                <el-form-item label="备注">
                  <el-input type="textarea" v-model="form0.test.note"></el-input>
              </el-form-item>
              </div>
            </el-form>
            <el-form ref="form" :model="form0" label-width="170px" class="pad">
              <el-form-item label="客观履历" class="pad-bot">
                <el-input type="textarea" v-model="form0.obj"></el-input>
              </el-form-item>
              <el-form-item label="临床诊断分析"  v-if="form0.sto<2">
                <div class="text">
                  <p>{{ form0.dis }}</p>
                </div>
              </el-form-item>
              <el-form-item label="体细胞与源石融合率" v-if="form0.sto<2">
                <el-input type="number" v-model="form0.sto_act" class="wid_input1"></el-input>%
              </el-form-item>
              <el-form-item label="体细胞与源石融合描述" v-if="form0.sto<2">
                <el-input v-model="form0.sto_act_de"></el-input>
              </el-form-item>
              <el-form-item label="血液源石结晶密度" v-if="form0.sto<2">
                <el-input v-model="form0.sto_mi" class="wid_input1"></el-input>u/L
              </el-form-item>
              <el-form-item label="血液源石结晶密度影响" v-if="form0.sto<2">
                <el-input v-model="form0.sto_mi_de"></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input type="textarea" v-model="form0.sto_note"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
      <div class="border pad-bot" id="bottom">
        <el-row>
          <el-col id="bottom-left">
            <el-form ref="form" :model="form0" label-width="100px" class="pad">
              <el-form-item label="档案资料一" class="pad-bot">
                <el-input type="textarea" v-model="form0.dang1"></el-input>
              </el-form-item>
              <el-form-item label="档案资料二" class="pad-bot">
                <el-input type="textarea" v-model="form0.dang2"></el-input>
              </el-form-item>
              <el-form-item label="档案资料三" class="pad-bot">
                <el-input type="textarea" v-model="form0.dang3"></el-input>
              </el-form-item>
              <el-form-item label="档案资料四" class="pad-bot">
                <el-input type="textarea" v-model="form0.dang4"></el-input>
              </el-form-item>
              <el-form-item label="晋升记录" class="pad-bot">
                <el-input type="textarea" v-model="form0.up"></el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <el-button @click="SubmitEvent">保存</el-button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, getCurrentInstance } from 'vue';
import { useRouter } from "vue-router";
import { watchEffect } from "vue";
  const emitEvents = defineEmits(['save_close'])
let router = useRouter();
let navActive = ref();
var id = ref();
  watchEffect(() => {
  navActive.value = router.currentRoute.value;
  id.value = navActive.value.params.id;
});
  var form0 = ref({
    id: "",
    eng: "",
    real_name: "",
    profession: "",
    profession_2: "",
    stars: 0,
    camp: "",
    feat: "",
    sto_mi: "",
    sto_mi_de: "",
    skill_f: [],
    skill_b: [{ name: "", de: "", need: "", pos: "", ico: "" }],
    stu: "参照医学检测报告，确认为非感染者。",
    dis: "造影检测结果显示，该干员体内脏器轮廓清晰，未见异常阴影，循环系统内源石颗粒检测未见异常，无矿石病感染迹象，现阶段可确认为非矿石病感染者。",
    pos: "近战位",
    tag: [],
    tianfu: [{ name: "", de_zero: "", de_one: "", de_two: "", notes: "" }],
    se: true,
    open: true,
    sex: "",
    orgin: "",
    race: "",
    exp: "",
    birth: "",
    height: 0,
    sto: "0",
    sto_area: "",
    sto_note: "",
    test: { phy: 0, speed: 0, blood: 0, pla: 0, ski: 0, stone: 0,note:"" },
    obj: "",
    dang1: "",
    dang2: "",
    dang3: "",
    dang4: "",
    sto_act_de: "",
    sto_act: 0,
    up: "",
    special: "",
  })
  const { proxy } = getCurrentInstance()
  proxy.$request
  .post(proxy.$urls.m().get_character_one, { staff: id.value })
  .then((result) => {
    const character = result.data;
    console.log(character)
    form0.value = character;
    if(form0.value.sto>0){
      form0.value.sto=form0.value.sto.toString()
    }else{
      form0.value.sto="0"
    }
    selectsto();
    selectpro1();
    if(character.profession_de){
      form0.value.feat = character.profession_de.de
    }
    if(character.tag){
      if(character.tag.open==1){
        form0.value.open=true
      }else{
        form0.value.open=false
      }
      get_tag_list(character.tag.tag_list)
    }else{
      form0.value.tag_list=[]
    }
    if(!character.test){
      form0.value.test = { phy: 0, speed: 0, blood: 0, pla: 0, ski: 0, stone: 0 ,note:""}
    }
    if(character.sex=='女'){
      form0.value.se=true
    }else{
      form0.value.se =false
    }
    selectStars();
    console.log(character)
    console.log(form0.value)
  });
  var professions = ref([])
  var professions_2 = ref([])
  var camp_list = ref([])
  const acc_list = ["未打分", "缺陷", "普通", "标准", "优良", "卓越"]
  const tag_list = ['控场', '爆发', '治疗', '支援', '费用回复', '输出', '生存', '群攻', '防护', '减速', '削弱', '快速复活', '位移', '召唤','元素']
  const pos_list = ['控制中枢', '发电站', '制造站', '贸易站', '宿舍', '加工站', '办公室', '训练室', '会客室']
  proxy.$request.post(proxy.$urls.m().get_profession).then(result => {
    professions.value = result.data
  })
  proxy.$request.post(proxy.$urls.m().get_camp).then(result => {
    camp_list.value = result.data
    console.log(camp_list)
  })
  var orgins = ref([]);
  proxy.$request.post(proxy.$urls.m().get_orgin).then((result) => {
    orgins.value = result.data;
  });
  var races = ref([]);
  proxy.$request.post(proxy.$urls.m().get_race).then((result) => {
    races.value = result.data;
  });
  const get_tag_list = (tag)=>{
    const tags = tag.split(',')
    var tag_list0 = []
    for(var i=0;i<tags.length;i++){
      if(tags[i]=='远程位'||tags[i]=='近战位'){
        form0.value.pos = tags[i]
      }else if(tags[i].includes('干员')||tags[i]=='新手'||tags[i]=='支援机械'){
        console.log(tags[i])
      }else{
        tag_list0.push(tags[i])
      }
    }
    console.log(tag_list0)
    form0.value.tag_list=tag_list0
  }
  const selectpro1 = () => {
    proxy.$request.post(proxy.$urls.m().get_profession_2, form0.value).then(result => {
      console.log(result)
      professions_2.value = result.data
      console.log(professions_2.value)
    })
  }
  const selectIcoDe = (itme) => {
  form0.value.profession_2 = professions_2.value[itme].profession_2;
  form0.value.feat = professions_2.value[itme].de;
  console.log(form0)
}
  const selectStars = () => {
    var skill_num = 0;
    if (form0.value.stars < 3) {
      skill_num = 0;
    } else if (form0.value.stars < 4) {
      skill_num = 1;
    } else if (form0.value.stars < 6) {
      skill_num = 2;
    } else {
      skill_num = 3;
    }
    if (id.value=="阿米娅"){
      skill_num = 3;
    }
    for (var i = form0.value.skill_f.length; i <= skill_num; i++) {
      const skill = { name: "", type1: "", type2: "", start: 0, use: 0, usetime: 0, de: "", note: "" };
      form0.value.skill_f.push(skill);
    }
    for (var i0 = form0.value.skill_f.length; i0 > skill_num; i0--) {
      form0.value.skill_f.pop();
    }
  }
  const addtianfu = () => {
    const unit = { name: "", de_zero: "", de_one: "", de_two: "", notes: "" };
    form0.value.skill_t.push(unit);
  }
  const minustianfu = () => {
    form0.value.skill_t.pop();
  }
  const addskill = () => {
    const unit = { name: "", de: "", need: "", pos: "", icon: "" };
    form0.value.skill_b.push(unit);
  }
  const minusskill = () => {
    form0.value.skill_b.pop();
  }
  const selectsto = () => {
    if (form0.value.sto==0) {
      form0.value.stu = "参照医学检测报告，确认为非感染者。";
      form0.value.dis = "造影检测结果显示，该干员体内脏器轮廓清晰，未见异常阴影，循环系统内源石颗粒检测未见异常，无矿石病感染迹象，现阶段可确认为非矿石病感染者。";
    } else if(form0.value.sto==1) {
      form0.value.stu = "体表有原石结晶分布，参照医学检测报告，确认为感染者。";
      form0.value.dis = "造影检测结果显示，该干员体内脏器轮廓模糊，可见异常阴影，循环系统内源石颗粒检测异常，有矿石病感染迹象，现阶段可确认为是矿石病感染者。";
    }else{
      form0.value.stu = "";
      form0.value.dis = "";
    }
    console.log(form0)
  }
  const SubmitEvent = () => {
    console.log(form0.value)
    if (form0.value.se) {
      form0.value.sex = "女"
    } else {
      form0.value.sex = "男"
    }
    if (form0.value.stars == 2) {
      form0.value.tag_list.push("新手")
    } else if (form0.value.stars == 5) {
      form0.value.tag_list.push("资深干员")
    } else if (form0.value.stars == 6) {
      form0.value.tag_list.push("高级资深干员")
    } else if (form0.value.stars == 1) {
      form0.value.tag_list.push("支援机械")
    }
    const itme_name = form0.value.profession + "干员";
    form0.value.tag_list.push(itme_name);
    form0.value.tag_list.push(form0.value.pos);
    proxy.$request
      .post(proxy.$urls.m().update_character, form0.value)
      .then((result) => {
        if (result.data == 200) {
          ElMessage({
            message: '保存成功',
            type: 'success',
          })
        } else {
          ElMessage({
            message: '保存失败',
            type: 'warning',
          })
        }
        router.push('/character_index')
      });
  }
  </script>
  
  <style>
  @media screen and (min-width: 1000px) {
    #left {
      width: 50%;
    }
  
    #right {
      width: 50%;
    }
  }
  
  #description {
    background-color: rgba(255, 255, 255, 0.87);
    width: 90%;
    margin: auto;
    border-radius: 10px;
    margin-bottom: 10px;
  }
  
  #title {
    text-align: center;
    color: #00BBFF;
    font-size: 40px;
  }
  
  #selfform {
    background-color: rgb(255, 255, 255);
    width: 95%;
    margin: auto;
  }
  
  .pad-bot {
    padding-bottom: 8px !important;
  }
  
  body {
    color: white;
  }
  
  .title0 {
    position: absolute;
    font-size: 15px;
    margin-top: -17px;
    background-color: #FFF;
    padding-left: 5px;
    padding-right: 5px;
  }
  
  .flex1 {
    display: flex;
  }
  
  .text {
    color: #606266;
    line-height: 20px;
    margin-top: -6px;
    margin-bottom: -6px;
  }
  
  .test {
    height: 32px;
  }
  
  .pos-tag {
    padding-left: 5px;
  }
  
  #submit {
    width: 100px;
    height: 30px;
    border-radius: 10px;
    font-size: 15px;
  }
  
  #submit:hover {
    animation-name: submitfrom;
    animation-duration: 1000ms;
    animation-fill-mode: forwards;
  }
  
  @keyframes submitfrom {
    100% {
      background-color: #00BBFF;
      color: white;
    }
  }
  
  #head {
    background-color: rgb(244, 244, 244);
    text-align: left;
    padding: 5px;
    border: 1px rgb(161, 170, 187) solid;
  }
  
  .border {
    border: 2px rgba(161, 170, 187, 0.678) solid;
    margin: 10px;
    margin-bottom: 0px;
    padding-bottom: 0px;
  }
  
  .border1 {
    padding: 10px;
    border: 2px rgba(161, 170, 187, 0.678) solid;
  }
  
  .slice_width {
    margin: 5px 0px;
    margin-bottom: 15px;
  }
  
  #type {
    display: flex;
    padding: 5px;
    align-self: start;
    justify-content: left;
    line-height: 30px;
  }
  
  .demo-rate-block {
    padding: 0px 0;
    margin: -15px, 0;
    text-align: center;
    display: inline-block;
    width: 49%;
    box-sizing: border-box;
  }
  
  .el-select {
    float: left !important;
  }
  
  .el-input__inner {
    height: 25px !important;
    line-height: 25px !important;
    padding: 0px 0px 0px 0px !important;
    margin-left: 5px;
    border-radius: 2px !important;
  }
  
  .el-form-item {
    margin-bottom: 0 !important;
  }
  
  .el-form-item__label {
    text-align: left !important;
    line-height: 35px !important;
    padding-left: 10px;
  }
  
  .el-form-item__content {
    line-height: 35px !important;
  }
  
  .wid_input1 {
    max-width: 100px !important;
  }
  
  .row {
    flex-wrap: wrap;
  }
  </style>