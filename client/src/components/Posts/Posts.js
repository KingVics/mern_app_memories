import React from 'react';
import {Grid, CircularProgress} from "@material-ui/core"  
import {useSelector} from "react-redux"
import Post from "./Post/Post"

import useStyle from "./style"

const Posts = ({setCurrentId}) => {
    const classes =  useStyle()
    const post = useSelector((state) => state.posts)

    console.log(post);

    return (
        !post.length ? <CircularProgress />
        :
        (
            <Grid className={classes.container} container alignItems="stretch" spacing={4}>
                {post.map((post) => (
                    <Grid key={post.id} item xs={12} sm={6}>
                        <Post post={post} setCurrentId={setCurrentId}/>
                    </Grid>
                ))}
            </Grid>
        )
    );
}

export default Posts;