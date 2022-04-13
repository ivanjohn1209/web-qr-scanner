import React, { useState } from 'react'
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
} from 'antd';
import { GenderEnum } from '../Enum/GenderEnum';
import { GradeEnumList } from '../Enum/GradeEnum';
import { GetSectionByGrade } from '../Enum/SectionEnum';
import { QrReader } from 'react-qr-reader';
import { StudentService } from '../service/StudentService';
import StudentDM from '../DataModel/StudentDM';
import { IsEmpty } from '../utility/ToolFtc';
import { useNavigate } from 'react-router-dom';

const RegisterStudent = () => {
  const viewType = {
    form: 1,
    scan: 2
  }
  const navigate = useNavigate()
  const [view, setView] = useState(viewType.form);
  const [studentData, setStudentData] = useState(new StudentDM());
  const [sections, setSection] = useState([]);

  const onFormLayoutChange = (val) => {
    var data = studentData;
    var keyNames = Object.keys(val);
    data[keyNames[0]] = val[keyNames[0]];
    if(keyNames[0] === "grade")
    {
      setSection(GetSectionByGrade(data.grade));
      data.section = "";
    }
    setStudentData(data)
  };

  const next = () => {
    setView(viewType.scan);
  }

  const onFinish = () => {
    StudentService.registerNewStudent(studentData)
    .then(res => {
      console.log(res);
      navigate("/")
    })
  }
  return (
    <div className='container'>
      <h3>Register New Student QR</h3>
      {
        view === viewType.form ? (
          <Form
          labelCol={{
            span: 12,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="vertical"
          initialValues={studentData}
          onValuesChange={onFormLayoutChange}
        >
          <Form.Item label="Last Name" name="lastName">
            <Input placeholder='Last Name'/>
          </Form.Item>
          <Form.Item label="Middle Name" name="middleName">
            <Input placeholder='Middle Name'/>
          </Form.Item>
          <Form.Item label="First Name" name="firstName">
            <Input placeholder='First Name'/>
          </Form.Item>
          <Form.Item label="Grade" name="grade">
            <Select>
              {
                GradeEnumList.map((val, key) => {
                  return  <Select.Option value={val.v} key={key}>{val.t}</Select.Option>;
                })
              }
            </Select>
          </Form.Item>
          <Form.Item label="Section" name="section">
            <Select>
              {
               sections.map((val, key) => {
                  return  <Select.Option value={val.v} key={key}>{val.t}</Select.Option>;
                })
              }
            </Select>
          </Form.Item>
          
          <Form.Item label="Gender" name="gender" >
            <Radio.Group value={studentData.gender}>
              <Radio.Button value={GenderEnum.male}>Male</Radio.Button>
              <Radio.Button value={GenderEnum.male}>Female</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="LRN(Learner Reference Number)" name="lrn">
            <Input placeholder='LRN(Learner Reference Number)' />
          </Form.Item>
          <Button type='primary' onClick={() => navigate("/")}>Back</Button>
            <Button type='primary' onClick={next} style={{marginLeft: 10}}>Next</Button>
        </Form>
        ) : ( 
          <div>
          <div style={{ height:500, width:500}}>
          <QrReader
             onResult={(result, error) => {
               if (!!result) {
                setStudentData({
                  ...studentData,
                  qrId: result?.text
                })
               }
               if (!!error) {
                 console.info(error);
               }
             }}
             style={{ width: '100%' }}
           />
          </div>
          <h4>Qr #: {studentData.qrId}</h4>
          <Button type='primary' onClick={() => setView(viewType.form)}>Back</Button>
          <Button type='primary' style={{marginLeft: 10}} >Start Scan</Button>
          <Button type='primary' style={{marginLeft: 10}} onClick={onFinish} disabled={IsEmpty(studentData.qrId)}>On Finish</Button>
          </div>
        )
      }
    </div>
  );
};


export default RegisterStudent;