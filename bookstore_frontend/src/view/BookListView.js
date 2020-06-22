import React from 'react';
import { Layout} from 'antd'

import '../css/home.css'

import {withRouter} from "react-router-dom";
import {BookDisplay} from "../components/BookDisplay";


const {Content, Footer } = Layout;

class BookListView extends React.Component{

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
                            <div >
                                <BookDisplay column={6} mode="search"/>
                            </div>
                        </Content>
                    </Layout>
                    <Footer/>
                </Layout>
            </div>

        );
    }
}

export default withRouter(BookListView);
