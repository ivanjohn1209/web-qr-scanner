import { Card, Col, Row } from 'antd'
import React from 'react'
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    SettingOutlined,
    SolutionOutlined,
    BarsOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

function Settings() {
    const navigate = useNavigate();
    const settingsList = [
        {
            name: "Account Settings",
            child: [
                {
                    name: "Account List",
                    icon: <SolutionOutlined />,
                    path: "/dashboard/accountlist",
                    desc: "To manage the accounts, edit and create a new account."
                }
            ]
        }
    ]
    return (
        <div className='settings-container'>
            <h1 style={{ fontSize: 20 }}><SettingOutlined /> Settings</h1>
            {
                settingsList.map((val, key) => {
                    return <Row gutter={24} key={key}>
                        <Col span={24}>
                            <h4 style={{ fontSize: 18 }}>{val.name}</h4>
                        </Col>
                        {
                            val.child.map((val1, key1) => {
                                return <Col span={8} style={{ marginBottom: 24, }}>
                                    <Card style={{ cursor: "pointer" }} onClick={() => { navigate(val1.path) }}>
                                        <h5 style={{ fontSize: 14 }}>{val1.icon} {val1.name}</h5>
                                        <p>{val1.desc}</p>
                                    </Card>
                                </Col>
                            })
                        }
                    </Row>
                })
            }
        </div>
    )
}

export default Settings