import React, {Component} from 'react';
import {View,Text,Image,StyleSheet, Button, DeviceEventEmitter} from 'react-native';
import {Toast} from '@ant-design/react-native';
import {apiUrl} from '../utils/util';
import {userAuth} from '../utils/constants'

const ADD_TO_CART_URL= apiUrl + "/addToCart";

export default class BookDetail extends Component {
    constructor(props) {
        super(props);
        this.addToCart = this.addToCart.bind(this);
    }

    addToCart() {
        let userId = userAuth.userId;
        let book_id = this.props.route.params.detail.bookId;
        let book_name = this.props.route.params.detail.name;
        let data = {
            user_id: userId,
            book_id: book_id,
            book_name: book_name
        }
        console.log(data);

        fetch(ADD_TO_CART_URL,{
            method:'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then((response) => {
                return response.json();
            })
            .then((responseData) => {
                console.log(responseData);
                Toast.success(responseData.msg);
                DeviceEventEmitter.emit('UPDATE_CART');
            })
            .catch((error)=>{
                console.log(error);
            });
    }

    render(){
        let detail = this.props.route.params.detail;
        return (
            <View style={styles.container}>
                {detail.image !== 'base64' && detail.image !== 'empty'?
                    <Image
                        source={{uri: detail.image}}
                        style={styles.image}
                    />:<Image
                        source={require('../img/book.jpg')}
                        style={styles.image}
                    />
                }
                <View >
                    <Text style={styles.name}>{detail.name}</Text>
                </View>
                <View >
                    <Text style={styles.author}>作者：{detail.author}</Text>
                    <Text style={styles.text}>ISBD：{detail.isbn}</Text>
                    <Text style={styles.text}>类型：{detail.type}</Text>
                    <Text style={styles.text}>单价：¥{detail.price}</Text>
                    <Text style={styles.text}>库存：{detail.inventory}</Text>
                </View>
                <View>
                    <Text style={styles.description}>{detail.description}</Text>
                </View>
                <Button title="加入购物车" onPress={this.addToCart}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    name:{
        fontSize:20,
        marginTop: 40
    },
    author: {
        marginTop: 20
    },
    text: {
        marginTop: 8
    },
    image: {
        width: 200,
        height: 300
    },
    description:{
        marginTop: 20,
        paddingLeft:50,
        paddingRight:55
    }
});
