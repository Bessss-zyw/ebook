import {withStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AppBar from '@material-ui/core/AppBar';

export const Color1Button = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText('#fdd835'),
        backgroundColor: '#fdd835',
        '&:hover': {
            backgroundColor: '#fdd835',
        },
    },
}))(Button);

export const Color2Button = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText('#f44336'),
        backgroundColor: '#f44336',
        '&:hover': {
            backgroundColor: '#f44336',
        },
    },
}))(Button);

export const CustomerAppBar = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText('#ffc107'),
        backgroundColor: '#ffc107',
        '&:hover': {
            backgroundColor: '#ffc107',
        },
    },
}))(AppBar);


export const AdminAppBar = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText('#5c6bc0'),
        backgroundColor: '#5c6bc0',
        '&:hover': {
            backgroundColor: '#5c6bc0',
        },
    },
}))(AppBar);
