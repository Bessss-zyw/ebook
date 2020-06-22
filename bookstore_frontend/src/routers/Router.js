import React from 'react';
import { Router, Route, Switch, Redirect} from 'react-router-dom';
import PrivateRoute from './PrivateRoute'
import LogRoute from './LogRoute'
import HomeView from "../view/HomeView";
import LoginView from '../view/LoginView'
import {history} from "../utils/history";
import BookView from "../view/BookView";
import SignUpView from "../view/SignUpView";
import ProfileView from "../view/ProfileView";
import CartView from "../view/CartView";
import BookListView from "../view/BookListView";
import AccountView from "../view/AccountView";
import OrderView from "../view/OrderView";
import AddView from "../view/AddView";
import StatisticBookView from "../view/StatisticBookView";
import StatisticUserView from "../view/StatisticUserView";

class BasicRoute extends React.Component{

    constructor(props) {
        super(props);

        history.listen((location, action) => {
            // clear alert on location change
            console.log(location,action);
        });
    }

    render(){
        return(
            <Router history={history}>
                <Switch>
                    <LogRoute exact path="/login" component={LoginView} />
                    <LogRoute exact path="/sign-up" component={SignUpView} />
                    <PrivateRoute exact path="/" component={HomeView} />
                    <PrivateRoute exact path="/statisticBook" component={StatisticBookView} />
                    <PrivateRoute exact path="/statisticUser" component={StatisticUserView} />
                    <PrivateRoute exact path="/add" component={AddView} />
                    <PrivateRoute exact path="/books" component={BookListView} />
                    <PrivateRoute exact path="/profile" component={ProfileView} />
                    <PrivateRoute exact path="/cart" component={CartView} />
                    <PrivateRoute exact path="/orders" component={OrderView} />
                    <PrivateRoute exact path="/accounts" component={AccountView} />
                    <PrivateRoute exact path="/bookDetails" component={BookView} />
                    <Redirect from="/*" to="/" />
                </Switch>
            </Router>
        )
    }
}

export default BasicRoute;
