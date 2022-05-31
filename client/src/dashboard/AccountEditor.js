import React, { useState } from 'react'
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
import { RoleListEnum } from '../Enum/RoleEnum';
import AccountDM from '../DataModel/AccountDM';
import { AccountService } from '../service/AccountService';
import { isFunction } from '../utility/ToolFtc';
function AccountEditor(props) {
    const [accountData, setAccountData] = useState(new AccountDM());

    const onFormLayoutChange = (val) => {
        var data = accountData;
        var keyNames = Object.keys(val);
        data[keyNames[0]] = val[keyNames[0]];
        setAccountData(data)
    };
    const onSave = () => {
        AccountService.createAccount(accountData)
            .then(res => {
                if (isFunction(props.afterSave))
                    props.afterSave()
            })
    }


    return (
        <Form layout="vertical"
            initialValues={accountData}
            hideRequiredMark
            onValuesChange={onFormLayoutChange}
            // ref={formRef}
            onFinish={() => onSave()}
        >
            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item
                        name="username"
                        label="Username"
                        rules={[{ required: true, message: 'Please enter username' }]}
                    >
                        <Input placeholder="Please enter user username" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item
                        name="role"
                        label="Role"
                        rules={[{ required: true, message: 'Please enter first name' }]}
                    >
                        {/* <Input placeholder="Please enter user first name" /> */}
                        <Select placeholder="Please choose a section">
                            {
                                RoleListEnum.map((val, key) => {
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
                        name="password"
                        label="Password"
                        rules={[{ required: true, message: 'Please enter Password' }]}
                    >
                        <Input placeholder="Please enter user Password" type={'password'} />
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

export default AccountEditor