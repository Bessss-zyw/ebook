import React from 'react';
import {List, message} from 'antd'
import {getCart, removeFromCart} from "../services/cartService";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import img from "../assets/book.jpg"
import {Color1Button,Color2Button} from './ColorComponent';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';

import * as orderService from "../services/orderService";
import * as cartService from "../services/cartService";
import "../css/bookDetail.css"
import {history} from "../utils/history";

export class Cart extends React.Component{

    constructor(props) {
        super(props);
        this.handleDeleteItem = this.handleDeleteItem.bind(this)
        this.state = {
            imgUrl: "../assets/book.jpg",
            user: null,
            cartItems:[],
            order: null,
            orderItems: []
        };
        this.handleOrderMaking = this.handleOrderMaking.bind(this);
    }

    componentDidMount() {
        let user = JSON.parse(localStorage.getItem("user"));
        let id = parseInt(user.userId);
        this.setState({
            user: user
        })
        console.log("cart componentDidMount: userID = ");
        console.log(id)

        const callback =  (data) => {
            this.setState({
                user: user,
                cartItems: data
            });
            console.log(data);
        };

        getCart(id,callback);
    }

    handleOrderMaking(){
        console.log("makeOrder");
        let id = parseInt(JSON.parse(localStorage.getItem("user")).userId);
        orderService.createOrder(id, (data) => {
            if (data != null) {
                console.log(data)
                this.setState({order: data})
                let list = [];
                let items = this.state.cartItems;
                for (let i = 0; i < items.length; i++){
                    console.log(items[i]);
                    if (i !== items.length - 1) {
                        orderService.addOrderItem(data.order_id, items[i].cart_item_id,
                            (item_data) => {list.push(item_data);})
                    }
                    else {
                        orderService.addOrderItem(data.order_id, items[i].cart_item_id,
                            (item_data) => {
                            list.push(item_data);
                            this.setState({orderItems: list})
                            console.log(this.state);
                            this.handleClearCart();
                            history.push("/orders", null)
                        })
                    }
                }
            }
        })

    }

    handleClearCart = () => {
        console.log("handleClearCart")
        console.log(this.state.user.userId)
        cartService.clearCart(this.state.user.userId, (data) => {
            console.log(data);
            if (data.status !== 0) message.error(data.msg);
            else{
                message.success(data.msg);
                this.setState({
                    cartItems: []
                })
            }
        })
    }

    handleDeleteItem = (e) =>{
        const callback = (data) => {
            console.log(data);
            if(data.status === 0) {
                let newData = this.state.cartItems;
                newData.forEach((item,index) =>{
                    if (item.book_id === id) {
                        newData.splice(index,1);}
                });
                this.setState({cartItems: newData});
                console.log(data.msg)
                message.success({
                    content: data.msg,
                    style: {
                        marginTop: '200px',
                    },
                });
            }
            else{
                message.error(data.msg);
            }
        }

        let id = parseInt(e.target.id);
        removeFromCart(this.state.user.userId,id,callback);
    }

    render() {

        return (
            <div>

                <List
                    style={{margin: '0px 50px'}}
                    grid={{gutter: 10, column: 6}}
                    dataSource={this.state.cartItems}
                    pagination={{
                        onChange: page => {
                            console.log(page);
                        },
                        pageSize: 12,
                    }}

                    renderItem={item => (
                        <List.Item>
                            <Card style={{maxWidth: 345,maxHeight: 350}}>
                                <CardActionArea>
                                    <CardMedia
                                        style={{width: 181}}
                                        title={item.book_name}
                                    >
                                        <img alt="book_img" src={img} className={"bookImg"}/>
                                    </CardMedia>
                                    <CardContent style={{height: 100}}>
                                        <Typography gutterBottom variant="h6" component="h2">
                                            {item.book_name}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {"数量： " + item.num }
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Link to={{
                                        pathname: '/bookDetails',
                                        search: '?id=' + item.book_id,
                                        state: null
                                    }}
                                          target="_blank"
                                    >
                                        <Button size="small" color="primary">
                                            更多信息
                                        </Button>
                                    </Link>
                                    <Typography variant="body2"  color="primary" id={item.book_id}
                                                onClick={this.handleDeleteItem}
                                    >
                                        删除
                                    </Typography>
                                </CardActions>
                            </Card>
                        </List.Item>
                    )}
                />

                <div className={"button-groups"}>
                    <Color1Button
                        size="large"
                        variant="contained"
                        color="primary"
                        style={{margin: 60}}
                        endIcon={<RemoveShoppingCartIcon/>}
                        onClick={this.handleClearCart}
                    >
                        清空购物车
                    </Color1Button>
                    <Color2Button
                        size="large"
                        variant="contained"
                        color="primary"
                        style={{margin: 60}}
                        endIcon={<AssignmentTurnedInIcon/>}
                        onClick={this.handleOrderMaking}
                    >
                        全部购买
                    </Color2Button>
                </div>
            </div>

        );
    }



}
