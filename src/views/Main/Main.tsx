import React, { memo, useState, ReactNode, Suspense, useEffect } from 'react'
import { Layout, theme } from 'antd'
import { Outlet, useNavigate } from 'react-router-dom'
import MainMenu from '@/components/main-menu/MainMenu'
import PageTabs from '@/base-ui/page-tabs/PageTabs'
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
import { MainWrapper } from './style'
import MainHeader from '@/components/main-header'
import logo from '@/assets/image/logo.svg'
import { myLocalStorage } from '@/utils/storage'

interface IProps {
  children?: ReactNode
}

const Home: React.FC<IProps> = memo(() => {
  const dispatch = useAppDispatch()
  const navigateTo = useNavigate()

  useEffect(() => {
    dispatch(GetMenuByMenu())
    dispatch(GetMenuByPerm())
    dispatch(GetAllDept())
    dispatch(GetAllRole())
    dispatch(GetAllType())
    dispatch(GetAllUser())
    dispatch(GetPermTree())
    dispatch(GetRoleLevel())
  }, [])

  // 菜单折叠
  const [collapsed, setCollapsed] = useState(false)
  // tabs标签状态
  const [activeKey, setActiveKey] = useState(myLocalStorage.getStorage('activeKey') || '')
  // tabs标签数据
  const [items, setItems] = useState(myLocalStorage.getStorage('tabsItems') || [])
  // 面包屑数据
  const [breadcrumbInfo, setBreadcrumbInfo] = useState(myLocalStorage.getStorage('keyPath') || [])
  // 菜单状态
  const [openKeys, setOpenKeys] = useState([''])

  const menuClick = ({ key, keyPath }: { key: string; keyPath: string[] }) => {
    const pathToMenuNameMap = myLocalStorage.getStorage('pathToMenuNameMap')
    const menuItems = document.getElementsByClassName('ant-menu-item')

    for (const menuItem of menuItems) {
      menuItem.classList.remove('ant-menu-item-selected')
      if (menuItem.innerText === pathToMenuNameMap[key]) {
        menuItem.classList.add('ant-menu-item-selected')
      }
    }

    navigateTo(key)
    setBreadcrumbInfo(keyPath)
    myLocalStorage.setStorage('keyPath', keyPath)
    if (!items.find((pane: any) => pane.key === key)) {
      const newItems = [...items, { label: pathToMenuNameMap[key], children: keyPath, key }]
      setItems(newItems)
      myLocalStorage.setStorage('tabsItems', newItems)
    }
    setActiveKey(key)
    myLocalStorage.setStorage('activeKey', key)
  }

  const {
    token: { colorBgContainer }
  } = theme.useToken()

  return (
    <MainWrapper>
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
              color: 'white',
              cursor: 'pointer'
            }}
            onClick={() => navigateTo('/')}
          >
            <img style={{ width: '30px' }} src={logo} alt="" />
            {!collapsed && <h2>客户关系管理系统</h2>}
          </div>
          <MainMenu
            setBreadcrumbInfo={setBreadcrumbInfo}
            setActiveKey={setActiveKey}
            items={items}
            setItems={setItems}
            openKeys={openKeys}
            setOpenKeys={setOpenKeys}
            menuClick={menuClick}
          />
        </Sider>
        {/* 右边主体 */}
        <Layout>
          {/* 右边头部 */}
          <MainHeader
            setCollapsed={(isCollapsed) => setCollapsed(isCollapsed)}
            collapsed={collapsed}
            breadcrumbInfo={breadcrumbInfo}
          ></MainHeader>
          {/* tabs标签 */}
          <PageTabs
            activeKey={activeKey}
            setActiveKey={setActiveKey}
            items={items}
            setItems={setItems}
            setBreadcrumbInfo={setBreadcrumbInfo}
            menuClick={menuClick}
          ></PageTabs>
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
    </MainWrapper>
  )
})

export default Home
