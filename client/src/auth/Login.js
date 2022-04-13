import React, { useContext } from 'react'
import { Form, Input, Button, Checkbox, notification } from "antd";
import styles from "../asset/css/Login.module.css"
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../service/AuthService';
import UserContext from '../contexts/UserContext';
function Login() {
    const navigate = useNavigate();
    const userContext = useContext(UserContext)
    const onFinish = (values) => {
        AuthService.Login(values.username, values.password)
            .then(res => {
                userContext.setLoginData(res);
                navigate("/dashboard")
            })
            .catch(ex => {
                notification.error({
                    message: "Error Login!",
                    description: ex.msg,
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                })
            })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className={styles['login-container']}>
            <Form
                name="basic"
                initialValues={{
                    remember: true,
                }}
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                className={styles['domp-login-form']}
            >
                <h2>DOMP Login</h2>
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input placeholder='Username' />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password placeholder='Password' />
                </Form.Item>
                {/* <Form.Item
                    name="remember"
                    valuePropName="checked">
                    <Checkbox>Remember me</Checkbox>
                </Form.Item> */}
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Login