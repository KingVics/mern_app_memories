import React from 'react'
import {BrowserRouter as Router, Switch, Route } from "react-router-dom"
import {Container} from "@material-ui/core"



import Nav from './components/NavBar/Nav'
import Home from './components/Home/home'
import Auth from "./components/Auth/auth"





const  App = () => {

    return (
        <Router>
            <Container maxWidth="lg">
                <Nav />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/auth" component={Auth} />
                </Switch>
            
            </Container>

        </Router>
        
    )
}

export default App;
