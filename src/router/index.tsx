import React from 'react'

const Page404 = React.lazy(()=>import('../pages/404'))
const Home = React.lazy(()=>import("../pages/Home"))
const Login = React.lazy(()=>import("../pages/User/Login"))
const Register = React.lazy(()=>import("../pages/User/Register"))

export interface  IRouteBase {
    path: string;
    component?: any;
    redirect?: string;
    meta: IRouteMeta;
    // 权限校验
    auth?: boolean
}

export interface IRouteMeta {
    title: string,
    icon?: string
}

export interface IRoute  extends IRouteBase{
    children?: IRoute[]
}

const  routes: IRoute[]=  [
    {
        path: '/user',
        component: React.lazy(()=>import("../layouts/UserLayout")),
        meta: {
            title: '用户路由'
        },
        redirect: '/user/login',
        children:[]
    },
    {
        path: '/',
        component: React.lazy(()=>import('../layouts/BasicLayout')),
        meta: {
            title: "系统路由"
        },
        redirect: '/home',
        children:[
            {
                path: '/home',
                meta: {
                    title: '首页',
                    icon: 'home'
                },
                component: <Home/>
            },
            {
                path: '/login',
                meta: {
                    title: '登陆'
                },
                component: <Login />
            },
            {
                path: '/register',
                meta:{
                    title: "注册"
                },
                component: <Register />
            },
            {
                path: '/error',
                meta: {
                    title: '页面不存在'
                },
                component: <Page404 />
            },
            {
                path: '/*',
                meta: {
                    title: '错误不存在'
                },
                redirect: '/error/404'
            }
        ]
    },
    
]

export default routes
