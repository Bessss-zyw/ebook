import React from 'react';
import {Layout} from 'antd'
import '../css/bookDetail.css'
import {withRouter} from "react-router-dom";
import {AdminAccounts} from "../components/admin/AdminAccounts";

const { Content, Footer } = Layout;

class AccountView extends React.Component{

    render(){
        return(
            <Layout className="layout">
                <Layout>
                    <Content style={{ padding: '40px 100px' }}>
                        <div className="cart-content">
                            <AdminAccounts/>
                        </div>
                    </Content>
                </Layout>
                <Footer/>
            </Layout>
        );
    }
}

export default withRouter(AccountView);
