import { myLocalStorage } from '@/utils/storage'
import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

const Login = lazy(() => import('../views/Login/Login'))
const Main = lazy(() => import('../views/Main/Main'))
const Index = lazy(() => import('../views/Index'))

const lazyLoad = (moduleName: string) => {
  const Module = lazy(() => import(`../views/Main/${moduleName}/${moduleName}`))
  return <Module />
}

// 根据菜单权限添加路由
export const mapMenuToRoutes = (userMenus: any[]) => {
  const addRoutes = []
  const pathToMenuNameMap: any = {}
  for (const menu of userMenus) {
    pathToMenuNameMap[menu.path] = menu.name
    for (const subMenu of menu.children) {
      addRoutes.push({
        path: subMenu.path,
        element: lazyLoad(subMenu.file.replace('View', ''))
      })
      pathToMenuNameMap[subMenu.path] = subMenu.name
    }
  }
  myLocalStorage.setStorage('pathToMenuNameMap', pathToMenuNameMap)
  routes[1].children = [
    {
      path: '/',
      element: <Index />
    },
    ...addRoutes
  ]
  // console.log(routes[1].children)
}

const routes: RouteObject[] = [
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: '/',
        element: <Index />
      }
    ]
  }
]

export default routes
