import React from 'react';
import {Layout} from 'antd'
import '../css/bookDetail.css'
import {withRouter} from "react-router-dom";
import {OrderDisplay} from "../components/OrderDisplay";

const {Content, Footer } = Layout;

class OrderView extends React.Component{

    render(){
        return(
            <Layout className="layout">
                <Layout>
                    <Content style={{ padding: '40px 100px' }}>
                        <div className="cart-content">
                            <OrderDisplay />
                        </div>
                    </Content>
                </Layout>
                <Footer/>
            </Layout>
        );
    }
}

export default withRouter(OrderView);
