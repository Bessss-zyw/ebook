import React from 'react';
import {AutoComplete, Button, Icon, Input, message, Empty} from 'antd'
import * as orderService from "../services/orderService";
import {Order} from "./Order";
import "../css/order.css"
import { DatePicker } from 'antd';
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import { Typography } from 'antd';

const { Text } = Typography;
const { RangePicker } = DatePicker;
const ADMIN = 1;
const CUSTOMER = 0;

function convertDateFromString(dateString) {
    if (dateString) {
        let arr1 = dateString.split(" ");
        arr1 = arr1[0].split('-');
        return new Date(arr1[0], arr1[1]-1, arr1[2]);
    }
}

export class OrderDisplay extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
            orders:[],
            display:[],
            orderItems: [],
            search_name: null,
            search_time: null
        };

        this.handleSearch = this.handleSearch.bind(this)
        this.onOk = this.onOk.bind(this)
    }

    componentDidMount() {
        if (this.state.user.userType === CUSTOMER){
            let id = this.state.user.userId;
            orderService.getUserOrder(id, this.callback);
        }
        else orderService.getAllOrders(this.callback);
    }

    callback = (data) => {
        let moreData = JSON.parse(JSON.stringify(data));

        for (let i = 0; i < moreData.length; ++i){
            orderService.getOrderItems(moreData[i].order_id, (dataItem) => {
                moreData[i].detail = dataItem;
                let a = moreData[i].detail;
                console.log(a)

            })
        }

        this.setState({
            orders: moreData,
            display: data
        })

        console.log(this.state)
    }


    handleInputChange = (value) => {
        this.setState({
            search_name: value
        });
    };

    handleSearch = () => {
        console.log(this.state.search_name)
        let value = this.state.search_name;

        if (value === null || value === "") {
            message.error("搜索内容不得为空！");
            this.setState({
                display: this.state.orders
            })
            return;
        }

        let newDisplay = JSON.parse(JSON.stringify(this.state.orders));

        for (let i = 0; i < newDisplay.length; i++){
            console.log("outer loop " + newDisplay[i].order_id);
            let items = newDisplay[i].detail;
            let flag = false;
            console.log(items)

            for (let j = 0; j < items.length; j++){
                console.log("inner loop" + j + ": flag =  " + flag);
                if (items[j].book_name.includes(value)) {
                    console.log(items[j].book_name);
                    flag = true;
                    break;
                }
            }

            console.log(flag);
            // delete newDisplay[i].detail;

            if (flag === false){
                newDisplay.splice(i--, 1);
            }
        }

        console.log("newData: ")
        console.log(newDisplay)
        this.setState({
            display: newDisplay
        })
        console.log(this.state)
    };

    onChange(value, dateString) {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
    }



    onOk(value) {
        console.log('onOk: ', value);
        console.log(value[0]._d)

        console.log(this.state)

        let newDisplay = JSON.parse(JSON.stringify(this.state.orders));

        for (let i = 0; i < newDisplay.length; i++){
            let time = convertDateFromString(newDisplay[i].time);
            console.log(time);

            if (time < value[0]._d || time > value[1]._d) newDisplay.splice(i--, 1);
        }

        console.log("newData: ")
        console.log(newDisplay)
        this.setState({
            display: newDisplay
        })
        console.log(this.state)

    }


    render() {
        return (
            <div>
                <div className="global-search-wrapper"
                     style={{ marginTop: 0, marginBottom: 20, width: 300 }}>
                    <AutoComplete
                        className="global-search"
                        size="large"
                        style={{ width: '100%' }}
                        onSearch={this.handleInputChange}
                        placeholder="Search..."
                        optionLabelProp="text"
                    >
                        <Input.Search
                            allowClear
                            onSearch={this.handleSearch}
                            enterButton={
                                <Button
                                    className="search-btn"
                                    style={{ marginRight: -12 }}
                                    size="large"
                                    type="primary"
                                >
                                    <Icon type="search" />
                                </Button>
                            }
                        />
                    </AutoComplete>
                </div>
                <Text strong style={{marginLeft: 350}}>选择时间：</Text>
                <RangePicker
                    style={{marginLeft: 20}}
                    showTime={{ format: 'HH:mm' }}
                    format="YYYY-MM-DD HH:mm"
                    onChange={this.onChange}
                    onOk={this.onOk}
                />
                <div className="orderContainer" style={{marginTop: 40}}>
                    {
                        this.state.display.length === 0 ?
                            <Empty/>
                            : this.state.display.map((value) => {
                            return (
                                <Order info={value}/>
                            )
                        }, this)
                    }
                </div>
            </div>

        );
    }

}
