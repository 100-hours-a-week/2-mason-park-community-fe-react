import {client} from "./client";

export const createCommentRequest = async (postId, data) => {
    return await client.request({
        method: "POST",
        url: `/posts/${postId}/comments`,
        data: data
    })
}

export const getCommentsRequest = async (postId) => {
    return await client.request({
        method: "GET",
        url: `/posts/${postId}/comments`
    })
}

export const updateCommentRequest = async (postId, commentId, data) => {
    return await client.request({
        method: "PATCH",
        url: `/posts/${postId}/comments/${commentId}`,
        data: data
    })
}

export const deleteCommentRequest = async (postId, commentId) => {
    return await client.request({
        method: "DELETE",
        url: `/posts/${postId}/comments/${commentId}`
    })
}