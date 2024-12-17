import {client} from "./client";

export const loginRequest = async (data) => {
    return await client.request({
        method: "POST",
        url: `/auth/login`,
        data: data
    })
}

export const logoutRequest = async () => {
    return await client.request({
        method: "POST",
        url: `/auth/logout`,
    })
}

export const registerRequest = async (data) => {
    return await client.request({
        method: "POST",
        url: `/auth/register`,
        data: data
    })
}

export const existEmail = async (email) => {
    return await client.request({
        method: "GET",
        url: `auth/emails/exist`,
        params: {
            email: email
        }
    })
}

export const existNickname = async (nickname) => {
    return await client.request({
        method: "GET",
        url: `auth/nicknames/exist`,
        params: {
            nickname: nickname,
        }
    })
}
