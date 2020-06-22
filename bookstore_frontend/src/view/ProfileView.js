import React from 'react';
import {Layout} from 'antd'

import '../css/profile.css'

import {withRouter} from "react-router-dom";
import {Avatar} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {getUser} from "../services/userService"

const {  Content } = Layout;

class ProfileView extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            imgUrl: "http://seopic.699pic.com/photo/40010/9017.jpg_wh1200.jpg",
            userInfo: null,
            user: null
        };
    }

    componentDidMount(){
        console.log("profile view: componentDidMount ")
        const user = JSON.parse(localStorage.getItem("user"))
        const callback = (data) =>{
            console.log(data)
            this.setState({
                userInfo: data,
                user: user,
                imgUrl: data.icon.iconBase64
            })
        }

        getUser(user.userId,callback)
    }

    render(){
        console.log("profile view: render")
        console.log(this.state)

        if (this.state.user === null || this.state.userInfo === null) return null

        return(
            <Layout className="layout">
                <Layout>
                    <Content style={{ padding: '40px 50px' }}>
                        <div className="profile-content">
                            <Avatar className="profile-img" src={this.state.imgUrl} key={"user-avater"} style={{height: 120 , width: 120}}/>
                            <Typography variant="h5" gutterBottom className="user-info" span={3}>
                                身份：{this.state.user.userType === 0 ? "消费者": "管理员"}
                            </Typography>

                            <br/>
                            <Typography variant="h5" gutterBottom className="user-info" span={3}>
                                用户名：{this.state.user.username}
                            </Typography>
                            <Typography variant="h5" gutterBottom className="user-info" span={3}>
                                昵称：{this.state.userInfo.nickname}
                            </Typography>
                            <Typography variant="h5" gutterBottom className="user-info" span={3}>
                                电话： {this.state.userInfo.tel === null || this.state.userInfo.tel === "" ? "unknown": this.state.userInfo.tel}
                            </Typography>
                            <Typography variant="h5" gutterBottom className="user-info" span={3}>
                                邮箱：{this.state.userInfo.email === null || this.state.userInfo.email === "" ? "unknown": this.state.userInfo.email}
                            </Typography>

                            <Typography variant="h5" gutterBottom className="user-info" span={3}>
                                地址：{this.state.userInfo.address === null || this.state.userInfo.address === "" ? "unknown": this.state.userInfo.address}
                            </Typography>
                            <br/>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default withRouter(ProfileView);
