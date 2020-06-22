import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import Tooltip from '@material-ui/core/Tooltip';

import MenuIcon from '@material-ui/icons/Menu';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AssignmentIcon from '@material-ui/icons/Assignment';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';

import {UserAvatar} from '../components/UserAvatar'
import {history} from "../utils/history";
import {CustomerAppBar} from "./ColorComponent";
import EqualizerIcon from "@material-ui/icons/Equalizer";

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },

    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
}));

export default function PrimarySearchAppBar() {
    const classes = useStyles();


    const handleClickHome = () => {
        history.replace('/', null);
    }

    const handleClickStatistic = () => {
        history.replace('/StatisticBook', null);
    }

    const handleClickBook = () => {
        history.replace('/books', null);
    }


    const handleClickCart = () => {
        history.replace('/cart', null);
    }

    const handleClickOrders = () => {
        history.replace('/orders', null);
    }


    return (
        <div className={classes.grow}>
            <CustomerAppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography color='inherit' className={classes.title} variant="h6" noWrap>
                        ebook
                    </Typography>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <Tooltip title="Home">
                            <IconButton aria-label="home page" color="inherit" onClick={handleClickHome}>
                                <HomeWorkIcon />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Report">
                            <IconButton aria-label="home page" color="inherit" onClick={handleClickStatistic}>
                                <EqualizerIcon />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Books">
                            <IconButton aria-label="books" color="inherit" onClick={handleClickBook}>
                                <LibraryBooksIcon />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Cart">
                            <IconButton aria-label="shopping cart" color="inherit" onClick={handleClickCart}>
                                <Badge badgeContent={0} color="secondary">
                                    <ShoppingCartIcon />
                                </Badge>
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Orders">
                            <IconButton aria-label="order button" color="inherit" onClick={handleClickOrders}>
                                <Badge badgeContent={0} color="secondary">
                                    <AssignmentIcon />
                                </Badge>
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Account">
                            <UserAvatar/>
                        </Tooltip>

                    </div>
                </Toolbar>
            </CustomerAppBar>
        </div>
    );
}
