import {client} from "./client";

export const getMyProfileRequest = async () => {
    return await client.request({
        method: "GET",
        url: "/users/me",
    })
}

export const updateMyProfileRequest = async (data) => {
    return await client.request({
        method: "PATCH",
        url: `/users/me`,
        data: data
    })
}

export const updatePasswordRequest = async (data) => {
    return await client.request({
        method: "PATCH",
        url: `/users/me/password`,
        data: data
    })
}

export const withdrawRequest = async () => {
    return await client.request({
        method: "DELETE",
        url: `/users/me/withdraw`
    })
}