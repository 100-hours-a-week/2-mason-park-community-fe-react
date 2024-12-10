import axios from "axios";

export const createCommentRequest = async (postId, data) => {
    return await axios.request({
        method: "POST",
        url: `http://localhost:8080/api/posts/${postId}/comments`,
        data: data,
        withCredentials: true
    })
}

export const getCommentsRequest = async (postId) => {
    return await axios.request({
        method: "GET",
        url: `http://localhost:8080/api/posts/${postId}/comments`,
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    })
}

export const updateCommentRequest = async (postId, commentId, data) => {
    return await axios.request({
        method: "PATCH",
        url: `http://localhost:8080/api/posts/${postId}/comments/${commentId}`,
        headers: {
            "Content-Type": "application/json",
        },
        data: data,
        withCredentials: true
    })
}