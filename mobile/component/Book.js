import React from 'react';
import {View,Text,Image,StyleSheet, TouchableHighlight} from 'react-native';

export default function Book(props) {
    let item = props.book;

    return (
        <TouchableHighlight>
            <View style={styles.container}>
                {item.image !== 'base64' && item.image !== 'empty'?
                    <Image
                        source={{uri: item.image}}
                        style={styles.image}
                    />:<Image
                        source={require('../img/book.jpg')}
                        style={styles.image}
                    />
                }
                <View style={styles.rightContainer}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.author}>{item.author}</Text>
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
        backgroundColor: "#F5FCFF"
    },
    name: {
        fontSize: 18,
        marginBottom: 8,
        textAlign: 'center',
    },
    author: {
        fontSize:10,
        textAlign: 'center',
    },
    rightContainer: {
        flex: 1,
        paddingRight:10,
    },
    image: {
        width: 53,
        height: 81
    }
});
