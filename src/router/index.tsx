import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

const Login = lazy(() => import('../views/Login/Login'))
const Home = lazy(() => import('../views/Home/Home'))
const Index = lazy(() => import('../views/Index'))

const lazyLoad = (moduleName: string) => {
  const Module = lazy(() => import(`../views/${moduleName}`))
  return <Module />
}

// 根据菜单权限添加路由
export const mapMenuToRoutes = (userMenus: any[]) => {
  const addRoutes = []
  for (const menu of userMenus) {
    for (const subMenu of menu.children) {
      addRoutes.push({
        path: subMenu.path,
        element: lazyLoad(subMenu.file.replace('View', ''))
      })
    }
  }
  routes[1].children = [
    {
      path: '/',
      element: <Index />
    },
    ...addRoutes
  ]
  console.log(routes[1].children)
}

const routes: RouteObject[] = [
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: '/',
        element: <Index />
      }
    ]
  }
]

export default routes
