import React, { useEffect, useState } from 'react'
import {
    Table,
    Button,
    Space,
    Select,
    notification,
    Drawer,
    Form,
    Col,
    Row,
    Input,
} from 'antd';
import { } from "moment"
import { StudentService } from '../service/StudentService';
import { SectionEnumList } from '../Enum/SectionEnum';
import DatePicker from "react-datepicker";
import { IsArrEmpty, IsEmpty } from '../utility/ToolFtc';
import {
    EditOutlined,
    DeleteOutlined,
    PlusOutlined
} from '@ant-design/icons';
import StudentEditor from './StudentEditor';
import { GradeEnum, GradeEnumList } from '../Enum/GradeEnum';
import { useNavigate, useParams } from 'react-router-dom';
import AccountEditor from './AccountEditor';
import { AccountService } from "../service/AccountService";
function AccountList() {
    const [formShow, setformShow] = useState(false)
    const [list, setlist] = useState([])
    useEffect(() => {
        getList()
    }, [])
    const afterSave = () => {
        getList()
        setformShow(false)
    }
    const getList = () => {
        AccountService.getAccountList()
            .then(res => {
                setlist(res)
                console.log(res)
            })
    }
    return (
        <React.Fragment>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
                <h3 style={{ marginRight: 5, marginBottom: 0 }}>Account List</h3>
                <Button icon={<PlusOutlined />} onClick={() => setformShow(true)} type="primary">Add </Button>
            </div>
            <div className='ant-table-content'>
                <table>
                    <thead className='ant-table-thead'>
                        <tr>
                            <th style={{ width: 30 }}>id</th>
                            <th>Username</th>
                            <th>Role</th>
                            <th>Password</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className='ant-table-tbody'>
                        {
                            IsArrEmpty(list) ? <tr><td colSpan={5} style={{ textAlign: "center" }}>No Data Available</td></tr> :
                                list.map((val, key) => {
                                    return (
                                        <tr key={key}>
                                            <td>{val.id}</td>
                                            <td>{val.userName}</td>
                                            <td>{val.role}</td>
                                            <td>{val.password}</td>
                                            <td>
                                                <Button icon={<EditOutlined />} onClick={() => setformShow(true)} type="info"></Button>
                                                <Button icon={<DeleteOutlined />} onClick={() => setformShow(true)} style={{ marginLeft: 5 }} type="danger"></Button >
                                            </td>

                                            {/* <td>{val.present ? "Present" : "Absent"}</td> */}
                                        </tr>
                                    )
                                })
                        }
                    </tbody>
                </table>
            </div>
            <Drawer
                title="Create a new account"
                width={400}
                visible={formShow}
                bodyStyle={{ paddingBottom: 80 }}
                onClose={() => setformShow(false)}
                extra={
                    <Space>
                        <Space>
                            <Button onClick={() => setformShow(false)}>Cancel</Button>
                        </Space>
                    </Space>
                }
            >
                <AccountEditor afterSave={afterSave} />
            </Drawer>
        </React.Fragment>
    )
}

export default AccountList