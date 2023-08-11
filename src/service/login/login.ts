import myRequest from '..'

interface IAccount {
  username: string
  password: string
}

// 登录
export function accountLogin(account: IAccount) {
  return myRequest.post({
    url: '/auth/login',
    data: account
  })
}
