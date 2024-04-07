import instance from "./header";
const request = class{
    static post(url,arg){
        return new Promise((resolve,reject)=>{
            instance.post((url),arg).then(res=>{
                resolve(res)
            }).catch(err=>{
                reject(err)
            })
        })
    }
    static get(url){
        return new Promise((resolve,reject)=>{
            instance.get((url)).then(res=>{
                resolve(res)
            }).catch(err=>{
                reject(err)
            })
        })
    }
}
export default request;
//配置axios拦截器
/*
axios.interceptors.request.use(function (config) {
    NProgress.start()
    if (localStorage.getItem('token') != null) {
        config.headers.Authorization = localStorage.getItem('token')
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});
axios.interceptors.response.use(async function (response) {

    response.data.token && localStorage.setItem('token', response.data.token)
    NProgress.done()
    return response.data

}, function (error) {
    return Promise.reject(error);
});*/