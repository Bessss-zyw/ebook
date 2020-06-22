import React from 'react';
import {withRouter} from "react-router-dom";
import WrappedSignUpForm from "../components/SignUpForm";
// import WrappedSignUpForm from '../components/Login'


class SignUpView extends React.Component{
    render(){
        return(
            <div className="login-page">
                <div className="login-container">
                    <div className="login-box">
                        <h1 className="page-title">Sign up</h1>
                        <div className="login-content">
                            <WrappedSignUpForm />
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}

export default withRouter(SignUpView);
