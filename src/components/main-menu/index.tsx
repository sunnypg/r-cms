import React, { useState } from 'react'
import { FileOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'

type MenuItem = Required<MenuProps>['items'][number]

const items: MenuItem[] = [
  {
    label: '系统管理',
    key: '/system',
    icon: <UserOutlined />,
    children: [
      {
        label: '菜单管理',
        key: '/menu'
      },
      {
        label: '用户管理',
        key: '/user'
      },
      {
        label: '角色管理',
        key: '/role'
      },
      {
        label: '权限管理',
        key: '/perm'
      },
      {
        label: '部门管理',
        key: '/dept'
      }
    ]
  },
  {
    label: '商品管理',
    key: '/goods',
    icon: <TeamOutlined />,
    children: [
      {
        label: '商品信息',
        key: '/goodsInfo'
      },
      {
        label: '订单信息',
        key: '/order'
      }
    ]
  },
  {
    label: '操作日志',
    key: '/log',
    icon: <FileOutlined />
  }
]

const Comp: React.FC = () => {
  const navigateTo = useNavigate()
  const currentRoute = useLocation()
  let firstOpenKey: string = ''

  function finKey(obj: { key: string }) {
    return obj.key === currentRoute.pathname
  }

  for (let i = 0; i < items.length; i++) {
    if (
      items[i]!['children'] &&
      items[i]!['children'].length > 0 &&
      items[i]!['children'].find(finKey)
    ) {
      firstOpenKey = items[i]!.key as string
      break
    }
  }
  const [openKeys, setOpenKeys] = useState([firstOpenKey])
  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    setOpenKeys([keys[keys.length - 1]])
  }

  const menuClick = (e: { key: string }) => {
    navigateTo(e.key)
  }
  return (
    <Menu
      theme="dark"
      defaultSelectedKeys={[currentRoute.pathname]}
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      mode="inline"
      items={items}
      onClick={menuClick}
    />
  )
}

export default Comp
