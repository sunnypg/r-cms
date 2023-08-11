import { memo, ChangeEvent, useEffect, useState, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input, Space, Button, message } from 'antd'
import styles from './login.module.less'
import initLoginBg from './init.ts'
import { accountLogin } from '@/service/login/login.ts'
import './login.less'

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
  const [usernameVal, setUsernameVal] = useState('') // 定义用户输入用户名这个变量
  const [passwordVal, setPasswordVal] = useState('') // 定义用户输入密码这个变量

  const usernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsernameVal(e.target.value)
  }
  const passwordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordVal(e.target.value)
  }
  // 点击登录按钮的事件函数
  const gotoLogin = async () => {
    try {
      // 发起登录请求
      const res = await accountLogin({
        username: usernameVal,
        password: passwordVal
      })

      message.success('登录成功！')
      // 2、保存token
      localStorage.setItem('scrm_token', res.token)
      // 3、跳转到主页
      navigateTo('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={styles.loginPage}>
      {/* 存放背景 */}
      <canvas id="canvas" style={{ display: 'block' }}></canvas>
      {/* 登录盒子 */}
      <div className={styles.loginBox + ' loginbox'}>
        {/* 标题部分 */}
        <div className={styles.title}>
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
  )
})

export default Login
