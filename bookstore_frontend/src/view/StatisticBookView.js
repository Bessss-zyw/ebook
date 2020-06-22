import React from 'react';
import {Layout} from 'antd'
import {withRouter} from "react-router-dom";
import {StatisticBook} from "../components/StatisticBook";
const { Content, Footer } = Layout;

class StatisticBookView extends React.Component{

    render(){
        return(
            <Layout className="layout">
                <Layout>
                    <Content style={{ padding: '40px 100px' }}>
                        <div className="cart-content">
                            <StatisticBook/>
                        </div>
                    </Content>
                </Layout>
                <Footer/>
            </Layout>
        );
    }
}

export default withRouter(StatisticBookView);
