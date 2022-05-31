import React, { useEffect, useRef, useState } from 'react'
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
  PlusOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import StudentEditor from './StudentEditor';
import { GradeEnum, GradeEnumList } from '../Enum/GradeEnum';
import { useNavigate, useParams } from 'react-router-dom';
const { Option } = Select;

function GradeTable(props) {
  const [list, setList] = useState([]);
  const [sectionList, setSectionList] = useState([]);
  const [date, setDate] = useState(new Date());
  const [grade, setgrade] = useState(GradeEnum.seven)
  const [section, setSection] = useState('');
  const [loading, setloading] = useState(false)
  const [formShow, setformShow] = useState(false)
  const { gradeLevel } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (!IsEmpty(gradeLevel)) {
      let gradeKey = GradeEnumList.findIndex(e => e.path === gradeLevel)
      if (gradeKey !== -1) {
        let grade = GradeEnumList[gradeKey]
        setgrade(grade.v)
      } else {
        navigate("/dashboard/not-found");
      }
    }
  }, [gradeLevel])

  useEffect(() => {
    let secList = SectionEnumList.filter(e => e.grade === grade);
    if (!IsArrEmpty(secList)) {
      setSectionList(secList)
      setSection(secList[0].v)
      getList()
    }
  }, [grade])

  useEffect(() => {
    getList()
  }, [section, date])
  const getList = () => {
    setloading(true)
    let data = {
      section: section,
      grade: grade,
      date: date
    }
    setList([])
    StudentService.listStudent(data)
      .then(res => {
        setList(res)
        setloading(false)
      })
      .catch(err => {
        console.log(err)
        notification.error({
          message: "Error",
          description: err,
          onClick: () => {
            console.log('Notification Clicked!');
          },
        })
      })
  }
  const dateChange = (date) => {
    console.log(date)
  }
  const afterSave = () => {
    setformShow(false);
    getList()
  }
  return (
    <React.Fragment>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
        <h3 style={{ marginRight: 5, marginBottom: 0 }}>Students</h3>
        <Button icon={<PlusOutlined />} onClick={() => setformShow(true)} type="primary">Add</Button>
      </div>
      <div className='toolbar'>
        <div>
          <Select placeholder="Section" value={section} style={{ width: 220 }} onChange={setSection}>
            {
              sectionList.map((val, key) => {
                return <Option value={val.v} key={key}>{val.t}</Option>
              })
            }
          </Select>
        </div>
        <div>
          <DatePicker className='ant-picker' selected={date} onChange={e => setDate(e)} />
        </div>
      </div>
      <div className='ant-table-content'>
        <table>
          <thead className='ant-table-thead'>
            <tr>
              <th style={{ width: 30 }}>id</th>
              <th>Lastname</th>
              <th>First Name</th>
              <th>Middle Name</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className='ant-table-tbody'>
            {
              IsArrEmpty(list) ? <tr><td colSpan={5} style={{ textAlign: "center" }}>No Data Available</td></tr> :
                list.map((val, key) => {
                  return (
                    <tr key={key}>
                      <td>{key}</td>
                      <td>{val.lastName}</td>
                      <td>{val.firstName}</td>
                      <td>{val.middleName}</td>
                      <td>{val.present ? "Present" : "Absent"}</td>
                      <td>
                        <Button icon={<EditOutlined />} onClick={() => setformShow(true)} type="info"></Button>
                        <Button icon={<DeleteOutlined />} onClick={() => setformShow(true)} style={{ marginLeft: 5 }} type="danger"></Button >
                      </td>
                    </tr>
                  )
                })
            }
          </tbody>
        </table>
      </div>
      <Drawer
        title="Create a new student"
        width={720}
        visible={formShow}
        bodyStyle={{ paddingBottom: 80 }}
        onClose={() => setformShow(false)}
        extra={
          <Space>
            <Button onClick={() => setformShow(false)}>Cancel</Button>
          </Space>
        }
      >
        <StudentEditor afterSave={afterSave} />
      </Drawer>
    </React.Fragment>
  )
}

export default GradeTable