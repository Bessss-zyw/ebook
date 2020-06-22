import React from 'react';
import {Layout} from 'antd'
import '../css/bookDetail.css'
import {withRouter} from "react-router-dom";
import {Cart} from "../components/Cart";

const { Content, Footer } = Layout;

class CartView extends React.Component{

    render(){
        return(
            <Layout className="layout">
                <Layout>
                    <Content style={{ padding: '40px 100px' }}>
                        <div className="cart-content">
                            <Cart/>
                        </div>
                    </Content>
                </Layout>
                <Footer/>
            </Layout>
        );
    }
}

export default withRouter(CartView);
