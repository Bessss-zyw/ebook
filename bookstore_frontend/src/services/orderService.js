import config from 'config';
import {postRequest, postRequest_v2} from "../utils/ajax";


export const makeOrder = (user_id, callback) => {
    const data = {user_id: user_id};
    const url = `${config.apiUrl}/cartToOrder`;
    postRequest_v2(url, data, callback);
};

export const createOrder = (user_id, callback) => {
    const data = {user_id: user_id};
    const url = `${config.apiUrl}/createOrder`;
    postRequest_v2(url, data, callback);
};

export const addOrderItem = (order_id, id, callback) => {
    const data = {
        order_id: order_id,
        cart_id: id
    };
    const url = `${config.apiUrl}/addOrderItem`;
    postRequest_v2(url, data, callback);
};


export const getOrderItems = (order_id, callback) => {
    const url = `${config.apiUrl}/getOrderItems`;
    const data = {order_id: order_id};
    postRequest_v2(url, data, callback);
};

export const getUserOrder = (user_id, callback) => {
    const url = `${config.apiUrl}/getUserOrder`;
    const data = {user_id: user_id};
    postRequest_v2(url, data, callback);
};

export const getAllOrders = (callback) => {
    const url = `${config.apiUrl}/getAllOrders`;
    postRequest(url, {}, callback);
};

export const getBookSale = (data, callback) => {
    const url = `${config.apiUrl}/getBookSale`;
    postRequest_v2(url, data, callback);
};

export const getUserReport = (data, callback) => {
    const url = `${config.apiUrl}/getUserReport`;
    postRequest_v2(url, data, callback);
};

export const getUserConsume = (data, callback) => {
    const url = `${config.apiUrl}/getUserConsume`;
    postRequest_v2(url, data, callback);
};
