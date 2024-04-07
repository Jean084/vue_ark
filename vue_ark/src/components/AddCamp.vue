<template>
  <h1 id="title">信息录入</h1>
  <p id="description">阵营信息录入表<em>（Doctor录入，PRST保存）</em></p>
  <div id="selfform">
    <el-row type="flex" class="row">
      <el-col id="left">
        <div class="border">
          <el-form ref="form" :model="form0" label-width="80px" class="pad pad_bot">
            <el-form-item label="阵营名称">
              <el-input v-model="form0.name"></el-input>
            </el-form-item>
            <el-form-item label="所属地区">
              <el-select v-model="form0.orgin" placeholder="选择地区">
                <div v-for="(itme, i) in orgins" :key="i">
                  <el-option :label="itme.place" :value="itme.place"></el-option>
                </div>
              </el-select>
            </el-form-item>
          </el-form>
          <el-button @click="SubmitEvent">保存</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import { reactive } from "vue";
import { getCurrentInstance } from "vue";

const emitEvents = defineEmits(['save_close'])
const { proxy } = getCurrentInstance();
const form0 = reactive({
  orgin: "",
  name: "",
});
var orgins = ref([]);
proxy.$request.post(proxy.$urls.m().get_orgin).then((result) => {
  orgins.value = result.data;
});
const SubmitEvent = () => {
  proxy.$request
    .post(proxy.$urls.m().add_camp, form0)
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

.wid_input1 {
  max-width: 60px !important;
}

.row {
  flex-wrap: wrap;
}
</style>
