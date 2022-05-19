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
    PlusOutlined
} from '@ant-design/icons';
import StudentEditor from './StudentEditor';
import { GradeEnum, GradeEnumList } from '../Enum/GradeEnum';
import { useNavigate, useParams } from 'react-router-dom';
import AccountEditor from './AccountEditor';

function AccountList() {
    const [formShow, setformShow] = useState(false)

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
                            <th>Password</th>
                        </tr>
                    </thead>
                    <tbody className='ant-table-tbody'>
                        {/* {
                            IsArrEmpty(list) ? <tr><td colSpan={5} style={{ textAlign: "center" }}>No Data Available</td></tr> :
                                list.map((val, key) => {
                                    return (
                                        <tr key={key}>
                                            <td>{key}</td>
                                            <td>{val.lastName}</td>
                                            <td>{val.firstName}</td>
                                            <td>{val.middleName}</td>
                                            <td>{val.present ? "Present" : "Absent"}</td>
                                        </tr>
                                    )
                                })
                        } */}
                    </tbody>
                </table>
            </div>
            <Drawer
                title="Create a new account"
                width={720}
                visible={formShow}
                bodyStyle={{ paddingBottom: 80 }}
                onClose={() => setformShow(false)}
                extra={
                    <Space>
                        <Button onClick={() => setformShow(false)} type="primary">
                            Create
                        </Button>
                    </Space>
                }
            >
                <AccountEditor />
            </Drawer>
        </React.Fragment>
    )
}

export default AccountList