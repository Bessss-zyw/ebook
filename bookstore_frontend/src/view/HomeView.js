import React from 'react';
import {Layout} from 'antd'

import '../css/home.css'

import {withRouter} from "react-router-dom";
import {BookCarousel} from "../components/BookCarousel";
import {BookDisplay} from "../components/BookDisplay";


const { Content, Footer } = Layout;

class HomeView extends React.Component{

    componentDidMount(){
        let user = localStorage.getItem("user");
        this.setState({user:user});
    }

    render(){
        return(
            <div>
                <Layout className="layout">
                    <Layout>
                        <Content style={{ padding: '40px 50px'}}>
                            <div className="home-content">
                                <BookCarousel />
                                <BookDisplay column={4} mode="home"/>
                            </div>
                        </Content>
                    </Layout>
                    <Footer/>
                </Layout>
            </div>

        );
    }
}

export default withRouter(HomeView);
