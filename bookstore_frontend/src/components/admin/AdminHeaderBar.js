import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import Tooltip from '@material-ui/core/Tooltip';

import MenuIcon from '@material-ui/icons/Menu';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import AssignmentIcon from '@material-ui/icons/Assignment';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EqualizerIcon from '@material-ui/icons/Equalizer';

import {UserAvatar} from '../../components/UserAvatar'
import {history} from "../../utils/history";
import {AdminAppBar} from "../ColorComponent";
import MenuItem from "@material-ui/core/MenuItem";
import * as userService from "../../services/userService";
import Menu from "@material-ui/core/Menu";


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

export default function AdminHeaderBar() {
    const classes = useStyles();

    const [anchorEl, handleChangeAnchorEl] = useState({anchorEl: null});

    const handleClickHome = () => {
        history.replace('/', null);
    }

    const handleClickStatisticBook = () => {
        history.replace('/statisticBook', null);
    }

    const handleClickStatisticUser = () => {
        history.replace('/statisticUser', null);
    }

    const handleClickAdd = () => {
        history.replace('/add', null);
    }

    const handleClickBooks = () => {
        history.replace('/books', null);
    }

    const handleClickOrders = () => {
        history.replace('/orders', null);
    }

    const handleClickAccounts = () => {
        history.replace('/accounts', null);
    }


    return (
        <div className={classes.grow}>
            <AdminAppBar position="static">
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

                        <Tooltip title="View Book Statistic">
                            <IconButton aria-label="home page" color="inherit" onClick={handleClickStatisticBook}>
                                <EqualizerIcon />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="View User Statistic">
                            <IconButton aria-label="home page" color="inherit" onClick={handleClickStatisticUser}>
                                <EqualizerIcon />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Add new book">
                            <IconButton aria-label="home page" color="inherit" onClick={handleClickAdd}>
                                <AddCircleIcon />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="View all books">
                            <IconButton aria-label="shopping cart" color="inherit" onClick={handleClickBooks}>
                                <Badge badgeContent={0} color="secondary">
                                    <LibraryBooksIcon />
                                </Badge>
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="View all orders">
                            <IconButton aria-label="order button" color="inherit" onClick={handleClickOrders}>
                                <Badge badgeContent={0} color="secondary">
                                    <AssignmentIcon />
                                </Badge>
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="View all accounts">
                            <IconButton aria-label="order button" color="inherit" onClick={handleClickAccounts}>
                                <Badge badgeContent={0} color="secondary">
                                    <SupervisorAccountIcon />
                                </Badge>
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Account">
                            <UserAvatar/>
                        </Tooltip>

                    </div>
                </Toolbar>
            </AdminAppBar>
        </div>
    );
}
