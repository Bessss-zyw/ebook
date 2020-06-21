import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Profile from '../component/Profile';
import {apiUrl} from '../utils/util';
const GET_USR_INFO_URL= apiUrl + "/getUserInfo";
import {userAuth} from '../utils/constants'

export default class UserInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userInfo: {
                nickname: "default nickname",
                tel: "1234",
                address: "ShaoXing",
                email: "12345678@qq.com",
                icon: {
                    iconBase64: '../img/avatar.png'
                }
            },
            iconImg: '../img/avatar.png'
        }
    }

    componentWillMount(){
        console.log("componentWillUnmount")
        let userId = userAuth.userId;
        let formData = new FormData();
        formData.append('user_id',userId);

        fetch(GET_USR_INFO_URL,{
            method:'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body:formData
        })
            .then((response) => {
                return response.json();
            })
            .then((responseData) => {
                console.log(responseData);
                this.setState({
                    userInfo: responseData
                });
            })
            .catch((error)=>{
                console.log(error);
            });
    }

    render() {
        console.log("render")
        console.log(this.state.userInfo);
        return (
            <View style={{alignItems: 'center'}}>
                <View style={{alignItems: 'center', marginTop: 50}}>
                    <Profile userInfo={this.state.userInfo} iconImg={this.state.iconImg}/>
                </View>
            </View>
        );
    }
}
