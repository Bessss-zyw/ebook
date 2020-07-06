import React from 'react';
import {View,Text,Image,StyleSheet, TouchableHighlight} from 'react-native';

export default function CartItem(props) {
    let item = props.item;

    return (
        <TouchableHighlight>
            <View style={styles.container}>
                <Image
                    source={require('../img/book.jpg')}
                    style={styles.image}
                />
                <View style={styles.rightContainer}>
                    <Text style={styles.name}>{item.book_name}</Text>
                    <Text style={styles.num}>x {item.num}</Text>
                </View>
            </View>
        </TouchableHighlight>
    );
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
    name: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 8,
        textAlign: 'center',
    },
    num: {
        fontSize:14,
        fontWeight: '400',
        textAlign: 'center',
        color: '#dd0000'
    },
    rightContainer: {
        flex: 1,
        paddingRight:10,
    },
    image: {
        width: 81,
        height: 81
    }
});
