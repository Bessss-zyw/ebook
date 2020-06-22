import React from 'react';
import {Layout} from 'antd'
import {withRouter} from "react-router-dom";
import {StatisticUser} from "../components/StatisticUser"
const { Content, Footer } = Layout;

class StatisticUserView extends React.Component{

    render(){
        return(
            <Layout className="layout">
                <Layout>
                    <Content style={{ padding: '40px 100px' }}>
                        <div className="cart-content">
                            <StatisticUser/>
                        </div>
                    </Content>
                </Layout>
                <Footer/>
            </Layout>
        );
    }
}

export default withRouter(StatisticUserView);
