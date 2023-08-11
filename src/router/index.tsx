import { lazy } from 'react'
import { Navigate, RouteObject } from 'react-router-dom'

const Login = lazy(() => import('../views/Login/Login'))
const Home = lazy(() => import('../views/Home'))
const Menu = lazy(() => import('../views/Menu'))
const User = lazy(() => import('../views/User'))
const Role = lazy(() => import('../views/Role'))
const Dept = lazy(() => import('../views/Dept'))
const Goods = lazy(() => import('../views/Goods'))
const Log = lazy(() => import('../views/Log'))
const Order = lazy(() => import('../views/Order'))
const Perms = lazy(() => import('../views/Perms'))

const routes: RouteObject[] = [
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/',
    element: <Navigate to="/menu" />
  },
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: '/menu',
        element: <Menu />
      },
      {
        path: '/user',
        element: <User />
      },
      {
        path: '/role',
        element: <Role />
      },
      {
        path: '/dept',
        element: <Dept />
      },
      {
        path: '/goodsInfo',
        element: <Goods />
      },
      {
        path: '/log',
        element: <Log />
      },
      {
        path: '/order',
        element: <Order />
      },
      {
        path: '/perm',
        element: <Perms />
      }
    ]
  }
]

export default routes
