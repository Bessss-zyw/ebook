import React, { Component } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {View, Text, AsyncStorage, FlatList, StyleSheet, Alert, Button, DeviceEventEmitter} from 'react-native';

import {apiUrl} from '../utils/util';
import {userAuth} from '../utils/constants';
import CartItem from '../component/CartItem';

const GET_CART_URL = apiUrl +"/getCart";
const CREATE_ORDER_URL = apiUrl +"/createOrder";
const ADD_ORDER_ITEM_URL = apiUrl +"/addOrderItem";
const CLEAR_CART_URL = apiUrl +"/clearCart";

export default class Cart extends Component {

    constructor(props) {
        super(props);
        this.state ={
            cartItems:[],
            isLoading: true,
        }
        this.makeOrder = this.makeOrder.bind(this)
    }

    componentDidMount(){
        this.subscription = DeviceEventEmitter.addListener('UPDATE_CART',
            () => {this.update();})
        this.update();
    }

    componentWillUnmount() {
        this.subscription.remove();
    }

    update() {
        const _retrieveData = async () => {
            try {
                const value = await AsyncStorage.getItem('@Bookstore:token');
                if (value !== null) {
                    this.fetchData();
                }
            } catch (error) {
                Alert.alert("Error retrieving data!");
            }
        }
        _retrieveData().then(r => {});
    }

    fetchData() {
        let userId = userAuth.userId;
        let formData = new FormData();
        formData.append('user_id',userId);

        fetch(GET_CART_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: formData
        })
            .then((response) => response.json())
            .then((responseData) => {
                console.log("--from Cart: responseData");
                console.log(responseData);
                this.setState({
                    isLoading: false,
                    cartItems: responseData,
                });
            })
            .catch((error)=> {
                console.error(error);
            });
    }

    makeOrder() {
        let userId = userAuth.userId;
        let formData = new FormData();
        formData.append('user_id',userId);

        let myThis = this;
        fetch(CREATE_ORDER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: formData
        })
            .then((response) => response.json())
            .then((responseData) => {
                console.log("--from Cart makeOrder: responseData");
                console.log(responseData);
                let items = myThis.state.cartItems;
                for (let i = 0;i < items.length; i++){
                    this.addItem(responseData.order_id, items[i].cart_item_id);
                }
                this.clearCart();
                DeviceEventEmitter.emit('UPDATE_ORDER');
                DeviceEventEmitter.emit('UPDATE_HOME');
            })
            .catch((error)=> {
                console.error(error);
            });
    }

    addItem(order_id, cart_item_id) {
        let formData = new FormData();
        formData.append('order_id',order_id);
        formData.append('cart_id',cart_item_id);

        fetch(ADD_ORDER_ITEM_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: formData
        })
            .then((response) => response.json())
            .then((responseData) => {
                console.log("--from Cart addItem: responseData");
                console.log(responseData);
            })
            .catch((error)=> {
                console.error(error);
            });
    }

    clearCart(){
        let userId = userAuth.userId;
        let formData = new FormData();
        formData.append('user_id',userId);

        fetch(CLEAR_CART_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: formData
        })
            .then((response) => response.json())
            .then((responseData) => {
                console.log("--from Cart clearCart: responseData");
                console.log(responseData);
                DeviceEventEmitter.emit('UPDATE_CART')
            })
            .catch((error)=> {
                console.error(error);
            });
    }

    render(){
        if(this.state.isLoading){
            return(
                <View style={{alignItems: 'center'}}>
                    <View style={{alignItems: 'center', marginTop: 50}}>
                        <Text>Cart page loading!</Text>
                    </View>
                </View>
            )
        }
        return (
                <SafeAreaView style={{ flex: 2}}>
                    <FlatList
                        data={this.state.cartItems}
                        renderItem={({item}) => {
                            return(
                                <View style={styles.box}>
                                    <CartItem item={item}/>
                                </View>
                            )}
                        }
                        style={styles.list}
                        keyExtractor={item => item.cart_item_id}
                    />
                    <Button title="全部购买" onPress={this.makeOrder}/>
                    <Button title="清空购物车" onPress={this.clearCart}/>
                </SafeAreaView>


        );
    }


}

const styles = StyleSheet.create({
    list: {
        paddingLeft:10,
        paddingRight:5,
        backgroundColor: '#F5FCFF',
    },
    box: {
        marginBottom: 20,
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        borderTopColor: '#000000'
    },
    price: {
        alignSelf: 'center',
        marginLeft: 300,
        fontSize: 12,
        color: '#bf360c'
    },
    more: {
        alignSelf: 'center',
        marginLeft: 300,
        fontSize: 12,
        color: '#ef6c00'
    }
});
