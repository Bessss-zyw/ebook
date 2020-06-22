import React from 'react';
import {Route, Redirect} from 'react-router-dom'
import * as userService from "../services/userService"
// import {message} from "antd";

export class LogRoute extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isAuth: false,
            hasAuth: false,
        };
    }

    checkAuth = (data) => {
        console.log(data);
        if (data.status >= 0) {
            this.setState({isAuth: true, hasAuth: true});
        } else {
            localStorage.removeItem('user');
            this.setState({isAuth: false, hasAuth: true});
        }
    };


    componentDidMount() {
        userService.checkSession(this.checkAuth);
    }


    render() {

        const {component: Component, path = "/", exact = false, strict = false} = this.props;

        // console.log(this.state.isAuth);

        if (!this.state.hasAuth) {
            return null;
        }

        return <Route path={path} exact={exact} strict={strict} render={props => (
            this.state.isAuth ? (
                <Redirect to={{
                    pathname: '/',
                    state: {from: props.location}
                }}/>
            ) : (
                <Component {...props}/>
            )
        )}/>
    }
}

export default LogRoute
