 import axios from 'axios'
 import { message } from 'antd';

 // 创建axios实例
 const instance = axios.create({
   headers: {
     'Content-Type': 'application/json;charset=UTF-8'
   }
 })
 
 instance.interceptors.request.use(
    (config) => {
        return config
    },
    (error) => {
        throw Error(error)
    }
)
 
 instance.interceptors.response.use(
   // 请求成功
   (res) => {
      const STATUS_OK = 200
      if (res.status !== STATUS_OK) {
          message.error(`网络请求：${res.status}` || '请求错误');
          return Promise.reject(res)
      }
  
      // 如果是正常数据返回，则直接返回json格式中的data
      if (res?.data?.ErrorCode === 0 && res?.data?.Result) {
          return Promise.resolve(res.data.Result)
      } else {
          message.error(res.data?.ErrorMsg || '请求错误');
          return Promise.reject(res.data)
      }
   },
   // 请求失败
   (error) => {
     const {response} = error
     if (response) {
       // 请求已发出，但是不在2xx的范围
       return Promise.reject(response)
     } else {
       //断网，可加刷新组件
       return Promise.reject(response)
     }
   })
 
 export default instance