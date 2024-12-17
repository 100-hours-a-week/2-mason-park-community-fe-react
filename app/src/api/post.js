import axios from "axios";
import {client} from "./client";

export const createPostRequest = async (data) => {
    return await client.request({
        method: "POST",
        url: `/posts`,
        data: data
    })
}

export const getPostsRequest = async (offset, limit=5) => {
    return await client.request({
        method: "GET",
        url: `/posts`,
        params: {
            offset: offset,
            limit: limit
        }
    })
}

export const getPostRequest = async (postId) => {
    return await client.request({
        method: "GET",
        url: `/posts/${postId}`
    })
}

export const deletePostRequest = async (postId) => {
    return await client.request({
        method: "DELETE",
        url: `/posts/${postId}`
    })
}

export const updatePostRequest = async (postId, data) => {
    return await client.request({
        method: "PATCH",
        url: `/posts/${postId}`,
        data: data
    })
}

export const postThumbsUpRequest = async (postId) => {
    return await client.request({
        method: "POST",
        url: `/posts/${postId}/thumbs`
    })
}

export const postThumbsDownRequest = async (postId) => {
    return await client.request({
        method: "DELETE",
        url: `/posts/${postId}/thumbs`
    })
}