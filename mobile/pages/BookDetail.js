import React, {Component} from 'react';
import {View,Text,Image,StyleSheet} from 'react-native';

export default class BookDetail extends Component {

    render(){
        // console.log(this.props.route.params.detail);
        let detail = this.props.route.params.detail;
        return (
            <View style={styles.container}>
                <Image
                    source={{uri: detail.image}}
                    style={styles.image}
                />
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
