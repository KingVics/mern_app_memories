import React, {useEffect, useState} from 'react'
import {Container, Grow, Grid} from "@material-ui/core"
import {useDispatch} from "react-redux"
import { getPosts } from "../../actions/post"

import Posts from "../Posts/Posts"
import Form from "../Form/Form"
//CSS
import useStyle from "./style"

export default function Home() {
    const classes =  useStyle()
    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPosts())
    }, [currentId, dispatch])
    
    return (
        <Grow in>
            <Container>
                <Grid  className={classes.mainContainer}container justify="space-between" alignItems="stretch" spacing={4}>
                    <Grid item xs={12} sm={7}>
                        <Posts  setCurrentId={setCurrentId}/>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Form  currentId={currentId} setCurrentId={setCurrentId}/>
                    </Grid>

                </Grid>
            </Container>
        </Grow>
    )
}
