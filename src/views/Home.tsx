import React, { useState } from "react";
import { Breadcrumb, Layout, theme } from "antd";
import { Outlet } from "react-router-dom";
import MainMenu from "@/components/main-menu";
const { Header, Content, Footer, Sider } = Layout;

const View: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* 左边侧边栏 */}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          className="logo"
          style={{
            height: "32px",
            margin: "16px",
            lineHeight: "32px",
            textAlign: "center",
            color: "white",
            background: "rgba(255, 255, 255,0.3)",
          }}
        >
          合数科技
        </div>
        <MainMenu />
      </Sider>
      {/* 右边主体 */}
      <Layout>
        {/* 右边头部 */}
        <Header style={{ paddingLeft: "16px", background: colorBgContainer }}>
          <Breadcrumb
            items={[{ title: "User" }, { title: "Bill" }]}
            style={{ lineHeight: "64px" }}
          ></Breadcrumb>
        </Header>
        {/* 右边内容 */}
        <Content
          style={{ margin: "16px 16px 0", background: colorBgContainer }}
        >
          <Outlet />
        </Content>
        {/* 右边底部 */}
        <Footer style={{ textAlign: "center", padding: 0, lineHeight: "48px" }}>
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default View;
