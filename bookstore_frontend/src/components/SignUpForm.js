import React from 'react';
import {Form, Icon, Input, Button, Checkbox, message} from 'antd';
import 'antd/dist/antd.css';
import '../css/login.css'
import * as userService from '../services/userService'

class SignUpForm extends React.Component {

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values)
            if (!err) {
                console.log('Received values of form: ', values);
                userService.addUser(values);
            }
        });
    };

    confirmName = (rule, value) => {
        console.log(value);
        const callback = (data) => {
            console.log(data)
            if (data.status === -1)
                message.error("The username \" " + value +  " \" has been registered!") ;
        }

        userService.checkName(value, callback);
        return Promise.resolve();
    }

    confirmPW = (rule, value) => {
        let pw = this.props.form.getFieldValue("password");
        console.log(value)
        if (value === pw) {
            return Promise.resolve();
        }
        return Promise.reject('The two passwords that you entered do not match!');
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input your username!'
                            },
                            {
                                validator: this.confirmName
                            }
                        ],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Username"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('nickname', {
                        rules: [{ required: true, message: 'Please input your nickname!' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Nickname"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                        />,
                    )}
                </Form.Item>

                <Form.Item>
                    {getFieldDecorator('confirm', {
                        rules: [
                            {
                                required: true,
                                message: 'Please confirm your password!'
                            },
                            {
                                validator: this.confirmPW
                            }
                        ],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="confirm password"
                        />,
                    )}
                </Form.Item>

                <Form.Item>
                    {getFieldDecorator('email', {
                        rules: [{
                            required: true,
                            message: 'The input is not valid E-mail!',
                            type: 'email'
                        }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Email"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('address', {
                        rules: [{ required: true, message: 'Please input your address!' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Address"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('tel', {
                        rules: [{ required: true, message: 'Please input your telephone number!' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Tel"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    <Button  type="primary" htmlType="submit" className="login-form-button">
                        Sign up and Login
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedSignUpForm = Form.create({ name: 'normal_sign_up' })(SignUpForm);

export default WrappedSignUpForm
