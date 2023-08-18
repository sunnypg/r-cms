import { memo, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { UserOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import { appShallowEqual, useAppSelector } from '@/store'
import { myLocalStorage } from '@/utils/storage'

interface IProps {
  children?: ReactNode
  setBreadcrumbInfo: any
}

type MenuItem = Required<MenuProps>['items'][number]

const Comp: FC<IProps> = memo((props) => {
  const navigateTo = useNavigate()
  const currentRoute = useLocation()
  let firstOpenKey: string = ''

  const { initInfo } = useAppSelector(
    (state) => ({
      initInfo: state.login.initInfo
    }),
    appShallowEqual
  )
  const items: MenuItem[] = []
  for (const menu of initInfo.menu) {
    const children = []
    if (menu.children) {
      for (const subMenu of menu.children) {
        children.push({
          label: subMenu.name,
          key: subMenu.path
        })
      }
    }
    items.push({
      label: menu.name,
      key: menu.path,
      icon: <UserOutlined />,
      children
    })
  }

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

  const menuClick = ({ key, keyPath }: { key: string; keyPath: string[] }) => {
    navigateTo(key)
    props.setBreadcrumbInfo(keyPath)
    myLocalStorage.setStorage('keyPath', keyPath)
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
})

export default Comp
