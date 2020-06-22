import React from 'react';
import {AutoComplete, Button, Icon, Input, List, message} from 'antd'
import {Book} from './Book'
import {getBooks} from "../services/bookService";


export class BookDisplay extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            books:[],
            display:[],
            query: null
        };
    }

    componentDidMount() {

        const callback =  (data) => {
           this.setState({
               books: data,
               display: data
           });
           // console.log(this.state.books)
        };
        getBooks({"search":null}, callback);

    }

    handleChange = (value) => {
        this.setState({
            query: value
        });
    };

    handleSearch = () => {
        console.log(this.state.query);
        console.log(this.state.books.length);

        let value = this.state.query;

        if (value === null) {
            message.error("搜索内容不得为空！");
            this.setState({
                display: this.state.books
            })
            return;
        }

        let newData = JSON.parse(JSON.stringify(this.state.books));

        for (let i = 0; i < newData.length; i++){
            console.log(newData[i].name);
            console.log(newData[i].type)
            if (!newData[i].name.includes(value) && !newData[i].type.includes(value)){
                newData.splice(i, 1);
                i--;
            }
        }

        this.setState({
            display: newData,
        })
    };

    render() {
        return (
            <div>
                {
                    this.props.mode === "search"?
                    <div className="global-search-wrapper" style={{ marginTop: 0, marginBottom: 50, width: 300 }}>
                        <AutoComplete
                            className="global-search"
                            size="large"
                            style={{ width: '100%' }}
                            onSearch={this.handleChange}
                            placeholder="Search..."
                            optionLabelProp="text"
                        >
                            <Input.Search
                                allowClear
                                onSearch={this.handleSearch}
                                enterButton={
                                    <Button
                                        className="search-btn"
                                        style={{ marginRight: -12 }}
                                        size="large"
                                        type="primary"
                                    >
                                        <Icon type="search" />
                                    </Button>
                                }
                            />
                        </AutoComplete>
                    </div>: null
                }
                <List
                    style={{margin: '0px 50px'}}
                    grid={{gutter: 10, column: this.props.column}}
                    dataSource={this.state.display}
                    pagination={{
                        onChange: page => {
                            console.log(page);
                        },
                        pageSize: this.props.column * 2,
                    }}

                    renderItem={item => (
                        <List.Item>
                            <Book info={item} />
                        </List.Item>
                    )}
                />
            </div>

        );
    }

}
