import React,{useEffect, useState} from 'react'
import {Link} from "react-router-dom"
import { AppBar, Toolbar, Typography, Button, Avatar} from "@material-ui/core"
import {useDispatch} from "react-redux"
import {useHistory, useLocation} from "react-router-dom"
import decode from 'jwt-decode';
import * as actionType from '../../constants/actionType';
import memories from "../../images/mem.jpg"
import useStyle from "./style.js"




const  NavBar = () => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

    const logOut = () => {
        dispatch({ type: actionType.LOGOUT });
    
        history.push('/auth');
    
        setUser(null);
    };
    
    useEffect(() => {
        const token = user?.token;

        if (token) {
        const decodedToken = decode(token);

        if (decodedToken.exp * 1000 < new Date().getTime()) logOut();
        }

    setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location])
    return (
        <>
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography className={classes.heading} variant="h2" align="center" component={Link} to="/">Memories</Typography>
                <img className={classes.image} src={memories} alt="memories" height="60"/>
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logOut}>Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} variant="contained" color="primary" to="/auth">Signin</Button>
                )}

            </Toolbar>
                
        </AppBar>
        </>
    )
}

export default NavBar;
