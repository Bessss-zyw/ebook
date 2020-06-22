import config from 'config';
import {postRequest, postRequest_v2} from "../utils/ajax";
import {history} from '../utils/history';
import {message} from 'antd';



export const login = (data) => {
    console.log(data);
    const url = `${config.apiUrl}/login`;
    const callback = (data) => {
        if(data.status >= 0) {
            console.log(data)
            // if disabled
            if (data.data === null) message.error(data.msg);
            else{
                localStorage.setItem('user', JSON.stringify(data.data));
                history.push("/");
                message.success(data.msg);
            }
        }
        else{
            message.error(data.msg);
        }
    };
    postRequest(url, data, callback);
};

export const logout = () => {
    const url = `${config.apiUrl}/logout`;

    const callback = (data) => {
        if(data.status >= 0) {
            localStorage.removeItem("user");
            history.push("/login");
            message.success(data.msg);
        }
        else{
            message.error(data.msg);
        }
    };
    postRequest(url, {}, callback);
};



export const checkSession = (callback) => {
    const url = `${config.apiUrl}/checkSession`;
    postRequest(url, {}, callback);
};

export const checkName = (name, callback) => {
    const url = `${config.apiUrl}/checkName`;
    const data = {username: name};
    postRequest_v2(url, data, callback);
};



export const addUser = (data) => {
    const url = `${config.apiUrl}/addUser`;
    console.log('addUser')
    const callback = (data) => {
        console.log("data from addUser callback: " );
        console.log(data);

        if(data.status >= 0) {
            message.success("注册成功！");
            // const loginData = {
            //     username: data.username,
            //     password: data.password
            // }
            login(data.data);
            // history.push("/");
        }
        else{
            message.error("注册失败！");
        }
    };
    postRequest(url, data, callback);
};



export const getUser = (id, callback) => {
    const data = {user_id: id};
    const url = `${config.apiUrl}/getUserInfo`;
    postRequest_v2(url, data, callback);
};

export const getAllUser = (callback) => {
    const url = `${config.apiUrl}/getAllUser`;
    postRequest(url, {}, callback);
};

export const getUserIcon = (id, callback) => {
    const data = {user_id: id};
    const url = `${config.apiUrl}/getIcon`;
    postRequest_v2(url, data, callback);

};



export const disableUser = (id, callback) => {
    const url = `${config.apiUrl}/disable`;
    const data = {user_id: id};
    postRequest_v2(url, data, callback);
};

export const ableUser = (id, callback) => {
    const url = `${config.apiUrl}/able`;
    const data = {user_id: id};
    postRequest_v2(url, data, callback);
};

