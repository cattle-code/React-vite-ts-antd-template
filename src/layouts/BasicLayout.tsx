import React from "react"
import { Button, Layout, Menu, Spin } from 'antd'
import { Link } from "react-router-dom"

import MyHeader from "../components/Header"
import { layoutRouteList } from "../router/utils"

const { Header, Sider, Content } = Layout

import useStore from "../store"


const BasicLayout: React.FC = () => {

    const loading = useStore((state) => state.loading)

    const routes = (layoutRouteList[1].children || []).filter(
        (n) => !['/*', '/error'].includes(n.path)
    )

    console.log(routes,'routes')
    return (
        <Layout>
            <Sider>
                <Button size="large" style={{ width: '100%' }}>
                    Vite React Typescript
                </Button>
                <Menu theme="dark" mode="inline">
                    {
                        routes.map((item) => {
                            <Menu.Item key={item.path}>
                                <Link to={item.path}>{item.meta.title}</Link>
                            </Menu.Item>
                        })
                    }
                </Menu>
            </Sider>
            <Layout>
                <Header style={{ height: '60' }}>
                    <MyHeader />
                </Header>
                
                <Content style={{ height: 'calc(100vh - 60px)' }}>
                    <Spin spinning={loading}>
                        {routes.find(n => n.path === location.pathname)?.component}
                    </Spin>
                </Content>
            </Layout>
        </Layout>
    )
}

export default BasicLayout