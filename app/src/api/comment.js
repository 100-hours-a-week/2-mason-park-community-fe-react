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
        withCredentials: true
    })
}