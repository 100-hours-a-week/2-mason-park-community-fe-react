import axios from "axios";

export const createPostRequest = async (data) => {
    return await axios.request({
        method: "POST",
        url: "http://localhost:8080/api/posts",
        data: data,
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