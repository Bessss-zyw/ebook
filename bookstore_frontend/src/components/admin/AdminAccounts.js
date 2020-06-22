import React from 'react';
import {List, message} from 'antd'
import { Table, Button } from 'antd';
import * as userService from "../../services/userService";
import '../../css/admin.css'



export class AdminAccounts extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            imgUrl: "../assets/book.jpg",
            user: null,
            users: []
        };
    }

    columns = [
        {
            title: '序列号',
            dataIndex: 'userId',
            key: 'userId',
        },
        {
            title: '用户名',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: '类型',
            dataIndex: 'userType',
            key: 'userType',
            render: (text) => (<div>{text === 0 ? "顾客": "管理员"}</div>)
        },
        {
            title: '禁用状态',
            dataIndex: 'ifDisabled',
            key: 'ifDisabled',
            render: (text) => (<div>{text === 0 ? "正常": "禁用"}</div>)
        },
        {
            title: '管理',
            key: 'action',
            render: (text, record) => (
                <div>
                    {
                        record.userType === 1 ?
                            <a>---</a>:
                            record.ifDisabled === 0 ?
                                <Button style={{backgroundColor: "#f44336"}} id={record.userId} onClick={this.disable}>禁用</Button>:
                                <Button style={{backgroundColor: "#fdd835"}} id={record.userId} onClick={this.able}>取消禁用</Button>
                    }
                </div>

            ),
        },
    ]

    disable = e => {
        let id = parseInt(e.target.id);
        console.log(id)
        userService.disableUser(id, (data) => {
            if (data.status !== 0) message.error(data.msg);
            else{
                message.success(data.msg);

                // change state
                let newUsers = JSON.parse(JSON.stringify(this.state.users));
                for (let i = 0; i < newUsers.length; i++){
                    if (newUsers[i].userId === id){
                        newUsers[i].ifDisabled = 1;
                        break;
                    }
                }

                this.setState({
                    users: newUsers
                })
            }
        })
    }

    able = e => {
        let id = parseInt(e.target.id);
        console.log(id)
        userService.ableUser(id, (data) => {
            if (data.status !== 0) message.error(data.msg);
            else{
                message.success(data.msg);

                // change state
                let newUsers = JSON.parse(JSON.stringify(this.state.users));
                for (let i = 0; i < newUsers.length; i++){
                    if (newUsers[i].userId === id){
                        newUsers[i].ifDisabled = 0;
                        break;
                    }
                }

                this.setState({
                    users: newUsers
                })
            }
        })
    }

    componentDidMount() {
        const callback = (data) => {
            console.log(data);
            this.setState({
                users: data
            })
        }

        userService.getAllUser(callback)
    }


    render() {

        return (
            <div>
                <Table columns={this.columns} dataSource={this.state.users} />
            </div>

        );
    }



}
