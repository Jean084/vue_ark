<template>
    <div class="glory_page">
        <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item v-for="(itme, i) in class_list" :name=itme.name>
                <template #title class="class_glory_all">
                    <div class="class_title">{{ itme.name }}</div>
                </template>
                <div>
                    <div class="class_desc">{{ itme.desc }}</div>
                    <el-collapse>
                        <el-collapse-item v-for="(item1,i) in group_list">
                            <template #title>
                                <img class="group_img" :src="getImg('glory/' + item1.img+ '.png')">
                                <div>
                                    {{ item1.name }}
                                </div>
                            </template>
                        </el-collapse-item>
                    </el-collapse>
                    <div v-for="(item1,i) in glory_list">
                        <img class="glory_img" :src="getImg('glory/' + item1.medal_id+ '.png')">
                        <div>
                            {{ item1.name }}
                            {{ item1.desc }}
                            {{ item1.method }}
                        </div>
                    </div>
                </div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>
<script setup>
import "../assets/font/font.css"
import { ref, getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance();
var class_list = ref([])
var group_list = ref([])
var glory_list = ref([])
proxy.$request.post(proxy.$urls.m().get_glory0).then(result => {
    class_list.value = result.data
    console.log(class_list.value)
});
const getImg = (img) => {
    console.log(img)
    try {
        return require("../../public/img/" + img);
    } catch (e) {
        return require("../../public/img/failed.png");
    }
};

const activeNames = ref(['1'])
const handleChange = (val) => {
    console.log("123")
    console.log(val[1])
    proxy.$request.post(proxy.$urls.m().get_glory1_0, { class: val[1] }).then(result => {
        group_list.value = result.data
        console.log(group_list.value)
    });
    proxy.$request.post(proxy.$urls.m().get_glory_0, { class: val[1] }).then(result => {
        glory_list.value = result.data
        console.log(glory_list.value)
    });
}
</script>
<style>
.glory_page {
    margin-top: 20px;
    padding: 10px 10px;
    background-color: #ffffff75;
}
.class_glory_all{
    display: flex;
    flex-direction: column;
}
.class_title{
    padding: 10px;
    font-family: "chenguang";
    font-size: 25px;
}
.class_desc{
    padding: 0px 10px;
    font-family: "chenguang";
    font-size: 15px;
}
.group_img{

}
.glory_img{
    
}
</style>