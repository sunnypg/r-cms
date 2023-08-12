import myRequest from '..'

interface IAccount {
  username: string
  password: string
}

// 登录
export function Login(account: IAccount) {
  return myRequest.post({
    url: '/auth/login',
    data: account
  })
}

// 退出
export function Logout() {
  return myRequest.post({
    url: '/auth/logout'
  })
}

// 初始化
export function InitInfo() {
  return myRequest.get({
    url: 'common/init'
  })
}

// 个人信息
export function getPersonal() {
  return myRequest.get({
    url: 'common/personal'
  })
}
