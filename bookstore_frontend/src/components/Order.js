import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Typography } from 'antd';
import * as orderService from "../services/orderService";

const { Text } = Typography;

export class Order extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            search: false,
            order: this.props.info,
            items: []
        }
    }

    handleChange = () => {
        let state = this.state.expanded;

        if (!state && !this.state.search){ // get data
            orderService.getOrderItems(this.state.order.order_id, (data) => {
                console.log(data)
                this.setState({
                    items: data,
                    search: true
                })
            })
        }

        this.setState({
            expanded: !state
        })
    };

    renderItem = (item) => {
        return (
            <ExpansionPanelDetails>
                <div style={{width: 50}}/>
                <Text strong>书名：{item.book_name}</Text>
                <div style={{flexGrow: 1}}/>
                <Text>数量：{item.num}</Text>
                {/*<div style={{flexGrow: 1}}/>*/}
                <Text type="warning">&emsp;&emsp;单价 ¥ {item.book_price}</Text>
            </ExpansionPanelDetails>
        )
    }

    render() {
        return (
            <div style={{width: '48%', margin: '15px 12px'}}>
                <div>
                    <ExpansionPanel expanded={this.state.expanded} onChange={this.handleChange}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Text strong>编号：{this.state.order.order_id}</Text>
                            <div style={{flexGrow: 1}}/>
                            <Text>{this.state.order.time}</Text>
                            <div style={{flexGrow: 1}}/>
                            <Text type="warning">总价 ¥ {
                                this.state.order.total_price === null?
                                    "---": this.state.order.total_price}</Text>
                        </ExpansionPanelSummary>
                        {
                            this.state.items.map((value) => {
                                return this.renderItem(value)
                            }, this)
                        }
                    </ExpansionPanel>
                </div>

             </div>
        );
    }
}
