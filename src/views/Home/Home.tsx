import React, { memo, useState, ReactNode, Suspense, useEffect } from 'react'
import { Layout, theme } from 'antd'
import { Outlet } from 'react-router-dom'
import MainMenu from '@/components/main-menu'
const { Content, Footer, Sider } = Layout
import { useAppDispatch } from '@/store'
import {
  GetAllDept,
  GetAllRole,
  GetAllType,
  GetAllUser,
  GetMenuByMenu,
  GetMenuByPerm,
  GetPermTree,
  GetRoleLevel
} from '@/store/modules/home'
import { HomeWrapper } from './style'
import MainHeader from '@/components/main-header'
import { LocalStorageAction } from '@/store/modules/login'
import logo from '@/assets/image/logo.svg'

interface IProps {
  children?: ReactNode
}

const Home: React.FC<IProps> = memo(() => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(LocalStorageAction())
    dispatch(GetMenuByMenu())
    dispatch(GetMenuByPerm())
    dispatch(GetAllDept())
    dispatch(GetAllRole())
    dispatch(GetAllType())
    dispatch(GetAllUser())
    dispatch(GetPermTree())
    dispatch(GetRoleLevel())
  }, [])

  const [collapsed, setCollapsed] = useState(false)

  const {
    token: { colorBgContainer }
  } = theme.useToken()

  return (
    <HomeWrapper>
      <Layout style={{ minHeight: '100vh' }}>
        {/* 左边侧边栏 */}
        <Sider collapsed={collapsed}>
          <div
            className="logo"
            style={{
              height: '32px',
              margin: '16px',
              lineHeight: '32px',
              textAlign: 'center',
              color: 'white'
            }}
          >
            <img style={{ width: '30px' }} src={logo} alt="" />
            {!collapsed && <h2>客户关系管理系统</h2>}
          </div>

          <MainMenu />
        </Sider>
        {/* 右边主体 */}
        <Layout>
          {/* 右边头部 */}
          <MainHeader
            setCollapsed={(isCollapsed) => setCollapsed(isCollapsed)}
            collapsed={collapsed}
          ></MainHeader>
          {/* 右边内容 */}
          <Content style={{ margin: '16px 16px 0', background: colorBgContainer }}>
            <Suspense fallback={<div>Loading...</div>}>
              <Outlet />
            </Suspense>
          </Content>
          {/* 右边底部 */}
          <Footer style={{ textAlign: 'center', padding: 0, lineHeight: '48px' }}>
            Ant Design ©2023 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </HomeWrapper>
  )
})

export default Home
