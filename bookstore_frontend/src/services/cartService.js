import config from 'config';
import {postRequest, postRequest_v2} from "../utils/ajax";
import {message} from "antd";


export const getCart = (id, callback) => {
    const data = {user_id: id};
    const url = `${config.apiUrl}/getCart`;
    postRequest_v2(url, data, callback);
};

export const addToCart = (user_id, book_id, book_name) => {
    const data = {
        user_id: user_id,
        book_id: book_id,
        book_name: book_name
    };

    const callback = (data) => {
        console.log(data)
        if(data.status >= 0) {
            message.success(data.msg);
        }
        else{
            message.error(data.msg);
        }
    }
    console.log(data)
    const url = `${config.apiUrl}/addToCart`;
    postRequest(url, data, callback);
};

export const removeFromCart = (user_id, book_id, callback) => {
    const data = {
        user_id: user_id,
        book_id: book_id
    };
    const url = `${config.apiUrl}/removeFromCart`;
    postRequest(url, data, callback);
};

export const clearCart = (user_id, callback) => {
    const data = {
        user_id: user_id
    };
    const url = `${config.apiUrl}/clearCart`;
    postRequest_v2(url, data, callback);
};

