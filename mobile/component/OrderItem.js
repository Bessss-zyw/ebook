import React, {Component}from 'react';
import {View, Text, StyleSheet, TouchableHighlight, Button, FlatList} from 'react-native';
import {apiUrl} from '../utils/util';
import CartItem from './CartItem';

const GET_ORDER_ITEM_URL = apiUrl + '/getOrderItems';

export default class OrderItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            active: false,
            items: []
        }
        this.showContents = this.showContents.bind(this);
    }

    showContents (){
        this.getOrderItems(this.props.order.order_id);
    };

    getOrderItems(order_id) {
        let formData = new FormData();
        formData.append('order_id',order_id);

        fetch(GET_ORDER_ITEM_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: formData
        })
            .then((response) => response.json())
            .then((responseData) => {
                console.log("--from Order getOrderItems: responseData");
                console.log(responseData);
                this.setState({
                    active: true,
                    items: responseData,
                });
            })
            .catch((error)=> {
                console.error(error);
            });
    }


    render(){
        let order = this.props.order;

        return (
            <View>
                <TouchableHighlight>
                    <View style={styles.container}>
                        <View style={styles.rightContainer}>
                            <Text style={styles.time}>编号：{order.order_id}</Text>
                            <Text style={styles.time}>{order.time}</Text>
                            <Text style={styles.price}>总金额：¥{order.total_price}</Text>
                        </View>
                        <Button title="查看详情" onPress={this.showContents}/>
                    </View>
                </TouchableHighlight>
                {
                    this.state.active?
                        <View>
                            <FlatList
                                data={this.state.items}
                                renderItem={({item}) => {
                                    return(
                                        <View style={styles.orderItem}>
                                            <Text>{item.book_name}  ¥ {item.book_price} x{item.num}</Text>
                                        </View>
                                    )}
                                }
                                style={styles.list}
                                keyExtractor={item => item.cart_item_id}
                            />
                        </View>
                        : null
                }

            </View>

        );
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:"row",
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "#002200",
        width: '100%'
    },
    time: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 8,
        textAlign: 'center',
    },
    price: {
        fontSize:14,
        fontWeight: '400',
        textAlign: 'center',
        color: '#dd0000'
    },
    rightContainer: {
        flex: 1,
        paddingRight:10,
    },
    list: {
        marginLeft: '10%',
        marginTop: '5%'
    },
    orderItem: {
        display: 'flex',
        flexDirection: 'row'
    }
});
