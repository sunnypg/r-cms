import { memo, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import { UserOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { useLocation } from 'react-router-dom'
import { appShallowEqual, useAppSelector } from '@/store'
import { myLocalStorage } from '@/utils/storage'

interface IProps {
  children?: ReactNode
  setBreadcrumbInfo: any
  setActiveKey: any
  items: any
  setItems: any
  openKeys: string[]
  setOpenKeys: any
  menuClick: any
}

type MenuItem = Required<MenuProps>['items'][number]

const Comp: FC<IProps> = memo((props) => {
  const currentRoute = useLocation()

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

  let firstOpenKey: string = ''
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
  useEffect(() => {
    props.setOpenKeys([firstOpenKey])
  }, [firstOpenKey])

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    props.setOpenKeys([keys[keys.length - 1]])

    // 正确的菜单项高亮
    const pathToMenuNameMap = myLocalStorage.getStorage('pathToMenuNameMap')
    const menuItems = document.getElementsByClassName('ant-menu-item')
    for (const menuItem of menuItems) {
      menuItem.classList.remove('ant-menu-item-selected')
      if (menuItem.innerText === pathToMenuNameMap[currentRoute.pathname]) {
        menuItem.classList.add('ant-menu-item-selected')
      }
    }
  }

  useEffect(() => {}, [])

  return (
    <Menu
      theme="dark"
      defaultSelectedKeys={[currentRoute.pathname]}
      openKeys={props.openKeys}
      onOpenChange={onOpenChange}
      mode="inline"
      items={items}
      onClick={props.menuClick}
    ></Menu>
  )
})

export default Comp
