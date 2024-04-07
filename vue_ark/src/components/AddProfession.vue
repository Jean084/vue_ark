<template>
    <h1 id="title">信息录入</h1>
    <p id="description">二级子职业信息录入表<em>（Doctor录入，PRST保存）</em></p>
    <div id="selfform">
        <el-row type="flex" class="row pad_bot">
            <el-col id="left">
                <div class="border">
                    <el-form ref="form" :model="form0" label-width="80px" class="pad pad_bot">
                        <el-form-item label="职业大类">
                            <el-select v-model="form0.ico" placeholder="选择职业">
                                <div v-for="(itme, i) in professions" :key="i">
                                    <el-option :label="itme.profession" :value="itme.id"></el-option>
                                </div>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="二级职业">
                            <el-input v-model="form0.ico_2"></el-input>
                        </el-form-item>
                        <el-form-item label="特性描述">
                            <el-input v-model="form0.de"></el-input>
                        </el-form-item>
                    </el-form>
                    <el-button @click="SubmitEvent">保存</el-button>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import { reactive } from 'vue'
import { ref, getCurrentInstance } from 'vue';
const emitEvents = defineEmits(['save_close'])
const { proxy } = getCurrentInstance()
var professions = ref([])
proxy.$request.post(proxy.$urls.m().get_profession).then(result => {
    professions.value = result.data
})
const form0 = reactive({
    ico: "",
    ico_2: "",
    de: "",
    cio: "",
})
const SubmitEvent = () => {
    form0.cio = form0.ico + form0.ico_2
    form0.ico = professions.value[form0.ico - 1].profession
    proxy.$request.post(proxy.$urls.m().add_profession_2, form0).then(result => {
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
    })
}
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
.pad-bot {
  padding-bottom: 8px !important;
}
</style>