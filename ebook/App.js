import * as React from 'react';
import {Button, Text, View, AsyncStorage} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {apiUrl, AuthContext} from './utils/util';

import Cart from './pages/Cart';
import Home from './pages/Home';
import Order from './pages/Order';
import Login from './pages/Login';
import UserInfo from './pages/UserInfo';
import Splash from './pages/Splash'
import BookDetail from './pages/BookDetail'

const CHECK_SESSION_URL = apiUrl + "/checkSession";


const BookStack = createStackNavigator();
function HomeAndDetail() {
    return(
        <BookStack.Navigator>
            <BookStack.Screen name="Home" component={Home} />
            <BookStack.Screen name="Detail" component={BookDetail} />
        </BookStack.Navigator>
    )
}

const Main = createBottomTabNavigator();
function MainTab() {
    return(
      <Main.Navigator>
          <Main.Screen name="Home" component={HomeAndDetail} />
          <Main.Screen name="Cart" component={Cart} />
          <Main.Screen name="Order" component={Order} />
          <Main.Screen name="UserInfo" component={UserInfo} />
      </Main.Navigator>
    )
}

const Stack = createStackNavigator();
export default function App() {
    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        userToken: action.token,
                        isLoading: false,
                    };
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        isSignOut: false,
                        userToken: action.token,
                    };
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        isSignOut: true,
                        userToken: null,
                    };
            }
        },
        {
            isLoading: true,
            isSignOut: false,
            userToken: null,
        }
    );

    const authContext = React.useMemo(
        () => ({
            signIn: async data => {
                dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
            },
            signOut: () => dispatch({ type: 'SIGN_OUT' }),
            signUp: async data => {
                dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
            },
        }),
        []
    )

    React.useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const Async = async () => {
            let userToken;
            try {
                userToken = await AsyncStorage.getItem('@Bookstore:token');
            } catch (e) {
                // Restoring token failed
            }

            // After restoring token, we may need to validate it in production apps
            fetch(CHECK_SESSION_URL,{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({}),
            })
                .then((response) =>{
                    return response.json();
                })
                .then((responseData) => {
                    if(responseData.status < 0) {
                        AsyncStorage.removeItem("@Bookstore:token");
                        dispatch({ type: 'RESTORE_TOKEN', token: null });
                    }
                    else dispatch({ type: 'RESTORE_TOKEN', token: userToken });
                })
                .catch((error)=>{
                    console.error(error);
                });
        };

        Async();
    },
        []);


    return(
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                <Stack.Navigator>
                    {state.isLoading ? (
                        <Stack.Screen name="Splash" component={Splash} />
                    ) : state.userToken == null ? (
                        <Stack.Screen
                            name="Login"
                            component={Login}
                            options={{
                                title: 'Log in',
                                animationTypeForReplace: state.isSignOut ? 'pop' : 'push',
                                headerShown:false,
                            }}
                        />
                    ) : (
                        // User is signed in
                        <Stack.Screen name="Main" component={MainTab} options={{headerShown:false}}/>
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        </AuthContext.Provider>
    )


}

// return (
//   <NavigatorStack.Navigator>
//     <NavigatorStack.Screen name="login" component={Login} />
//     <NavigatorStack.Screen name="main" component={MainTab} />
//   </NavigatorStack.Navigator>
// );


//
// function DetailsScreen() {
//   return (
//     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//       <Text>Details!</Text>
//       <Text>Details!</Text>
//     </View>
//   );
// }
//
// function HomeScreen({navigation}) {
//   return (
//     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//       <Text>Home screen</Text>
//       <Button
//         title="Go to Details"
//         onPress={() => navigation.navigate('Details')}
//       />
//     </View>
//   );
// }
//
// function SettingsScreen({navigation}) {
//   return (
//     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//       <Text>Settings screen</Text>
//       <Button
//         title="Go to Details"
//         onPress={() => navigation.navigate('Details')}
//       />
//     </View>
//   );
// }
//
// const HomeStack = createStackNavigator();
//
// function HomeStackScreen() {
//   return (
//     <HomeStack.Navigator>
//       <HomeStack.Screen name="Home" component={HomeScreen} />
//       <HomeStack.Screen name="Details" component={DetailsScreen} />
//     </HomeStack.Navigator>
//   );
// }
//
// const SettingsStack = createStackNavigator();
//
// function SettingsStackScreen() {
//   return (
//     <SettingsStack.Navigator>
//       <SettingsStack.Screen name="Settings" component={SettingsScreen} />
//       <SettingsStack.Screen name="Details" component={DetailsScreen} />
//     </SettingsStack.Navigator>
//   );
// }
//
// const Tab = createBottomTabNavigator();
//
// export default function App() {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator>
//         <Tab.Screen name="Home" component={HomeStackScreen} />
//         <Tab.Screen name="Settings" component={SettingsStackScreen} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }
