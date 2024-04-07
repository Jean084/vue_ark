<template>
    <div id="view" class="vadd">
    <el-col :sapn="8" class="tac">
        <div class="mb-2">
            <h4>添加信息</h4>
        </div>
        
        <el-menu
          active-text-color="#fff"
          background-color="#545c64"
          class="el-menu-vertical-demo"
          text-color="#fff"
          @select="handleSelect"
        >
        <el-menu-item v-for="item in Tablist" :key="item.content" @click="addTab(item.content)" class="item">
        {{ item.title }}
        </el-menu-item>
        </el-menu>
    </el-col>
    <div class="form">
        <el-tabs
        v-model="editableTabsValue"
        type="card"
        closable
        @tab-remove="removeTab">
    <el-tab-pane
      v-for="item in editableTabs"
      :key="item.name"
      :label="item.title"
      :name="item.name"
    >
        <AddCharacter v-if="item.content==0" @save_close="removeTab(item.name)"></AddCharacter>
        <AddCamp v-if="item.content==1" @save_close="removeTab(item.name)"></AddCamp>
        <AddProfession v-if="item.content==2" @save_close="removeTab(item.name)"></AddProfession>
        <AddActivity v-if="item.content==3" @save_close="removeTab(item.name)"></AddActivity>
        <AddModeinit v-if="item.content==4" @save_close="removeTab(item.name)"></AddModeinit>
        <AddModesec v-if="item.content==5" @save_close="removeTab(item.name)"></AddModesec>
    </el-tab-pane>
  </el-tabs>
    </div>
    </div>
  </template>


<script>
import {ref} from 'vue';
import AddCharacter from '../../components/AddCharacter.vue';
import AddCamp from '../../components/AddCamp.vue';
import AddActivity from '../../components/AddActivity.vue';
import AddProfession from '../../components/AddProfession.vue';
import AddModeinit from '../../components/AddModeinit.vue';
import AddModesec from '../../components/AddModesec.vue';

export default {
    setup(){
        var isSelect=ref(0)
        let tabIndex = 0
        const editableTabsValue = ref('0')
        const editableTabs = ref([])
        const Tablist = [{
            title:'添加干员',
            content:0,
        },{
            title:'添加阵营',
            content:1,
        },{
            title:'添加二级子职业',
            content:2,
        },{
            title:'添加活动',
            content:3,
        },{
            title:'添加一级模组',
            content:4,
        },{
            title:'添加专属模组',
            content:5,
        }]
        const handleSelect=(key, keyPath)=>{
            console.log(key, keyPath);
        }
        const handleOpen = (key, keyPath) => {
            console.log(key, keyPath)
        }
        const handleClose = (key, keyPath) => {
            console.log(key, keyPath)
        }
        const addTab = (index) => {
            const tab = Tablist[index]
            const newTabName = `${++tabIndex}`
            editableTabs.value.push({
                title: tab.title,
                name: newTabName,
                content: tab.content,
            })
            editableTabsValue.value = newTabName
        }
        const removeTab = (targetName) => {
            console.log("closethetab")
            const tabs = editableTabs.value
            let activeName = editableTabsValue.value
            if (activeName === targetName) {
                tabs.forEach((tab, index) => {
                    if (tab.name === targetName) {
                        const nextTab = tabs[index + 1] || tabs[index - 1]
                        if (nextTab) {
                            activeName = nextTab.name
                        }
                    }
                })
            }
            editableTabsValue.value = activeName
            editableTabs.value = tabs.filter((tab) => tab.name !== targetName)
        }
        return {isSelect,handleSelect,handleOpen,handleClose,editableTabsValue,editableTabs,
            removeTab,addTab,Tablist,AddActivity,AddCamp,AddCharacter,AddProfession,AddModeinit,AddModesec}
    }
}
</script>


<style>
.vadd {
    min-height: 100%;
    padding-top: 10px;
}
.form{
    height: auto;
    margin-left: 160px!important;
    margin-right: 20px!important;
    background-color: rgba(255, 255, 255, 0.699); 
}
.part{
    width: 50px;
    padding: 20px;
    margin: 20px;
    background-color: #ffffff00;
    border-radius: 50px;
    position:fixed;
    left:0;
    height:60px;
    z-index: 99;
}
.tab{
    background-color: rgba(171, 203, 244, 0);
    padding:20px;
}
.tac{
    margin-top: -10px;
    position:fixed;
    height: 100em;
    background-color: rgba(255, 255, 255, 0.514);
}
.mb-2{
    background-color: rgba(255, 255, 255, 0.514);
    padding: 1px;

}
.item{
    display: block;
    font-weight: 500;
    top:0
}

</style>