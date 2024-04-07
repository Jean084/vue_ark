<template>
    <div id="view" class="vop">
        <div class="body">
            <div class="top">
                <el-row class="row">
                    <el-container>
                        <el-aside width="50px" class="label-top">职业：</el-aside>
                        <el-main class="row0">
                            <div v-for="(item, i) in tag_list1" :key="i">
                                <button @click="addtag(item)" class="item">{{ item }}</button>
                            </div>
                        </el-main>
                    </el-container>
                </el-row>
                <el-row class="row">
                    <el-container>
                        <el-aside width="50px" class="label-top">位置：</el-aside>
                        <el-main class="row0">
                            <div v-for="(item, i) in tag_list2" :key="i">
                                <button @click="addtag(item)" class="item">{{ item }}</button>
                            </div>
                        </el-main>
                    </el-container>
                </el-row>
                <el-row class="row">
                    <el-container>
                        <el-aside width="50px" class="label-top">能力：</el-aside>
                        <el-main class="row0">
                            <div v-for="(item, i) in tag_list3" :key="i">
                                <button @click="addtag(item)" class="item">{{ item }}</button>
                            </div>
                        </el-main>
                    </el-container>
                </el-row>
                <el-row class="row">
                    <el-container>
                        <el-aside width="50px" class="label-top">资质：</el-aside>
                        <el-main class="row0">
                            <div v-for="(item, i) in tag_list4" :key="i">
                                <button @click="addtag(item)" class="item">{{ item }}</button>
                            </div>
                        </el-main>
                    </el-container>

                </el-row>
                <el-row class="row">
                    <el-container>
                        <el-aside width="50px" class="label-top">已选标签：</el-aside>
                        <el-main class="rowtab">
                            <el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false"
                                @close="handleClose(tag)">
                                {{ tag }}
                            </el-tag>
                            <button @click="dele()" class="del">清空</button>
                        </el-main>
                    </el-container>
                </el-row>
            </div>
            <div class="contain">
                <div v-if="dynamicTags.length == 3">
                    <div class="contain-item">
                        <div class="row tags">
                            <el-tag class="item">{{ dynamicTags[0] }}</el-tag>
                            <el-tag class="item">{{ dynamicTags[1] }}</el-tag>
                            <el-tag class="item">{{ dynamicTags[2] }}</el-tag>
                        </div>
                        <div class="row">
                            <div v-for="(item0, i) in role" :key="i">
                                <div v-if="(item0.tags.findIndex(tag => tag == dynamicTags[0]) != -1)
                                    && (item0.tags.findIndex(tag => tag == dynamicTags[1]) != -1)
                                    && (item0.tags.findIndex(tag => tag == dynamicTags[2]) != -1)
                                    && (dynamicTags.findIndex(tag => tag == '高级资深干员') != -1 || item0.stars != 6)">
                                    <el-tag type="warning" class="item item_result">
                                        <img :src="getImg('chara_all/' + item0.staff + '_'+(Math.floor(item0.stars/4)+1)+'.png')" class="img-li" />
                                        {{ item0.staff }}
                                    </el-tag>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="contain-item">
                        <div class="row tags">
                            <el-tag class="item">{{ dynamicTags[0] }}</el-tag>
                            <el-tag class="item">{{ dynamicTags[2] }}</el-tag>
                        </div>
                        <div class="row">
                            <div v-for="(item0, i) in role" :key="i">
                                <div v-if="(item0.tags.findIndex(tag => tag == dynamicTags[0]) != -1)
                                    && (item0.tags.findIndex(tag => tag == dynamicTags[2]) != -1)
                                    && ((dynamicTags[0] == '高级资深干员' || dynamicTags[2] == '高级资深干员') || item0.stars != 6)">
                                    <el-tag type="warning" class="item item_result">
                                        <img :src="getImg('chara_all/' + item0.staff + '_'+(Math.floor(item0.stars/4)+1)+'.png')" class="img-li" />
                                        {{ item0.staff }}
                                    </el-tag>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="contain-item">
                        <div class="row tags">
                            <el-tag class="item">{{ dynamicTags[1] }}</el-tag>
                            <el-tag class="item">{{ dynamicTags[2] }}</el-tag>
                        </div>
                        <div class="row">
                            <div v-for="(item0, i) in role" :key="i">
                                <div v-if="(item0.tags.findIndex(tag => tag == dynamicTags[1]) != -1)
                                    && (item0.tags.findIndex(tag => tag == dynamicTags[2]) != -1)
                                    && ((dynamicTags[1] == '高级资深干员' || dynamicTags[2] == '高级资深干员') || item0.stars != 6)">
                                    <el-tag type="warning" class="item item_result">
                                        <img :src="getImg('chara_all/' + item0.staff + '_'+(Math.floor(item0.stars/4)+1)+'.png')" class="img-li" />
                                        {{ item0.staff }}
                                    </el-tag>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="dynamicTags.length > 1">
                    <div class="contain-item">
                        <div class="row tags">
                            <el-tag class="item">{{ dynamicTags[0] }}</el-tag>
                            <el-tag class="item">{{ dynamicTags[1] }}</el-tag>
                        </div>
                        <div class="row">
                            <div v-for="(item0, i) in role" :key="i">
                                <div v-if="(item0.tags.findIndex(tag => tag == dynamicTags[0]) != -1)
                                    && (item0.tags.findIndex(tag => tag == dynamicTags[1]) != -1)
                                    && ((dynamicTags[0] == '高级资深干员' || dynamicTags[1] == '高级资深干员') || item0.stars != 6)">
                                    <el-tag type="warning" class="item item_result">
                                        <img :src="getImg('chara_all/' + item0.staff + '_'+(Math.floor(item0.stars/4)+1)+'.png')" class="img-li" />
                                        {{ item0.staff }}
                                    </el-tag>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-for="(item, index) in dynamicTags" :key="index">
                    <div class="contain-item">
                        <div class="row tags">
                            <el-tag class="item">{{ item }}</el-tag>
                        </div>
                        <div class="row">
                            <div v-for="(item0, i) in role" :key="i">
                                <div v-if="(item0.tags.findIndex(tag => tag == item) != -1)
                                    && (item == '高级资深干员' || item0.stars != 6)">
                                    <el-tag type="warning" class="item item_result">
                                        <img :src="getImg('chara_all/' + item0.staff + '_'+(Math.floor(item0.stars/4)+1)+'.png')" class="img-li" />
                                        {{ item0.staff }}
                                    </el-tag>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { ref, getCurrentInstance } from 'vue';

export default {
    setup() {
        var role=ref([])
        const { proxy } = getCurrentInstance()
        proxy.$request.post(proxy.$urls.m().get_character_tag).then(result => {
            for (var i=0;i<result.data.length;i++)
            {
                const one={id:result.data[i].id,staff:result.data[i].staff,open:result.data[i].open,tags:(result.data[i].tag_list).toString().split(","),stars:result.data[i].stars}
                role.value.push(one)
            }
            console.log(role.value)
        })
        var form = {};
        var dynamicTags = ref(['控场', '爆发', '治疗']);
        var tag_list1 = ['先锋干员', '近卫干员', '狙击干员', '医疗干员', '辅助干员', '术士干员', '重装干员', '特种干员'];
        var tag_list2 = ['近战位', '远程位'];
        var tag_list3 = ['控场', '爆发', '治疗', '支援', '费用回复', '输出', '生存', '群攻', '防护', '减速', '削弱', '快速复活', '位移', '召唤', '支援机械'];
        var tag_list4 = ['新手', '资深干员', '高级资深干员'];
        var tag_list5 = ['1', '2', '3', '4', '5', '6'];
        var inputVisible = false;
        var inputValue = '';
        const handleClose = (tag) => {
            dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1);
        }
        const addtag = (tag) => {
            if (dynamicTags.value.length < 3) {
                dynamicTags.value.push(tag);
            }
        }
        const dele = () => {
            dynamicTags.value = [];
        }
        const getImg = (img) => {
            console.log(img)
            try {
            return require("../../../public/img/" + img);
            } catch (e) {
            return require("../../../public/img/failed.png");
            }
        };
        return {
            form, dynamicTags, tag_list1, tag_list2, tag_list3, tag_list4, tag_list5, inputValue, inputVisible,
            handleClose, addtag, dele, role,getImg
        }
    }
}
</script>

<style>
.vop {
    margin: -10px;
    justify-content: center;
    display: flex;
    flex-wrap: wrap;
    padding-top: 50px;
    min-height: 100%;
}

.body {
    width: 80%;
    padding: auto;
}

.row {
    display: flex;
    border: 1px solid rgb(209, 208, 208);
    align-items: center;
    flex-wrap: wrap;
}

.row0 {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

}
.rowtab {
    padding: auto;
    display: flex;
    align-items: center;
    padding: 10px;
    flex-wrap: wrap;

}

.label-top {
    width: 80px;
    text-align: start;
    text-justify: center;
    padding-left: 20px;
    padding-top: 15px;
    font-size: 12px;
    padding-bottom: 14px;
}

.item {
    margin: 10px;
    align-items: center;
    justify-content: center;
    display: flex;
}
.item_result{
    line-height: 10;
}
.del {
    background-color: black;
    color: #fff;
    margin-left: 50px;
}

.top {
    max-width: 1200px;
    margin: auto;
    margin-top: 10px;
    border: 5px solid rgb(182, 212, 255);
    background-color: #fff;
}

.contain {
    max-width: 1200px;
    margin: auto;
    border: 5px solid rgb(182, 212, 255);
    background-color: #fff;
}

.contain-item {
    border: 5px solid rgb(182, 212, 255);
}

.tags {
    background-color: rgba(164, 191, 228, 0.466);
}

.img-li {
    width: 30px;
    margin-bottom: -10px;
}
</style>