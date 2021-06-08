import React, {useState} from 'react';
import { Avatar, Button, Paper, Grid, Typography, container, Container, TextField} from "@material-ui/core"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import {GoogleLogin} from "react-google-login"
import {useDispatch} from "react-redux"
import {useHistory} from "react-router-dom"
import {signUp, signIn} from "../../actions/auth"

import Icon from "./Icon"
import Input from "./input"
import useStyle from "./style"

const initiateState = {firstName: "", lastName: "", email: "", password: "", confirmPassword: ""}
const Auth = () => {
    const classes = useStyle()
    const dispatch = useDispatch()
    const history = useHistory(); 
    const [formData, setFormData] = useState(initiateState)
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setisSignup] = useState(false)
    const handleShowPassword = () => setShowPassword(!showPassword);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(isSignup) {
            dispatch(signUp(formData, history))
        }

        else {
            dispatch(signIn(formData, history))
        }
    
    };

    
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const switchMode = () => {
        setisSignup(!isSignup)
        setShowPassword(!showPassword);
    };

    const googleSuccess= async (res) => {
        const result= res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({type: "AUTH", data: {result, token}})
            history.push('/')
        } catch (error) {
            console.log(error);
        }

    }

    const googleFailure = () => {
        console.log('Google sign in was unsuccessful');
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignup ? 'Sign up' : 'Sign in'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                                </>
                            )}
                            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                            { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary">{isSignup ? 'Sign up' : 'Sign in'}</Button>
                    <GoogleLogin 
                        clientId="602959298848-hp2t69gq5igl9i68qnaad5g54n4eh21c.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                                Google Sign In
                            </Button>
                        )}

                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"

                    />
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
                            </Button>
                        </Grid>
                    </Grid>
                </form>

            </Paper>
        </Container>
    );
}

export default Auth;
