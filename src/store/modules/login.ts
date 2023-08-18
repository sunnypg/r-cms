import { InitInfo, Login, Logout, getPersonal } from '@/service/login/login'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { message } from 'antd'
import { myLocalStorage } from '@/utils/storage'
import { mapMenuToRoutes } from '@/router'

// 登录
export const loginRequest = createAsyncThunk('login', async (accountInfo: any, { dispatch }) => {
  try {
    // 1、登录请求
    const loginRes = await Login({
      username: accountInfo.username,
      password: accountInfo.password
    })
    message.success(loginRes.message)

    // 2、保存token
    dispatch(changeTokenAction(loginRes.token))
    myLocalStorage.setStorage('scrm_token', loginRes.token)

    // 初始化
    init(dispatch)
    // 个人信息
    getPerson(dispatch)

    // 3、跳转到主页
    accountInfo.callback()
  } catch (error) {
    console.log(error)
  }
})

// 退出
export const logoutRequest = createAsyncThunk('logout', async (logoutAction: any) => {
  try {
    const res = await Logout()
    message.success(res.message)
    myLocalStorage.deleteStorage('scrm_token')
    myLocalStorage.deleteStorage('initInfo')
    myLocalStorage.deleteStorage('userInfo')

    logoutAction.goToLogin()
  } catch (error) {
    console.log(error)
  }
})

// 获取缓存数据（用户进行刷新默认加载数据）
export const LocalStorageAction = createAsyncThunk('LocalStorageAction', (arg, { dispatch }) => {
  const token = myLocalStorage.getStorage('scrm_token')
  const userInfo = myLocalStorage.getStorage('userInfo')
  const initInfo = myLocalStorage.getStorage('initInfo')

  if (token && userInfo && initInfo) {
    dispatch(changeTokenAction(token))
    dispatch(changePersonalAction(userInfo))
    dispatch(changeInitInfoAction(initInfo))

    // 动态添加路由
    mapMenuToRoutes(initInfo.menu)
  }
})

async function init(dispatch: any) {
  const initInfo = await InitInfo()
  console.log(initInfo.data)
  dispatch(changeInitInfoAction(initInfo.data))
  // 动态添加路由
  mapMenuToRoutes(initInfo.menu)
}

async function getPerson(dispatch: any) {
  const personal = await getPersonal()
  console.log(personal.data)
  dispatch(changePersonalAction(personal.data))
}

interface Istate {
  token: string
  initInfo: any
  userInfo: any
}

const initialState: Istate = {
  token: '',
  initInfo: {},
  userInfo: {}
}

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    changeTokenAction(state, { payload }) {
      state.token = payload
    },
    changeInitInfoAction(state, { payload }) {
      state.initInfo = payload
      myLocalStorage.setStorage('initInfo', state.initInfo)
    },
    changePersonalAction(state, { payload }) {
      state.userInfo = payload
      myLocalStorage.setStorage('userInfo', state.userInfo)
    }
  }
})
export const { changeTokenAction, changeInitInfoAction, changePersonalAction } = loginSlice.actions
export default loginSlice.reducer
