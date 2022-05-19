import React, { useContext, useEffect, useState } from 'react';
// import './index.css';
import { Button, Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  SettingOutlined
} from '@ant-design/icons';
import GradeTable from './GradeTable';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { GradeEnum, GradeEnumList } from '../Enum/GradeEnum';
import { IsEmpty, IsObjEmpty } from '../utility/ToolFtc';
import UserContext from '../contexts/UserContext';
const { SubMenu } = Menu;
const { Header, Sider, Content } = Layout;
function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const userContext = useContext(UserContext);
  const [grade, setgrade] = useState(GradeEnum.seven)
  const navigate = useNavigate();
  useEffect(() => {
    // if (!IsEmpty(gradeLevel)) {
    //   var gradeKey = GradeEnumList.findIndex(e => e.path === gradeLevel)
    //   var grade = GradeEnumList[gradeKey]
    //   setgrade(grade.v)
    // }
  }, [])

  const onLogout = () => {
    userContext.removeLoginData();
  }
  const navigateTab = (val) => {
    navigate("/dashboard/" + val.path)
  }
  return (
    <React.Fragment>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed} breakpoint={"lg"}
          collapsedWidth={0} theme="light">
          <div className="logo" ><span>Attendance Checker</span></div>
          <Menu theme="light" mode="inline">
            <SubMenu key="sub1" icon={<UserOutlined />} title="Grade Level">
              {
                GradeEnumList.map((val, key) => {
                  return <Menu.Item key={key} icon={<UserOutlined />} onClick={() => { navigateTab(val) }}>
                    {val.t}
                  </Menu.Item>
                })
              }
            </SubMenu>
            <Menu.Item icon={<SettingOutlined />} onClick={() => { navigate("/dashboard/settings") }}>
              Settings
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0, alignItems: "center", display: "flex", justifyContent: "space-between", padding: "0 24px" }}>
            <MenuUnfoldOutlined className='trigger' onClick={() => setCollapsed(!collapsed)} />
            <Button type="primary" onClick={onLogout} style={{ float: "right" }}>Logout</Button>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            <Outlet />
            {/* <GradeTable grade={grade} /> */}
          </Content>
        </Layout>
      </Layout >
    </React.Fragment>
  )
}

export default DashboardLayout