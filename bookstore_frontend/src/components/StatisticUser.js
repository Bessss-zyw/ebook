import React from 'react';
import {List, message} from 'antd'
import { Table, Button } from 'antd';
import * as orderService from "../services/orderService";
import { DatePicker } from 'antd';
import { Typography } from 'antd';

const { Text } = Typography;
const { RangePicker } = DatePicker;


export class StatisticUser extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
            range: [],
            userConsume: []
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
            title: 'ID',
            dataIndex: 'user.userId',
            key: 'id',
            width: 100,
        },
        {
            title: '用户名',
            dataIndex: 'user.username',
            key: 'username',
            width: 200,
        },
        {
            title: '购买书籍数量',
            dataIndex: 'bookNum',
            key: 'bookNum',
            width: 200,
            sorter: {
                compare: (a, b) => a.bookNum > b.bookNum ? 1 : -1,
                multiple: 1,
            },
        },
        {
            title: '总消费量',
            dataIndex: 'expenditure',
            key: 'expenditure',
            width: 200,
            sorter: {
                compare: (a, b) => a.expenditure > b.expenditure ? 1 : -1,
                multiple: 2,
            },
        }

    ];

    onChange(value, dateString) {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
        this.setState({ range: dateString })
    }


    onOk(value) {
        console.log('onOk: ', value);
        console.log('Formatted Selected Time: ', this.state.range);

        let time = {
            start: this.state.range[0],
            end: this.state.range[1]
        }

        orderService.getUserConsume(time, (data) => {
            console.log(data);
            this.setState({
                bookSale: data
            })
        })

    }


    onTableChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
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
                    onChange={this.onTableChange}
                />
            </div>
        );
    }



}
