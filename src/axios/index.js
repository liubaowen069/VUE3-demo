import axios from '@/axios/axios'
import { ElMessage } from 'element-plus'

//发送数据方式为get，其格式为org?id=1(对象格式)
export function fetchGet(url, params, config) {
    return new Promise((resolve, reject) => {
        axios.get(url,
            {
                params: params
            },
            config)
            .then(response => {
                if (response.data.success) { 
                    resolve(response.data)
                } else if(response.data.success == false){
                    resolve(response.data)
                    ElMessage({
                        message: response.data.msg,
                        type: "error"
                    })
                } else{
                    resolve(response.data)
                }

            }, err => {
                reject(err)
            })
            .catch((error) => {
                reject(error)
            })
    })
}


export function fetchPost(url, params, config) {
    return new Promise((resolve, reject) => {
        axios.post(url, params, config)
            .then(response => {
                if (response) { 
                    resolve(response.data)
                } else{
                    ElMessage({
                        message: response.data,
                        type: "error"
                    })
                }

            }, err => {
                reject(err)
            })
            .catch((error) => {
                reject(error)
            })
    })
}