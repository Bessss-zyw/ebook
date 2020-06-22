import React from 'react';
import {Form, Input, Button, Checkbox, Icon, message} from 'antd';
import Typography from "@material-ui/core/Typography";
import {Color1Button, Color2Button} from "../ColorComponent";
import DeleteIcon from '@material-ui/icons/Delete';
import * as bookService from "../../services/bookService";
import '../../css/admin.css'
import InputNumber from "antd/es/input-number";
import {history} from "../../utils/history";

import {Uploader} from "../Uploader";
const imgUrl = "http://chuantu.xyz/t6/739/1592626616x1033347913.jpg";
const EMPTY = "empty";
const USE_BASE64 = "base64";

class AdminBookDetail extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            info: this.props.info,
            user: JSON.parse(localStorage.getItem("user")),
            name_md: false,
            author_md: false,
            isbn_md: false,
            inv_md: false,
            imageBase64: null
        }
        console.log("BookDetail: constructor");
        this.delete = this.delete.bind(this);
        this.handleSubmitImg = this.handleSubmitImg.bind(this)
    }

    componentWillMount() {
        this.updateBookInfo();
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                if (!this.state.name_md && !this.state.inv_md && !this.state.author_md && !this.state.isbn_md)
                    message.error("无修改！");

                values.id = this.props.info.bookId;

                bookService.modifyBook(values,(data) =>{
                    console.log(data)
                    if (data.status !== 0) message.error(data.msg);
                    else{
                        message.success(data.msg);
                        this.updateBookInfo();
                    }

                });
            }
        });
    };

    updateBookInfo = () => {
        let id = this.props.info.bookId;
        bookService.getBook(id, (data) =>{
            console.log(data);
            this.setState({
                info: data,
                name_md: false,
                author_md: false,
                isbn_md: false,
                img_md: false,
                inv_md: false
            })
        })
    }

    delete(){
        let id = this.props.info.bookId;
        bookService.deleteBook(id, (data) =>{
            console.log(data);
            message.success(data.msg)
            history.push("/books", null)
        })
    }

    onCheckChange = e => {
        console.log(e.target)
        switch (e.target.id) {
            case "name-check":
                this.setState({
                    name_md: e.target.checked
                });
                break;

            case "author-check":
                this.setState({
                    author_md: e.target.checked
                });
                break;

            case "isbn-check":
                this.setState({
                    isbn_md: e.target.checked
                });
                break;

            case "img-check":
                this.setState({
                    img_md: e.target.checked
                });
                break;

            case "inv-check":
                this.setState({
                    inv_md: e.target.checked
                });
                break;

            default:

        }

    }

    uploadDone = (imageBase64) => {
        console.log("uploadDone")
        this.setState({
            imageBase64: imageBase64
        })
        console.log(this.state)

    }


    handleSubmitImg() {
        let upload = {
            id: this.state.info.bookId,
            base64: this.state.imageBase64
        }
        console.log(upload);
        bookService.modifyBookImg(upload, (data) => {
            console.log(data);
            if (data.status !== 0) message.error(data.msg);
            else{
                message.success(data.msg);
                let newInfo = this.state.info;
                newInfo.image = USE_BASE64;
                newInfo.base64.imgBase64 = this.state.imageBase64
                this.setState({
                    info: newInfo
                })
            }
        })
    }

    render() {
        if(this.state.info === null){
            return null;
        }
        const { getFieldDecorator } = this.props.form;

        return (
            <div className={"content"}>
                <div className={"book-detail"}>
                    <div className={"book-image"}>
                        {
                            (this.state.info.image === EMPTY) ?
                                <img alt="image" src={imgUrl} style={{ width:"450px", height:"450px"}}/>:
                                (this.state.info.image === USE_BASE64) ?
                                    <img alt="image" src={this.state.info.base64.imgBase64} style={{ width:"450px", height:"450px"}}/>:
                                    <img alt="image" src={this.state.info.image} style={{ width:"450px", height:"450px"}}/>
                        }
                    </div>
                    <div className={"descriptions"} >
                        <Form
                            onSubmit={this.handleSubmit}
                              className="modify-info"
                              style={{
                                  display: "flex",
                                  flexDirection: "column",
                              }}
                        >
                            <div className="infoBar">
                                <Typography variant="body1" gutterBottom span={3}>
                                    书名：
                                </Typography>
                                <Typography variant="body1" gutterBottom span={3}>
                                    {this.state.info.name}
                                </Typography>
                                <Checkbox
                                    id="name-check"
                                    style={{marginLeft: 50}}
                                    onChange={this.onCheckChange}
                                    checked={this.state.name_md}
                                >
                                    修改书名
                                </Checkbox>
                            </div>
                            {
                                this.state.name_md ?
                                    <Form.Item>
                                        {getFieldDecorator('name', {
                                            initialValue: this.state.info.name,
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Please input Book Name!'
                                                }
                                            ],
                                        })(
                                            <Input
                                                style={{marginLeft: 60, width: 150}}
                                                placeholder="Book Name"
                                            />
                                        )}
                                    </Form.Item>: null
                            }

                            <div className="infoBar">
                                <Typography variant="body1" gutterBottom span={3}>
                                    作者：
                                </Typography>
                                <Typography variant="body1" gutterBottom span={3}>
                                    {this.state.info.author}
                                </Typography>
                                <Checkbox
                                    id="author-check"
                                    style={{marginLeft: 50}}
                                    onChange={this.onCheckChange}
                                    checked={this.state.author_md}
                                >
                                    修改作者
                                </Checkbox>
                            </div>
                            {
                                this.state.author_md ?
                                    <Form.Item>
                                        {getFieldDecorator('author', {
                                            initialValue: this.state.info.author,
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Please input Book Author!'
                                                }
                                            ],
                                        })(
                                            <Input
                                                style={{marginLeft: 60, width: 150}}
                                                placeholder="Book Author"
                                            />
                                        )}
                                    </Form.Item>: null
                            }

                            <div className="infoBar">
                                <Typography variant="body1" gutterBottom span={3}>
                                    ISBN：
                                </Typography>
                                <Typography variant="body1" gutterBottom span={3}>
                                    {this.state.info.isbn}
                                </Typography>
                                <Checkbox
                                    id="isbn-check"
                                    style={{marginLeft: 50}}
                                    onChange={this.onCheckChange}
                                    checked={this.state.isbn_md}
                                >
                                    修改isbn
                                </Checkbox>
                            </div>
                            {
                                this.state.isbn_md ?
                                    <Form.Item>
                                        {getFieldDecorator('isbn', {
                                            initialValue: this.state.info.isbn,
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Please input Book ISBN!'
                                                }
                                            ],
                                        })(
                                            <Input
                                                style={{marginLeft: 60, width: 150}}
                                                placeholder="ISBN"
                                            />
                                        )}
                                    </Form.Item>: null
                            }

                            <div className="infoBar">
                                <Typography variant="body1" gutterBottom span={3}>
                                    库存：
                                </Typography>
                                <Typography variant="body1" gutterBottom span={3}>
                                    {this.state.info.inventory}
                                </Typography>
                                <Checkbox
                                    id="inv-check"
                                    style={{marginLeft: 50}}
                                    onChange={this.onCheckChange}
                                    checked={this.state.inv_md}
                                >
                                    修改库存
                                </Checkbox>
                            </div>
                            {
                                this.state.inv_md ?
                                    <Form.Item>
                                        {getFieldDecorator('inventory', {
                                            initialValue: this.state.info.inventory,
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Please input Book Inventory!'
                                                }
                                            ],
                                        })(
                                            <InputNumber
                                                style={{marginLeft: 60, width: 150}}
                                                min={0}
                                            />
                                        )}
                                    </Form.Item>: null
                            }

                            <Form.Item>
                                <Button  type="primary" htmlType="submit" className="login-form-button">
                                    提交修改
                                </Button>
                            </Form.Item>
                        </Form>

                    </div>


                </div>
                <div className="imgChangeBar">
                    <Uploader changeImageState={this.uploadDone}/>
                    <Button onClick={this.handleSubmitImg}>修改图书图片</Button>
                </div>
                <Color2Button
                    size="large"
                    variant="contained"
                    color="primary"
                    style={{margin: 20}}
                    endIcon={<DeleteIcon/>}
                    onClick={this.delete}
                >
                    删除图书
                </Color2Button>
            </div>


        )

    }

}

const WrappedAdminDetailForm = Form.create({ name: 'normal_sign_up' })(AdminBookDetail);

export  default WrappedAdminDetailForm;
