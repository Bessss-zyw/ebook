import React from 'react';
import {Route, Redirect} from 'react-router-dom'
import * as userService from "../services/userService"
import {message} from "antd";
import HeaderBar from "../components/HeaderBar";
import AdminHeaderBar from "../components/admin/AdminHeaderBar";

/**
* Route inside the website like the home page or user-info page.
* by zyw
*/
export default class PrivateRoute extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isAuth: false,
            hasAuth: false,
            user: null
        };
    }

    checkCallback = (data) => {
        console.log(data);
        if (data.status >= 0) {
            this.setState({
                isAuth: true,
                hasAuth: true,
                user: JSON.parse(localStorage.getItem("user"))
            });

        } else {
            message.error(data.msg);
            localStorage.removeItem('user');
            this.setState({isAuth: false, hasAuth: true});
        }
    };

    componentDidMount() {
        userService.checkSession(this.checkCallback);
    }

    render() {

        const {component: Component, path="/",exact = false, strict = false} = this.props;

        // console.log(this.state.isAuth);

        if (!this.state.hasAuth || this.state.user === null) {
            return null;
        }

        return (
            <div>
                {
                    this.state.isAuth?
                        this.state.user.userType === 0 ? <HeaderBar/>: <AdminHeaderBar/>: null
                }
                <Route path={path} exact={exact} strict={strict} render={props => (
                    this.state.isAuth ? (
                        <Component {...props}/>
                    ) : (<Redirect to={{
                                pathname: '/login',
                                state: {from: props.location}
                            }}/>)
                )}/>
            </div>
        )
    }
}

