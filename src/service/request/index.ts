import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { MyRequestConfig } from './type'
import { myLocalStorage } from '@/utils/storage'
import { message } from 'antd'
import { TIME_OUT } from '../config'

/**
 *  1.对拦截器进行精细控制
 *    > 全局拦截器
 *    > 实例拦截器
 *    > 单次请求拦截器
 *
 *   2.响应结果的类型处理（泛型）
 */

let over = true
let Message = ''

class MyRequest {
  // 成员类型声明
  instance: AxiosInstance

  // 每个 MyRequest 实例对应一个 axios 实例
  constructor(config: MyRequestConfig) {
    this.instance = axios.create(config)

    // 给每一个 instance 实例都添加一个拦截器
    // 请求拦截器(全局)
    this.instance.interceptors.request.use(
      // 请求成功的回调
      (config) => {
        return config
      },
      // 请求失败的回调
      (err) => {
        return err
      }
    )

    // 响应拦截器(全局)
    this.instance.interceptors.response.use(
      // 响应成功的回调
      (res) => {
        if (res.status == 202) {
          message.error(res.data.message)
        }
        return res
      },
      // 响应失败的回调
      (err) => {
        console.log(err)
        if (err.message === `timeout of ${TIME_OUT}ms exceeded`) {
          message.error('请求超时')
        }
        if (err.code === 'ECONNABORTED') {
          message.error('请求超时')
        }
        if (err.code === 'ERR_NETWORK') {
          message.error('网络错误')
        }
        if (over) {
          over = false
          switch (err.response.status) {
            case 415:
              // 缺少令牌
              myLocalStorage.deleteStorage('token')
              message.warning({
                content: err.response.data.message,
                onClose: function () {
                  over = true
                  window.location.href = '/login'
                }
              })
              break
            case 401:
            case 403:
            case 500:
              message.error({
                content: err.response.data.message,
                onClose: function () {
                  over = true
                }
              })
              break
            case 422:
              for (const i in err.response.data.errors) {
                Message += err.response.data.errors[i] + ' '
              }
              message.error({
                content: Message,
                onClose: function () {
                  over = true
                  Message = ''
                }
              })
              break
            default:
              break
          }
        }
        return err
      }
    )

    // // 实例请求拦截器
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccessFn,
      config.interceptors?.requestFailureFn
    )
    // 实例响应拦截器
    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessFn,
      config.interceptors?.responseFailureFn
    )
  }

  // 封装网络请求的方法
  request<T = any>(config: MyRequestConfig<T>) {
    // 单次请求成功的拦截器
    if (config.interceptors?.requestSuccessFn) {
      config = config.interceptors.requestSuccessFn(config)
    }
    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 单次响应成功的拦截器
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors.responseSuccessFn(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get<T = any>(config: MyRequestConfig<T>) {
    return this.request({ ...config, method: 'GET' })
  }

  post<T = any>(config: MyRequestConfig<T>) {
    return this.request({ ...config, method: 'POST' })
  }

  delete<T = any>(config: MyRequestConfig<T>) {
    return this.request({ ...config, method: 'DELETE' })
  }

  patch<T = any>(config: MyRequestConfig<T>) {
    return this.request({ ...config, method: 'PATCH' })
  }

  put<T = any>(config: MyRequestConfig<T>) {
    return this.request({ ...config, method: 'PUT' })
  }
}

export default MyRequest
