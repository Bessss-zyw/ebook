import React, { Component } from 'react';
import {View, Text, AsyncStorage, FlatList, StyleSheet, Alert, Button} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {apiUrl} from '../utils/util';
import Book from '../component/Book';
import {BookDetail} from './BookDetail';
const GET_BOOKS_URL = apiUrl +"/getBooks";


export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state ={
            books:[],
            isLoading: true,
        }
    }

    navigateToDetail({item}){
        this.props.navigation.push("Detail",{detail:item});
    }

    componentDidMount(){
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
        fetch(GET_BOOKS_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "search": 'null',
            }),
        })
            .then((response) => response.json())
            .then((responseData) => {
                console.log("--from Home: responseData");
                console.log(responseData);
                this.setState({
                    isLoading: false,
                    books: responseData,
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
                        <Text>Home page loading!</Text>
                    </View>
                </View>
            )
        }
        return (
            <SafeAreaView style={{ flex: 2}}>
                <FlatList
                    data={this.state.books}
                    renderItem={({item}) => {
                        return(
                            <View style={styles.box}>
                                <Book book={item}/>
                                <Text
                                    style={styles.price}
                                >¥{item.price}</Text>
                                <Text
                                    style={styles.more}
                                    onPress={()=>{this.navigateToDetail({item});}}
                                >
                                    More info
                                </Text>
                            </View>
                        )}
                    }
                    style={styles.list}
                    keyExtractor={item => item.bookId}
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
