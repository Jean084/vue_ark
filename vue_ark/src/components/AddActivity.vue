<template>
  <h1 id="title">信息录入</h1>
  <p id="description">历史活动记录<em>（Doctor录入，PRST保存）</em></p>
  <div id="selfform">
    <el-row type="flex" class="row">
      <el-col id="left">
        <div class="border pad-bot">
          <el-form ref="form" :model="form0" label-width="80px" class="pad pad-bot">
            <el-form-item label="开始日期">
              <el-date-picker v-model="form0.time_start" value-format="YYYY-MM-DD" type="date"
                placeholder="       Pick a day" />
            </el-form-item>
            <el-form-item label="结束日期">
              <el-date-picker v-model="form0.time_end" value-format="YYYY-MM-DD" type="date"
                placeholder="       Pick a day" />
            </el-form-item>
            <el-form-item label="是否复刻">
              <el-switch v-model="form0.again" @change="selectpro0" />
            </el-form-item>
            <el-form-item v-if="form0.again" label="复刻活动">
              <el-select v-model="select" placeholder="选择复刻活动名称" @change="selectpro1">
                <div v-for="(itme, i) in actives" :key="i">
                  <el-option :label="itme.name" :value="i"></el-option>
                </div>
              </el-select>
            </el-form-item>
            <el-form-item v-else label="活动名称">
              <el-input v-model="form0.name"></el-input>
            </el-form-item>
            <el-form-item label="活动类型">
              <el-select v-model="form0.type" placeholder="选择活动类型">
                <div v-for="(itme, i) in type" :key="i">
                  <el-option :label="itme" :value="itme"></el-option>
                </div>
              </el-select>
            </el-form-item>
            <el-form-item label="活动关卡">
              <el-input v-model="form0.code"></el-input>
            </el-form-item>
            <el-form-item label="宣传图">
              <el-input v-model="form0.pic"></el-input>
            </el-form-item>
            <el-form-item label="备注" >
              <el-input v-model="form0.notes"></el-input>
            </el-form-item>
          </el-form>
          <el-button @click="SubmitEvent" v-model="dialogVisible">保存</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { ref, getCurrentInstance, defineEmits } from "vue";
const emitEvents = defineEmits(['save_close'])
const { proxy } = getCurrentInstance();
var actives = ref([]);
var select = ref();
const dialogVisible = true;
proxy.$request.post(proxy.$urls.m().get_activity_0).then((result) => {
  actives.value = result.data;
});
const type = [
  "Side Story",
  "微型故事集",
  "危机合约",
  "集成战略",
  "引航者试炼",
  "主题曲",
  "其他",
];
const form0 = reactive({
  type: "",
  name: "",
  time_start: "",
  time_end: "",
  code: "",
  pic: "",
  again: 0,
  notes: "",
});
const selectpro0 = () => {
  if (form0.again == 0) {
    form0.type = ""
    form0.name = ""
    form0.code = ""
    form0.pic = ""
    form0.notes = ""
  }
};
const selectpro1 = () => {
  const form1 = actives.value[select.value]
  form0.type = form1.type
  form0.name = form1.name
  form0.code = form1.code
  form0.pic = form1.pic
  form0.notes = form1.notes
};
const SubmitEvent = () => {
  if (form0.time_end == "") {
    form0.time_end = null
  }
  proxy.$request
    .post(proxy.$urls.m().add_activity, form0)
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
      emitEvents('save_close', result)
    });
};
</script>

<style>
.border {
  border: 2px rgba(161, 170, 187, 0.678) solid;
  margin: 10px;
  padding: 10px;
}

.title {
  position: absolute;
  margin-top: -50px;
  background-color: rgb(255, 255, 255);
  width: 200px;
}

.el-select {
  float: left !important;
}

.el-form-item {
  margin-bottom: 0 !important;
}

.el-form-item__label {
  text-align: left !important;
  line-height: 35px !important;
  padding-left: 10px;
}

.el-date-editor.el-input {
  height: 25px;
}

.wid_input1 {
  max-width: 60px !important;
}

.demo-date-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}

.demo-date-picker .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
}

.demo-date-picker .block:last-child {
  border-right: none;
}

.demo-date-picker .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>
