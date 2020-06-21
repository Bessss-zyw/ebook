import React, { useState} from 'react';
import {apiUrl, AuthContext} from '../utils/util';
import {AsyncStorage, StyleSheet, View, Dimensions, Text, TextInput, Button, Alert} from 'react-native';
import {userAuth} from '../utils/constants';

let isSuccess = false;
let {width,height} = Dimensions.get('window');
const LOGIN_URL = apiUrl + "/login";

function fetchData({username,password,signIn}) {
    fetch(LOGIN_URL,{
        method:'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body:JSON.stringify({
            "username":username,
            "password":password,
        }),
    })
        .then((response) => {
            let _storeData = async () => {
                try {
                    await AsyncStorage.setItem("@Bookstore:token",'exist');
                } catch (error) {
                    Alert.alert("Error saving data!");
                }
            };
            _storeData().then(r => {});
            return response.json();
        })
        .then((responseData) => {
            console.log(responseData);
            isSuccess = (responseData.status == 0 ? true:false);
            if(isSuccess){
                signIn();
                userAuth.userId = responseData.data.userId;
                userAuth.username = responseData.data.username;
                userAuth.userType = responseData.data.userType;
            }else{
                Alert.alert("用户名或密码错误！");
            }
        })
        .catch((error)=>{
            console.error(error);
        });
}

export default function Login(){
    const [username,setUserName] = useState('zyw');
    const [password,setPassword]=useState('zhangyiwen123');
    const { signIn } = React.useContext(AuthContext);

    return (
        <View style={{ flex: 1}}>
            <View style={styles.container}>
                <Text style={styles.titleStyle}>登陆</Text>
                <TextInput
                    style={styles.textInputStyle}
                    onChangeText={text => setUserName(text)}
                    value={username}
                    placeholder={'请输入用户名'}
                    autoCapitalize="none"
                />

                <TextInput
                    style={styles.textInputStyle}
                    placeholder='请输入密码'
                    onChangeText={text => setPassword(text)}
                    value={password}
                    password={true}
                    autoCapitalize="none"
                />

                {/*登录*/}
                <Button style={styles.loginBtnStyle}
                        title="登录"
                        onPress={() => {
                            console.log(username);
                            console.log(password);
                            fetchData({username,password,signIn});}
                        }>
                    <Text style={{color:'white'}}>登录</Text>
                </Button>

                {/*设置*/}
                <View style={styles.settingStyle}>
                    <Text>忘记密码</Text>
                    <Text>注册</Text>
                </View>

            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // 侧轴的对齐方式
        justifyContent: "center",
        alignItems:'center',
        backgroundColor: '#add8e6'
    },
    textInputStyle: {
        width:width*0.9,
        height:40,
        backgroundColor:'white',
        textAlign:'center',
        marginBottom:5
    },
    loginBtnStyle: {
        width: width*0.9,
        height: 40,
        backgroundColor:'blue',
        marginTop:30,
        marginBottom: 20,
        borderRadius:10
    },
    settingStyle: {
        width: width*0.85,
        height: 40,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    titleStyle: {
        fontSize:40,
        alignItems:'center',
        paddingBottom:10
    },
});
