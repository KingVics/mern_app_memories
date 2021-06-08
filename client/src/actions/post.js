import {CREATE, FETCH_ALL, UPDATE, LIKE, DELETE} from "../constants/actionType"
import * as api from '../api'

// Action Creators

export const getPosts = () =>  async(dispatch) => {

    try {
        const {data} = await api.fetchPost()

        dispatch({type: FETCH_ALL, payload: data});

    } catch (error) {
        console.log(error.message);
    }

} 

export const creatPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.CreatePost(post)
        dispatch({type: CREATE, payload:data})
    } catch (error) {
        console.log(error.message);
    }
}

export const updatePost = (id, post) => async(dispatch) => {
    try {
        const { data} = await api.updatePost(id, post)

        dispatch({type: UPDATE, payload:data})
    } catch (error) {
        console.log(error.message)
    }
}


export const deletePost = (id) => async(dispatch) => {
    try {
        await api.deletePost(id)

        dispatch({type: DELETE, payload:id})
    } catch (error) {
        console.log(error);
    }
}


export const likePost = (id) =>  async (dispatch) => {
    try {
        const { data } = await api.likePost(id)
        dispatch({type: LIKE, payload:data})
    } catch (error) {
        console.log(error);
    }
}