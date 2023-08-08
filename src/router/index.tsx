import React from "react";
import { Navigate } from "react-router-dom";

const Login = React.lazy(() => import("../views/Login/Login"));
const Home = React.lazy(() => import("../views/Home"));
const Menu = React.lazy(() => import("../views/Menu"));
const User = React.lazy(() => import("../views/User"));
const Role = React.lazy(() => import("../views/Role"));
const Dept = React.lazy(() => import("../views/Dept"));
const Goods = React.lazy(() => import("../views/Goods"));
const Log = React.lazy(() => import("../views/Log"));
const Order = React.lazy(() => import("../views/Order"));
const Perms = React.lazy(() => import("../views/Perms"));

const withLoadingComponent = (comp: JSX.Element) => (
  <React.Suspense fallback={<div>Loading...</div>}>{comp}</React.Suspense>
);

const routes = [
  {
    path: "/login",
    element: withLoadingComponent(<Login />),
  },
  {
    path: "/",
    element: withLoadingComponent(<Navigate to="/menu" />),
  },
  {
    path: "/",
    element: withLoadingComponent(<Home />),
    children: [
      {
        path: "/menu",
        element: withLoadingComponent(<Menu />),
      },
      {
        path: "/user",
        element: withLoadingComponent(<User />),
      },
      {
        path: "/role",
        element: withLoadingComponent(<Role />),
      },
      {
        path: "/dept",
        element: withLoadingComponent(<Dept />),
      },
      {
        path: "/goodsInfo",
        element: withLoadingComponent(<Goods />),
      },
      {
        path: "/log",
        element: withLoadingComponent(<Log />),
      },
      {
        path: "/order",
        element: withLoadingComponent(<Order />),
      },
      {
        path: "/perm",
        element: withLoadingComponent(<Perms />),
      },
    ],
  },
];

export default routes;
