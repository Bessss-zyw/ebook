import React from 'react';
import {List, message} from 'antd'
import { Table, Button } from 'antd';
import * as orderService from "../services/orderService";
import { DatePicker } from 'antd';
import { Typography } from 'antd';

const { Text } = Typography;
const { RangePicker } = DatePicker;
const CUSTOMER = 0;


export class StatisticBook extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
            range: [],
            bookSale: []
        };
        this.onChange = this.onChange.bind(this);
        this.onOk = this.onOk.bind(this)
    }

    columns = [

        {
            title: '排名',
            key: 'order',
            width: 100,
            render: (text, record, index) => (<div>{index}</div>)
        },
        {
            title: 'ISBN',
            dataIndex: 'book.isbn',
            key: 'isbn',
            width: 100,
        },
        {
            title: '书籍名称',
            dataIndex: 'book.name',
            key: 'name',
            width: 200,
        },
        {
            title: '作者',
            dataIndex: 'book.author',
            key: 'author',
            width: 200,
        },
        {
            title: '类型',
            dataIndex: 'book.type',
            key: 'type',
            width: 200,
        },
        {
            title: '购买数量',
            dataIndex: 'sale',
            key: 'sale',
            width: 100,
        },

    ];

    onChange(value, dateString) {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
        this.setState({ range: dateString })
    }


    onOk(value) {
        console.log('onOk: ', value);
        console.log('Formatted Selected Time: ', this.state.range);



        if (this.state.user.userType === CUSTOMER){
            let info = {
                user_id: this.state.user.userId,
                start: this.state.range[0],
                end: this.state.range[1]
            }
            orderService.getUserReport(info, (data) => {
                console.log(data);
                message.success("get data!")
                this.setState({
                    bookSale: data
                })
            })
        }
        else {
            let time = {
                start: this.state.range[0],
                end: this.state.range[1]
            }
            orderService.getBookSale(time, (data) => {
                console.log(data);
                message.success("get data!")
                this.setState({
                    bookSale: data
                })
            })
        }

    }



    render() {

        return (
            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <div style={{display: "flex", flexDirection: "row", alignItems: "baseline"}}>
                    <Text strong>选择时间：&emsp;</Text>
                    <RangePicker
                        style={{marginBottom: 20}}
                        showTime={{ format: 'HH:mm' }}
                        format="YYYY-MM-DD HH:mm:ss"
                        onChange={this.onChange}
                        onOk={this.onOk}
                    />
                </div>

                <Table
                    columns={this.columns}
                    dataSource={this.state.bookSale}

                />
            </div>
        );
    }



}
