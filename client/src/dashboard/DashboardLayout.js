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
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { GradeEnum, GradeEnumList } from '../Enum/GradeEnum';
import { IsEmpty, IsObjEmpty } from '../utility/ToolFtc';
import UserContext from '../contexts/UserContext';

const { Header, Sider, Content } = Layout;
function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const [selectedMenu, setMenu] = useState('0');
  const userContext = useContext(UserContext);
  const [grade, setgrade] = useState(GradeEnum.seven)
  const navigate = useNavigate();
  const { gradeLevel } = useParams();
  useEffect(() => {
    var gradeKey = IsEmpty(gradeLevel) ? 0 : GradeEnumList.findIndex(e => e.path === gradeLevel)
    var grade = GradeEnumList[gradeKey]
    setgrade(grade.v)
    setMenu(gradeKey.toString())
  }, [gradeLevel, userContext.user])

  const onLogout = () => {
    userContext.removeLoginData();
  }
  const navigateTab = (val) => {
    navigate("/dashboard/" + val.path)
  }
  return (
    <React.Fragment>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed} theme="light">
          <div className="logo" ><span>Attendance Checker</span></div>
          <Menu theme="light" mode="inline" selectedKeys={selectedMenu}>
            {
              GradeEnumList.map((val, key) => {
                return <Menu.Item key={key} icon={<UserOutlined />} onClick={() => { navigateTab(val) }}>
                  {val.t}
                </Menu.Item>
              })
            }
            <Menu.Item icon={<SettingOutlined />} >
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
            <GradeTable grade={grade} />
          </Content>
        </Layout>
      </Layout >
    </React.Fragment>
  )
}

export default DashboardLayout