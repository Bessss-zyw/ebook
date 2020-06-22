import React from 'react';
import {Link} from 'react-router-dom'

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {addToCart} from "../services/cartService";
import "../css/book.css"

const CUSTOMER = 0;
const imgUrl = "http://chuantu.xyz/t6/739/1592626616x1033347913.jpg";
const EMPTY = "empty";
const USE_BASE64 = "base64";

export class Book extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
        }
    }

    addToShoppingCart = () => {
        let id = this.state.user.userId
        let {info} = this.props
        addToCart(id, info.bookId, info.name)
    }



    render() {
        const {info} = this.props;
        console.log(info.image)
        if (info.image === USE_BASE64) console.log(info.base64.imgBase64)
        return (

            <Card className="card" style={{
                maxWidth: 345,
                maxHeight: 350
            }}>
                <CardActionArea>
                    <CardMedia
                        style={{width: 180}}
                        title={info.name}
                    >
                        {
                            (info.image === EMPTY) ?
                                <img alt="book_img" src={imgUrl} className={"bookImg"}/>:
                                (info.image === USE_BASE64) ?
                                    <img alt="book_img" src={info.base64.imgBase64} className={"bookImg"}/>:
                                    <img alt="book_img" src={info.image} className={"bookImg"}/>
                        }

                    </CardMedia>
                    <CardContent style={{height: 100}}>
                        <div className="cardContent">
                            <Typography gutterBottom variant="h6" component="h2">
                                {info.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {'¥' + info.price}
                            </Typography>
                        </div>

                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Link to={{
                        pathname: '/bookDetails',
                        search: '?id=' + info.bookId,
                        state: info
                    }}
                    >
                        {
                            this.state.user.userType === CUSTOMER ?
                            <Button size="small" color="primary">更多信息</Button>:
                                <Button size="small" color="primary">修改图书信息</Button>
                        }
                    </Link>
                    {
                        this.state.user.userType === CUSTOMER?
                            <Typography variant="body2"  color="primary" id={info.book_id}
                                        onClick={this.addToShoppingCart}
                            >
                                加入购物车
                            </Typography>
                            : null
                    }

                </CardActions>
            </Card>
        );
    }

}
