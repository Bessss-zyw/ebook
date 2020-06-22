import React from 'react';
// import {  withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import AssignmentReturnedIcon from '@material-ui/icons/AssignmentReturned';
import {addToCart} from "../services/cartService";
import {Color1Button, Color2Button} from "./ColorComponent";

const imgUrl = "http://chuantu.xyz/t6/739/1592626616x1033347913.jpg";
const EMPTY = "empty";
const USE_BASE64 = "base64";

export class BookDetail extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
        }
        console.log("BookDetail: constructor");
        console.log(this.state.user);
        console.log(this.props)
    }

    addToShoppingCart = () => {
        let id = this.state.user.userId
        let {info} = this.props
        addToCart(id, info.bookId, info.name)
    }

    render() {

        const {info} = this.props;

        if(info === null){
            return null;
        }

        const imgDisplay = (info.image === EMPTY) ? imgUrl:
            (info.image === USE_BASE64) ? info.base64.imgBase64: info.image;


        return (
            <div className={"content"}>
                <div className={"book-detail"}>
                    <div className={"book-image"}>
                        <img alt="image" src={imgDisplay} style={{width:"350px", height:"350px"}}/>
                    </div>
                    <div className={"descriptions"}>
                        <Typography variant="h5" gutterBottom className="title" span={3}>
                            {info.name}
                        </Typography>
                        <br/>
                        <Typography variant="body2" gutterBottom span={3}>
                            {"作者：" + info.author}
                        </Typography>
                        <Typography variant="body2" gutterBottom span={3}>
                            {"ISBN：" + info.isbn}
                        </Typography>
                        <Typography variant="body2" gutterBottom span={3}>
                            {"分类：" + info.type}
                        </Typography>
                        <Typography variant="body2" gutterBottom span={3}>
                            定价：{<span className={"price"}>{'¥' + info.price}</span>}
                        </Typography>
                        <Typography variant="body2" gutterBottom span={3}>
                            {info.inventory !== 0? <span>状态：有货 <span className={"inventory"}>(库存{info.inventory}件)</span></span> : <span className={"status"}>状态：无货</span>}
                        </Typography>
                        <br/>
                        <Typography variant="body1" gutterBottom span={3}>
                            作品简介：
                        </Typography>
                        <Typography variant="body2" gutterBottom span={3}>
                            {info.description}
                        </Typography>
                    </div>
                </div>
                <div className={"button-groups"}>
                    <Color1Button
                        size="large"
                        variant="contained"
                        color="primary"
                        style={{margin: 60}}
                        endIcon={<AddShoppingCartIcon/>}
                        onClick={this.addToShoppingCart}
                    >
                        加入购物车
                    </Color1Button>
                    <Color2Button
                        size="large"
                        variant="contained"
                        color="primary"
                        style={{margin: 60}}
                        endIcon={<AssignmentReturnedIcon/>}
                    >
                        立即购买
                    </Color2Button>
                </div>
            </div>


        )

    }

}

