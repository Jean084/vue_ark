import { createApp } from 'vue'
//import Vue from 'vue'
import App from './App.vue'
import router from './router';
import ElementPlus from 'element-plus'
import "./assets/font/font.css"
import './assets/icons/iconfont.css'
//import "element-plus/es/components/loading/style/index";
//import 'element-ui/lib/theme-chalk/index.css';

//import './plugins/element.js'

//Vue.use(ElementUI, {size: 'small'});
import request from '../src/api/axios'
import urls from '../src/api/urlconfig.js'

const app = createApp(App).use(router)
app.use(ElementPlus)
app.config.globalProperties.$urls = urls
app.config.globalProperties.$request = request

app.mount('#app')