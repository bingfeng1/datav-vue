import axios from 'axios'
import { BASE_URL } from '../config/apiStr';
// 在发送前，增加url前缀
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.url = BASE_URL + config.url
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

axios.interceptors.response.use(response => {
    const { data } = response
    if (data.status === 403) {
        //
    }
    if (data.status === 500) {
        //

    }
    return response;
}, err => {

    return err.response
})

// 获取所有组件
const reqGetComponents = () => {
    return axios.get('/components')
}

// 增加大屏
const reqPostLargeScreen = (data) => {
    return axios.post('/largeScreen', data)
}

// 获取所有大屏信息
const reqGetLargeScreen = () => {
    return axios.get('/largeScreen')
}

// 根据id获取长宽
const reqGetLargeScreenById = id => {
    return axios.get(`/largeScreen/${id}`)
}

// 获取自定义组件
const reqGetCusteomComponent = id=>{
    return axios.get(`/ownComponent/${id}`)
}

// 保存自定义组件
const reqPostCustomComponent = data => {
    return axios.post('/ownComponent', data)
}

// 修改自定义组件
const reqPutCustomComponent = data => {
    return axios.put('/ownComponent', data)
}


// 删除自定义组件
const reqDeleteCustomComponentById = _id => {
    return axios.delete('/ownComponent', {
        data:{
            _id
        }
    })
}

export {
    reqGetComponents,
    reqPostLargeScreen,
    reqGetLargeScreen,
    reqGetLargeScreenById,
    reqPostCustomComponent,
    reqDeleteCustomComponentById,
    reqGetCusteomComponent,
    reqPutCustomComponent
}