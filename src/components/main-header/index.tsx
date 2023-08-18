import { memo, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { Layout, Breadcrumb, Button, MenuProps, Dropdown, Avatar, theme } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons'
import { HeaderWrapper } from './style'
import { logoutRequest } from '@/store/modules/login'
import { appShallowEqual, useAppDispatch, useAppSelector } from '@/store'
import { useNavigate } from 'react-router-dom'
import Personal from './personal/personal'
import Password from './password/password'
const { Header } = Layout

interface IProps {
  children?: ReactNode
  collapsed: boolean
  setCollapsed: (a: boolean) => void
  breadcrumbInfo: any[]
}

const MainHeader: FC<IProps> = memo((props) => {
  const [isPersonalModal, setIsPersonal] = useState(false)
  const [isPasswordModel, setIsPassword] = useState(false)
  const navigateTo = useNavigate()
  const dispatch = useAppDispatch()
  const {
    token: { colorBgContainer }
  } = theme.useToken()

  const { userInfo } = useAppSelector(
    (state) => ({
      userInfo: state.login.userInfo
    }),
    appShallowEqual
  )

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Button
          type="text"
          onClick={() => dispatch(logoutRequest({ goToLogin: () => navigateTo('/login') }))}
        >
          退出系统
        </Button>
      )
    },
    {
      key: '2',
      label: (
        <Button type="text" onClick={() => setIsPersonal(true)}>
          个人信息
        </Button>
      )
    },
    {
      key: '3',
      label: (
        <Button type="text" onClick={() => setIsPassword(true)}>
          修改密码
        </Button>
      )
    }
  ]
  return (
    <HeaderWrapper>
      <Header style={{ background: colorBgContainer }}>
        <div className="header-left">
          <Button
            type="text"
            icon={props.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => props.setCollapsed(!props.collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64
            }}
          />
          <Breadcrumb
            items={[
              { title: props.breadcrumbInfo[1]?.replace('/', '') },
              { title: props.breadcrumbInfo[0]?.replace('/', '') }
            ]}
            style={{ lineHeight: '64px' }}
          ></Breadcrumb>
        </div>
        <Dropdown menu={{ items }} placement="bottom" arrow>
          <div style={{ cursor: 'pointer' }}>
            <Avatar
              size={36}
              icon={<UserOutlined />}
              src="https://upload.jianshu.io/users/upload_avatars/1102036/c3628b478f06.jpeg"
            />
            <span style={{ marginLeft: '5px' }}>{userInfo?.name}</span>
          </div>
        </Dropdown>
        <Personal
          isModalOpen={isPersonalModal}
          setIsModalOpen={setIsPersonal}
          userInfo={userInfo}
        />
        <Password isModalOpen={isPasswordModel} setIsModalOpen={setIsPassword} />
      </Header>
    </HeaderWrapper>
  )
})

export default MainHeader
