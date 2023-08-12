import { memo, ChangeEvent, useEffect, useState, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input, Space, Button } from 'antd'
import { LoginWrapper } from './style.ts'
import initLoginBg from './init.ts'
import { loginRequest } from '@/store/modules/login.ts'
import { useAppDispatch } from '@/store/index.ts'

interface IProps {
  children?: ReactNode
}

const Login: React.FC<IProps> = memo(() => {
  const navigateTo = useNavigate()
  useEffect(() => {
    initLoginBg()
    window.onresize = () => initLoginBg()

    return () => {
      window.onresize = null
    }
  }, [])

  // 获取用户输入的信息
  const [username, setUsername] = useState('') // 定义用户输入用户名这个变量
  const [password, setPassword] = useState('') // 定义用户输入密码这个变量

  const usernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }
  const passwordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }
  const dispatch = useAppDispatch()
  // 点击登录按钮的事件函数
  const gotoLogin = async () => {
    dispatch(loginRequest({ username, password, callback: () => navigateTo('/') }))
  }

  return (
    <LoginWrapper>
      <div className="loginPage">
        {/* 存放背景 */}
        <canvas id="canvas" style={{ display: 'block' }}></canvas>
        {/* 登录盒子 */}
        <div className="loginBox loginbox">
          {/* 标题部分 */}
          <div className="title">
            <h1>合数科技&nbsp;·&nbsp;通用后台系统</h1>
            <p>Strive Everyday</p>
          </div>
          {/* 表单部分 */}
          <div className="form">
            <Space direction="vertical" size="large" style={{ display: 'flex' }}>
              <Input placeholder="用户名" onChange={usernameChange} />
              <Input.Password placeholder="密码" onChange={passwordChange} />
              <Button type="primary" className="loginBtn" block onClick={gotoLogin}>
                登录
              </Button>
            </Space>
          </div>
        </div>
      </div>
    </LoginWrapper>
  )
})

export default Login
