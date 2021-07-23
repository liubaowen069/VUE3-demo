import axios from 'axios'
import { ElMessage,ElMessageBox  } from 'element-plus'

let baseApiUrl = "http://apicbs.dev.guojutech.net/";
let baseUploadUrl = baseApiUrl+'filereso-api/oss/file/upload?dirName=';
let baseImgUrl = baseApiUrl+'filereso-api/oss/file/viewFile?fileId=';
// if (process.env.NODE_ENV != 'development') {
//     let env = require('../config/env');
//     baseApiUrl = env.API_URL;
//     baseUploadUrl = env.API_URL + 'filereso-api/oss/file/upload?dirName=';
//     baseImgUrl = env.API_URL + 'filereso-api/oss/file/viewFile?fileId=';
// }
// export const BaseUrl =  baseApiUrl + '/jyxm-boss';
export const BaseUrl =  baseApiUrl;
export const imgUrl =  baseImgUrl;
export const fileUrl = (fileId) => baseUploadUrl + fileId ;
export const uploadUrl = (fileId) => baseUploadUrl + fileId;
//携带 cookie
axios.defaults.withCredentials = true;

const CancelToken = axios.CancelToken;
export const source = CancelToken.source();

let headerData = config => {
    let data = JSON.parse(sessionStorage.getItem('data')) ;
    if(data != null) {
        config.headers['sysId'] = data.sysId;
        config.headers['enterpriseId'] = data.enterpriseId;
        config.headers['merchantId'] = sessionStorage.getItem('merchantId');
        config.headers['X-Auth-Token'] = data.sessionId;
    }
}
// 创建axios实例
const service = axios.create({
    baseURL: BaseUrl,
    // url: baseUrl,    // api的base_url
    // timeout: 10000, // 请求超时时间（毫秒）
    // widthCredentials: true, //请求是否携带凭证
})

// request拦截器
service.interceptors.request.use(config => {
    // config.headers['x-auth-token'] = '986754';
    headerData(config)
    return config
}, error => {
    return Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(response => {
    
    response.headers['Content-type'] = 'application/json;charset=UTF-8';
    if (response.data.code === 401) {
        // 登录超时或账号已在别处登录
        ElMessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning',
        }).then(() => {
            loginOut();
        })
    } else if(response.data.code === 302 && response.data.msg == 'oauth2') {
        window.location.href=response.data.data.location
    }
    return response;
}, error => {
    if(!error.response){
        return Promise.reject(error);
    }
    const res = error.response.data;
    if (res.status === 40101 || res.status === 401) {
        // 登录超时或账号已在别处登录
        ElMessage({
            message: res.message,
            type: 'error',
            duration: 5 * 1000
        });
        ElMessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning',
        }).then(() => {
            loginOut();
        })
    }
    if(res.status === 40311){
        ElMessage({
            message: '当前用户无相关操作权限！',
            type: 'error',
            duration: 5 * 1000
        });
        loginOut();
    }
    if (res.status === 40001) {
        ElMessage({
            message: '账户或密码错误！',
            type: 'warning'
        });
    }
    if(error.response.data && (res.status === 200 || res.data === 304 || res.data === 400 || res.data === 500 )){
        ElMessage({
            message: res.msg,
            type: "warning"
        })
    }
    // store.dispatch('handIsLoading', false);
    return Promise.reject(error)
});

//登出，回到登陆页
function loginOut()  {

    store.dispatch('LogOut').then(res => {
        console.log(res)
        // this.$router.push('/');
        // location.reload();
    })
}

export default service;

