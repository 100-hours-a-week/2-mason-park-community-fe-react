import axios from "axios";

export const createPostRequest = async (data) => {
    return await axios.request({
        method: "POST",
        url: "http://localhost:8080/api/posts",
        data: data,
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    })
}

export const getPostsRequest = async (offset, limit=5) => {
    return await axios.request({
        method: "GET",
        url: "http://localhost:8080/api/posts",
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true,
        params: {
            offset: offset,
            limit: limit
        }
    })
}

export const getPostRequest = async (postId) => {
    return await axios.request({
        method: "GET",
        url: `http://localhost:8080/api/posts/${postId}`,
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    })
}

export const deletePostRequest = async (postId) => {
    return await axios.request({
        method: "DELETE",
        url: `http://localhost:8080/api/posts/${postId}`,
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    })
}

export const updatePostRequest = async (postId, data) => {
    return await axios.request({
        method: "PATCH",
        url: `http://localhost:8080/api/posts/${postId}`,
        data: data,
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    })
}

export const postThumbsUpRequest = async (postId) => {
    return await axios.request({
        method: "POST",
        url: `http://localhost:8080/api/posts/${postId}/thumbs`,
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    })
}

export const postThumbsDownRequest = async (postId) => {
    return await axios.request({
        method: "DELETE",
        url: `http://localhost:8080/api/posts/${postId}/thumbs`,
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    })
}