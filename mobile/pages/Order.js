import React, { Component } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {View, Text, AsyncStorage, FlatList, StyleSheet, Alert, DeviceEventEmitter} from 'react-native';

import {apiUrl} from '../utils/util';
import {userAuth} from '../utils/constants';
import OrderItem from '../component/OrderItem';

const GET_ORDER_URL = apiUrl +"/getUserOrder";

export default class Order extends Component {

    constructor(props) {
        super(props);
        this.state ={
            orders:[],
            isLoading: true,
        }
    }

    componentDidMount(){
        this.subscription = DeviceEventEmitter.addListener('UPDATE_ORDER',
            () => {this.update();})
        this.update();
    }

    componentWillUnmount() {
        this.subscription.remove();
    }

    update(){
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

        fetch(GET_ORDER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: formData
        })
            .then((response) => response.json())
            .then((responseData) => {
                console.log("--from Order: responseData");
                console.log(responseData);
                this.setState({
                    isLoading: false,
                    orders: responseData,
                });
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
                        <Text>Order page loading!</Text>
                    </View>
                </View>
            )
        }
        return (
            <SafeAreaView style={{ flex: 2}}>
                <FlatList
                    data={this.state.orders}
                    renderItem={({item}) => {
                        return(
                            <View style={styles.box}>
                                <OrderItem order={item}/>
                            </View>
                        )}
                    }
                    style={styles.list}
                    keyExtractor={item => item.order_id}
                />
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
