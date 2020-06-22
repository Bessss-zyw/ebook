import config from 'config';
import {postRequest, postRequest_v2} from "../utils/ajax";


export const getBooks = (data, callback) => {
    const url = `${config.apiUrl}/getBooks`;
    postRequest(url, data, callback);
};

export const getBook = (id, callback) => {
    const data = {id: id};
    const url = `${config.apiUrl}/getBook`;
    postRequest_v2(url, data, callback);
};

export const modifyBook = (data, callback) => {
    const url = `${config.apiUrl}/modifyBook`;
    postRequest(url, data, callback);
}

export const addBook = (data, callback) => {
    const url = `${config.apiUrl}/newBook`;
    postRequest_v2(url, data, callback);
}

export const deleteBook = (id, callback) => {
    const data = {id: id};
    const url = `${config.apiUrl}/deleteBook`;
    postRequest_v2(url, data, callback);
}

export const modifyBookImg = (data, callback) => {
    const url = `${config.apiUrl}/modifyBookImage`;
    postRequest_v2(url, data, callback);
}

