import React from 'react';
import {AsyncStorage, View, Text, Button, Image, StyleSheet} from 'react-native';
import {apiUrl, AuthContext} from '../utils/util';

const LOGOUT_URL = apiUrl + "/logout";

export default function Profile(props){
    const {signOut} = React.useContext(AuthContext);
    const logOut= ()=> {
        AsyncStorage.removeItem("@Bookstore:token").then(r => {});
        signOut();
        fetch(LOGOUT_URL,{
            method:'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({}),
        })
            .then((response) => {})
            .then((responseData) => {})
            .catch((error)=>{});
    }

    return(
        <View>

            <View style={styles.infoContainer}>
                {/*<Image*/}
                {/*    style={styles.icon}*/}
                {/*    source={{uri: 'https://i.loli.net/2020/05/30/bANypgG3wOfQqTE.jpg'}}*/}
                {/*/>*/}
                <Image
                    style={styles.icon}
                    source={require('../img/avatar.png')}
                />
                <Text>My Profile</Text>
                <Text>nickname: {props.userInfo.nickname}</Text>
                <Text>email: {props.userInfo.email}</Text>
                <Text>tel: {props.userInfo.tel}</Text>
                <Text>address: {props.userInfo.address}</Text>
                <Button title="退出账户" onPress={logOut}/>
            </View>
        </View>

    );


}

const styles = StyleSheet.create({
    infoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        width: 150,
        height: 150,
        marginBottom: 100,
        borderRadius: 50
    }
});


