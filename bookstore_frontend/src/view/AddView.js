import React from 'react';
import {Layout} from 'antd'
import '../css/bookDetail.css'
import {withRouter} from "react-router-dom";
import WrappedAdminAddBookForm from "../components/admin/AdminAddBook";
const { Content, Footer } = Layout;

class AddView extends React.Component{

    render(){
        return(
            <Layout className="layout">
                <Layout>
                    <Content style={{ padding: '40px 100px' }}>
                        <div className="cart-content">
                            <WrappedAdminAddBookForm/>
                        </div>
                    </Content>
                </Layout>
                <Footer/>
            </Layout>
        );
    }
}

export default withRouter(AddView);
