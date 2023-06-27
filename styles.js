import React from 'react'
import {
    Typography,
    AppBar,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    CssBaseline,
    Grid,
    Toolbar,
    Container,
    ButtonGroup, Button, makeStyles
} from '@material-ui/core'
import { PhotoCamera } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6)
    },
    icon: {
      marginRight: '20px'
    },
    buttons: {
        marginTop: '40px'
    },
    cardGrid: {
        padding: '20px 0'
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    cardMedia : {
        paddingTop: '56.25%'
    },
    cardContent: {
        flexGrow: 1
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: '50px'
    },

}))

export default useStyles;