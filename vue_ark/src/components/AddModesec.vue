<template>
    <h1 id="title">信息录入</h1>
    <p id="description">二级模组信息录入表<em>（Doctor录入，PRST保存）</em></p>
    <div id="selfform">
        <el-row type="flex" class="row">
            <el-col id="left">
                <div class="border">
                    <el-form ref="form" :model="form0" label-width="80px" class="pad">
                        <div class="flex1">
                            <el-form-item label="职业大类">
                                <el-select v-model="form0.ico" placeholder="选择职业" @change="selectpro1">
                                    <div v-for="(itme, i) in professions" :key="i">
                                        <el-option :label="itme.profession" :value="itme.profession"></el-option>
                                    </div>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="二级职业">
                                <el-select v-model="form0.ico_2" @change="selectpro2">
                                    <div v-for="(itme, i) in professions_2" :key="i">
                                        <el-option :label="itme.profession_2" :value="itme.profession_2"></el-option>
                                    </div>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="flex1">
                            <el-form-item label="一级模组">
                                <el-select v-model="code_i" placeholder="选择模组" @change="selectcode">
                                    <div v-for="(itme, i) in codes" :key="i">
                                        <el-option :label="itme.code" :value="i"></el-option>
                                    </div>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="所属角色">
                                <el-select v-model="form0.staff" @change="selectstaff">
                                    <div v-for="(itme, i) in staffs" :key="i">
                                        <el-option :label="itme.staff" :value="itme.staff"></el-option>
                                    </div>
                                </el-select>
                            </el-form-item>
                        </div>
                        <el-form-item label="模组名称">
                            <el-input v-model="form0.name"></el-input>
                        </el-form-item>
                        <hr>
                        <div class="border1 slice_width">
                            <div class="title0">相关天赋</div>
                            <el-form-item label="是否新增">
                                <el-switch v-model="form0.new" class="ml-2" inline-prompt
                                active-text="是"
                                inactive-text="否" />
                            </el-form-item>
                            <el-form-item v-if="form0.new" label="天赋名称">
                                <el-input v-model="form0.talant"></el-input>
                            </el-form-item>
                            <el-form-item v-else label="天赋名称">
                                <el-select v-model="talant_i" placeholder="选择天赋" @change="selecttalant">
                                    <div v-for="(itme, i) in talants" :key="i">
                                        <el-option :label="itme.name" :value="i"></el-option>
                                    </div>
                                </el-select>
                            </el-form-item>
                            <el-form-item v-if="!form0.new" label="天赋描述">
                                <div class="text">
                                    <p>{{ form0.talant_de }}</p>
                                </div>
                            </el-form-item>
                        </div>
                        <hr>
                        <div class="border1 slice_width">
                            <div class="title0">模组等级一</div>
                            <el-form-item label="数值提升">
                                <el-input v-model="form0.add1"></el-input>
                            </el-form-item>
                            <el-form-item label="特性追加">
                                <div class="text">
                                    <p>{{ form0.de }}</p>
                                </div>
                            </el-form-item>
                        </div>
                        <div class="border1 slice_width">
                            <div class="title0">模组等级二</div>
                            <el-form-item label="数值提升">
                                <el-input v-model="form0.add2"></el-input>
                            </el-form-item>
                            <el-form-item label="天赋更新">
                                <el-input v-model="form0.talent2"></el-input>
                            </el-form-item>
                        </div>
                        <div class="border1 slice_width">
                            <div class="title0">模组等级三</div>
                            <el-form-item label="数值提升">
                                <el-input v-model="form0.add3"></el-input>
                            </el-form-item>
                            <el-form-item label="天赋更新">
                                <el-input v-model="form0.talent3"></el-input>
                            </el-form-item>
                        </div>
                    </el-form>
                    <el-form ref="form" :model="form0" label-width="80px" class="pad">
                        <el-form-item label="模组故事" class="pad-bot">
                            <el-input type="textarea" v-model="form0.story"></el-input>
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
var professions_2 = ref([])
var codes = ref([])
var code_i = ref(0)
var staffs = ref([])
var talants = ref([])
var talant_i = ref()
proxy.$request.post(proxy.$urls.m().get_profession).then(result => {
    professions.value = result.data
})
const form0 = reactive({
    ico: "特种",
    ico_2: "陷阱师",
    de: "基础证章，无特殊效果。 STAGE MAX",
    name: "",
    code: "ORIGINAL",
    staff: "",
    talant: "",
    talant_de: "",
    story: "",
    add1: "",
    add2: "",
    add3: "",
    talent2: "",
    talent3: "",
    new:false,
})
const selectpro1 = () => {
    proxy.$request.post(proxy.$urls.m().get_profession_2, {profession:form0.ico}).then(result => {
        console.log(result)
        professions_2.value = result.data
    })
}
const selectpro2 = () => {
    proxy.$request.post(proxy.$urls.m().get_modeinit,{profession_2:form0.ico_2}).then(result => {
        console.log(result)
        codes.value = result.data
    })
    proxy.$request.post(proxy.$urls.m().get_character_pro2, {profession_2:form0.ico_2}).then(result => {
        console.log(result)
        staffs.value = result.data
    })
}
selectpro2()
const selectcode = () => {
    form0.code = codes.value[code_i.value].code
    form0.de = codes.value[code_i.value].de
}
const selecttalant = () => {
    form0.talant = talants.value[talant_i.value].name
    if(talants.value[talant_i.value].de_two==""){
        form0.talant_de = talants.value[talant_i.value].de_one
    }else{
        form0.talant_de = talants.value[talant_i.value].de_two
    }
}

const selectstaff = () => {
    console.log(form0)
    proxy.$request.post(proxy.$urls.m().get_tanlent_staff, form0).then(result => {
        console.log(result)
        talants.value = result.data
        if(form0.code=="ORIGINAL"){
            form0.name=form0.staff+"证章"
            form0.story="干员"+form0.staff+"擅长战场伏击与陷阱布置\n根据外勤部门决议\n在外勤任务中划分为"+form0.ico+"干员，行使"+form0.ico_2+"职责\n特别颁发此证章\n以兹证明"
        }
    })
}
const SubmitEvent = () => {
    if (form0.new) {
        form0.new = 1
    } else {
        form0.new = 0
    }
    proxy.$request.post(proxy.$urls.m().add_modesec, form0).then(result => {
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
</style>