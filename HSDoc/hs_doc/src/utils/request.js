import axios from 'axios'
import urlencode from 'urlencode'
axios.defaults.baseURL = '/api'

const instance = axios.create({
    // baseURL: 'http://localhost:9999',
    timeout: 30000,
    // headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded'
    // }
    // headers: {
    //   post: {
    //     'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    //   }
    // }
})

// // 请求拦截
// instance.interceptors.request.use(config => {
//     // 自定义header，可添加项目token
//     if (localStorage.getItem("token")) {
//         config.headers.Authorization = localStorage.getItem("token");
//         config.headers.timestamp = new Date().getTime();
//     }
//     return config;
// }, error => {
//     return Promise.reject(error);
// })

// // 响应拦截
// instance.interceptors.response.use(response => {
//     const resCode = response.status;
//     if (resCode === 200) {
//         return Promise.resolve(response);
//     } else {
//         return Promise.reject(response);
//     }
//     return response;
// }, error => {
//     const resCode = error.response.status;
//     // switch (resCode) {
//     //   case 401:
//     //     vm.$Message.error(error.response.data.message);
//     //     store.commit('logout', this);
//     //     store.commit('clearOpenedSubmenu');
//     //     // console.log('token-0', store.state.app.token);
//     //     router.replace({
//     //       name: 'login'
//     //     });
//     //     break;
//     //   case 404:
//     //     vm.$Message.error('网络请求不存在');
//     //     break;
//     //   case 500:
//     //     vm.$Message.error('服务器连接错误');
//     //     break;
//     //   // 其他状态码错误提示
//     //   default:
//     //     vm.$Message.error(error.response.data.message);
//     // }
//     return Promise.reject(error);
// })

/*
 *封装get方法
 *@param{String} url [请求地址]
 *@param{Object} params 请求参数
 */
export function Get(url, params) {
    return new Promise((resolve, reject) => {
        instance.get(url, params).then((res) => {
            resolve(res.data);
        }).catch((error) => {
            reject(error.data);
        })
    })
}

/**
 *封装post方法
 *@param{String} url 请求地址
 *@param{Object} params 请求参数
 */
export function Post(url, params) {
    return new Promise((resolve, reject) => {
        instance.post(url, params).then((res) => {
            resolve(res.data);
        }).catch((error) => {
            reject(error.data);
        })
    })
}

/**
 *封装put方法
 *@param{String} url 请求地址
 *@param{Object} params 请求参数
 */
export function Put(url, params) {
    return new Promise((resolve, reject) => {
        instance.put(url, params).then((res) => {
            resolve(res.data);
        }).catch((error) => {
            reject(error.data);
        })
    })
}

/**
 *封装patch方法
 *@param{String} url 请求地址
 *@param{Object} params 请求参数
 */
export function Patch(url, params) {
    return new Promise((resolve, reject) => {
        instance.put(url, params).then((res) => {
            resolve(res.data);
        }).catch((error) => {
            reject(error.data);
        })
    })
}

/**
 *封装delete方法
 *@param{String} url [请求地址]
 *@param{Object} params [请求参数]
 */
export function Delete(url, params) {
    return new Promise((resolve, reject) => {
        instance.delete(url, {
            data: params
        }).then((res) => {
            resolve(res.data);
        }).catch((error) => {
            reject(error.data);
        })
    })
}

//文件上传 
export function Upload(url, params,data) {
    return new Promise((resolve, reject) => {
        instance.post(url, params,
            { headers: { "Content-Type": "multipart/form-data" }})
            .then((res) => {
                resolve(res.data);
            }).catch((error) => {
                reject(error.data);
            })
    })
}

/**
 *封装下载方法
 *@param{String} url [请求地址]
 *@param{Object} params [请求参数]
 */
export function Download(url, params) {
    return new Promise((resolve, reject) => {
        instance.post(url, params, { responseType: "blob" }).then((res) => {
            if (res.data.success == false) {
                resolve({ code: -1, msg: "未找到下载文件", success: false });
            }
            else {
                let fileName = res.headers["content-disposition"].split(";")[1].split("filename=")[1];
                let blob = new Blob([res.data]);
                let url = window.URL.createObjectURL(blob); // 创建 url 并指向 blob
                let a = document.createElement('a');
                a.href = url;
                a.download = urlencode.decode(fileName);
                a.click();
                window.URL.revokeObjectURL(url); // 释放该 url
                resolve({ code: 1, msg: "文件已下载", success: true });
            }
        }).catch((error) => {
            reject(error.data);
        })
    })
}