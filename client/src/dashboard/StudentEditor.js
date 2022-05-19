import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
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
import { GenderEnum } from '../Enum/GenderEnum';
import { GradeEnumList } from '../Enum/GradeEnum';
import { GetSectionByGrade } from '../Enum/SectionEnum';
import StudentDM from '../DataModel/StudentDM';
import { StudentService } from '../service/StudentService';
import { isFunction } from '../utility/ToolFtc';

const { Option } = Select;

function StudentEditor(props) {
    const [sections, setSection] = useState([]);
    const [studentData, setStudentData] = useState(new StudentDM());
    const formRef = useRef(null);
    const onFormLayoutChange = (val) => {
        var data = studentData;
        var keyNames = Object.keys(val);
        data[keyNames[0]] = val[keyNames[0]];
        if (keyNames[0] === "grade") {
            setSection(GetSectionByGrade(val.grade));
            data.section = "";
        }
        setStudentData(data)
    };
    const onSave = () => {
        // console.log(studentData)
        StudentService.registerNewStudent(studentData)
            .then(res => {
                if (isFunction(props.afterSave))
                    props.afterSave()
            })
    }
    return (
        <Form layout="vertical"
            initialValues={studentData}
            hideRequiredMark
            onValuesChange={onFormLayoutChange}
            ref={formRef}
            onFinish={() => onSave()}
        >
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="firstName"
                        label="First Name"
                        rules={[{ required: true, message: 'Please enter first name' }]}
                    >
                        <Input placeholder="Please enter user first name" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="lastName"
                        label="Last Name"
                        rules={[{ required: true, message: 'Please enter last name' }]}
                    >
                        <Input placeholder="Please enter user last name" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="middleName"
                        label="Middle Name"
                        rules={[{ required: true, message: 'Please enter middle name' }]}
                    >
                        <Input placeholder="Please enter user middle name" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="gender"
                        label="Gender"
                        rules={[{ required: true, message: 'Please choose gender' }]}
                    >
                        <Select placeholder="Please choose the gender">
                            <Option value={GenderEnum.male}>Male</Option>
                            <Option value={GenderEnum.female}>Female</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="grade"
                        label="Grade"
                        rules={[{ required: true, message: 'Please choose a grade' }]}
                    >
                        <Select placeholder="Please choose a grade">
                            {
                                GradeEnumList.map((val, key) => {
                                    return <Select.Option value={val.v} key={key}>{val.t}</Select.Option>;
                                })
                            }
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="section"
                        label="Section"
                        rules={[{ required: true, message: 'Please choose a section' }]}
                    >
                        <Select placeholder="Please choose a section">
                            {
                                sections.map((val, key) => {
                                    return <Select.Option value={val.v} key={key}>{val.t}</Select.Option>;
                                })
                            }
                        </Select>
                    </Form.Item>
                </Col>

            </Row>
            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item
                        name="lrn"
                        label="LRN"
                        rules={[{ required: true, message: 'Please enter LRN' }]}
                    >
                        <Input placeholder="Please enter LRN" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item
                        name="qrId"
                        label="QR ID"
                        rules={[{ required: true, message: 'Please enter QR ID' }]}
                    >
                        <Input placeholder="Please enter QR ID" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item>
                        <Button type='primary' htmlType='submit'>Create</Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    )
}

export default StudentEditor;