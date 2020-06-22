import React from 'react';
import {Layout} from 'antd'
import '../css/bookDetail.css'
import {withRouter} from "react-router-dom";
import {getBook} from "../services/bookService";
import {BookDetail} from "../components/BookDetail";
import WrappedAdminDetailForm from "../components/admin/AdminBookDetail";
// import {message} from 'antd';

const { Content, Footer } = Layout;

class BookView extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            bookInfo: null,
            user: JSON.parse(localStorage.getItem("user"))
        }
    }

    componentWillMount() {
        if (this.props.location.state == null){
            const callback = (data) => {
                console.log(data);
                this.setState({
                    bookInfo: data
                });
                console.log(this.state)
            }
            // get book_id
            let id = parseInt(this.props.location.search.slice(4));
            console.log(id);

            getBook(id, callback);
        }
        else this.setState({
            bookInfo: this.props.location.state
        })
    }

    render(){
        return(
            <div className="layout">

                <Layout>
                    <Content style={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
                        <div>
                            {
                                this.state.user.userType === 0?
                                    <BookDetail info={this.state.bookInfo}/>:
                                    <WrappedAdminDetailForm info={this.state.bookInfo}/>
                            }
                            <div className={"foot-wrapper"}>
                            </div>
                        </div>
                    </Content>
                </Layout>
                <Footer/>
            </div>
        );
    }
}

export default withRouter(BookView);
