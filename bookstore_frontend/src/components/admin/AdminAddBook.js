import React from 'react';
import {Form, Input, Button, Checkbox, Icon, message} from 'antd';
import Typography from "@material-ui/core/Typography";
import * as bookService from "../../services/bookService";
import '../../css/admin.css'
import InputNumber from "antd/es/input-number";
const { TextArea } = Input;

class AdminAddBook extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user"))
        }
        console.log("AdminAddBook: constructor");
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                bookService.addBook(values, (data) => {
                    console.log(data)
                    if (data.status !== 0) message.error(data.msg);
                    else message.success(data.msg);
                })
            }
        });
    };


    render() {

        const { getFieldDecorator } = this.props.form;

        if(this.state.info === null){
            return null;
        }

        return (
            <div className={"content"}>
                <div>
                    <div className={"descriptions"} >
                        <Form
                            onSubmit={this.handleSubmit}
                            className="modify-info"
                            style={{
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >

                            <div className="add-infoBar">
                                <Typography variant="body1" gutterBottom span={3}>
                                    ISBN：
                                </Typography>
                                <Form.Item>
                                    {getFieldDecorator('isbn', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please input Book ISBN!'
                                            }
                                        ],
                                    })(
                                        <Input
                                            style={{marginLeft: 20, width: 300}}
                                            placeholder="ISBN"
                                        />
                                    )}
                                </Form.Item>
                            </div>

                            <div className="add-infoBar">
                                <Typography variant="body1" gutterBottom span={3}>
                                    书名：
                                </Typography>
                                <Form.Item>
                                    {getFieldDecorator('name', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please input Book Name!'
                                            }
                                        ],
                                    })(
                                        <Input
                                            style={{marginLeft: 20, width: 300}}
                                            placeholder="Book Name"
                                        />
                                    )}
                                </Form.Item>
                            </div>

                            <div className="add-infoBar">
                                <Typography variant="body1" gutterBottom span={3}>
                                    作者：
                                </Typography>
                                <Form.Item>
                                    {getFieldDecorator('author', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please input Book Author!'
                                            }
                                        ],
                                    })(
                                        <Input
                                            style={{marginLeft: 20, width: 300}}
                                            placeholder="Book Author"
                                        />
                                    )}
                                </Form.Item>
                            </div>

                            <div className="add-infoBar">
                                <Typography variant="body1" gutterBottom span={3}>
                                    类型：
                                </Typography>
                                <Form.Item>
                                    {getFieldDecorator('type', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please input Book type!'
                                            }
                                        ],
                                    })(
                                        <Input
                                            style={{marginLeft: 20, width: 300}}
                                            placeholder="type"
                                        />
                                    )}
                                </Form.Item>
                            </div>

                            <div className="add-infoBar">
                                <Typography variant="body1" gutterBottom span={3}>
                                    价格：
                                </Typography>
                                <Form.Item>
                                    {getFieldDecorator('price', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please input Book price!'
                                            }
                                        ],
                                    })(
                                        <InputNumber
                                            style={{marginLeft: 20, width: 300}}
                                            min={0}
                                            precision={2}
                                        />
                                    )}
                                </Form.Item>
                            </div>


                            <div className="add-infoBar">
                                <Typography variant="body1" gutterBottom span={3}>
                                    库存：
                                </Typography>
                                <Form.Item>
                                    {getFieldDecorator('inv', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please input Book Inventory!'
                                            }
                                        ],
                                    })(
                                        <InputNumber
                                            style={{marginLeft: 20, width: 300}}
                                            min={0}
                                        />
                                    )}
                                </Form.Item>
                            </div>

                            <div className="add-infoBar">
                                <Typography variant="body1" gutterBottom span={3}>
                                    介绍：
                                </Typography>
                                <Form.Item>
                                    {getFieldDecorator('description', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please input Book description!'
                                            }
                                        ],
                                    })(
                                        <TextArea
                                            style={{marginLeft: 20, width: 300}}
                                            placeholder="type"
                                            rows={6}/>
                                    )}
                                </Form.Item>
                            </div>

                            <Form.Item>
                                <Button  type="primary" htmlType="submit" className="login-form-button">
                                    确定添加
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>

                </div>
            </div>


        )

    }

}

const WrappedAdminAddBookForm = Form.create({ name: 'normal_sign_up' })(AdminAddBook);

export  default WrappedAdminAddBookForm;
