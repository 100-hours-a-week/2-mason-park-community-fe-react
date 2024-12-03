import axios from "axios";

export const createPost = async (data) => {
    return await axios.request({
        method: "POST",
        url: "http://localhost:8080/api/posts",
        data: data,
        withCredentials: true
    })
}