import React from 'react';
// import { Avatar, Dropdown, Menu} from 'antd';
import '../css/index.css'
import * as userService from '../services/userService'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import Typography from "@material-ui/core/Typography";
import {getUserIcon} from "../services/userService";

export class UserAvatar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            userIcon: null
        }
    }

    componentDidMount(){
        console.log("UserAvatar: componentDidMount ")
        const before_user = localStorage.getItem("user")
        const user = JSON.parse(before_user)
        const callback = (data) =>{
            console.log(data)
            this.setState({
                userIcon: data.iconBase64,
            })
        }

        getUserIcon(user.userId,callback)
    }

    handleClick = (event) => {
        this.setState({anchorEl: event.currentTarget})
    };

    handleClose = () => {
        this.setState({anchorEl: null})
    };

    render() {
        return(
            <div id="avatar" style={{marginLeft: 20, marginTop: 5, display: "flex", flexDirection: "row"}}>
                <Avatar alt="user" src={this.state.userIcon} onClick={this.handleClick} />
                <Menu
                    id="simple-menu"
                    anchorEl={this.state.anchorEl}
                    keepMounted
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.handleClose}
                >
                    <MenuItem onClick={this.handleClose}>
                        <a target="_blank" rel="noopener noreferrer" href="/profile">
                            Show Profile
                        </a>
                    </MenuItem>
                    <MenuItem onClick={this.handleClose}>
                        <a href="#" onClick={userService.logout}>
                            Log Out
                        </a>
                    </MenuItem>
                </Menu>
            </div>
        );
    }
}

// const menu = (
//     <Menu>
//         <Menu.Item>
//             <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
//                 Show Profile
//             </a>
//         </Menu.Item>
//         <Menu.Item>
//             <a  href="/sign-up">
//                 Sign up
//             </a>
//         </Menu.Item>
//         <Menu.Item>
//             <a href="#" onClick={userService.logout}>
//                 Log Out
//             </a>
//         </Menu.Item>
//     </Menu>
// );


// <div id="avatar">
//     <span className="name">Hi, {user.username}</span>
//     <Dropdown overlay={menu} placement="bottomRight">
//         <Avatar src={imgUrl} style={{cursor:"pointer"}}/>
//     </Dropdown>
// </div>
