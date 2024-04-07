import axios from "axios";
import{Base64} from 'js-base64';
import { ElMessageBox } from "element-plus";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
//创建通用的axios配置
let instance = axios.create({
    responseType:"json",
    headers:{'Content-Type':'application/json;charset=utf-8',}
})
//对token加密
function baseFun(){
    const token= localStorage.getItem('token')
    const base64 = Base64.encode(token+':')
    return 'Basic '+base64
}
//http拦截,在axios请求发送之前给每一个接口携带token给予后端校验;
instance.interceptors.request.use(
    config=>{
        NProgress.start()
        let token = localStorage.getItem('token')
        if(token){
            config.headers.Authorization = baseFun()
        }
        return config        
    },
    err =>{
        NProgress.start()
        return Promise.reject(err)
    }
)
//http拦截,请求发出之后对传回的数值进行处理
instance.interceptors.response.use(
    response=>{
        NProgress.done()
        return response
    },
    error=>{
        NProgress.done()
        if(error.response){
            let Errs = error.response.status
            let errdata = Errs ==401?error.response.data.msg.msg:'服务器发生错误'
            switch(Errs){
                case 401:
                    //没有访问权限
                    ElMessageBox.alert(errdata,'提示',{
                        confirmButtonText:'好的',
                        type:"error"
                    }).then(res=>{
                        //跳转到登录页面
                        console.log(res)
                    }).catch(err=>{
                        console.log(err)
                    });break
                case 404:
                    ElMessageBox.alert(errdata,'提示',{
                        confirmButtonText:'好的',
                        type:"error"
                    }).then(res=>{
                        //跳转到登录页面
                        console.log(res)
                    }).catch(err=>{
                        console.log(err)
                    });break
            }
            return Promise.reject(error.response.data)//返回接口的错误信息
        }
    }
)

export default instance;