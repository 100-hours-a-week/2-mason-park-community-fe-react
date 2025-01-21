import {client} from "./client";

export const adminLoginRequest = async (data) => {
    return await client.request({
        method: "POST",
        url: `/admin/login`,
        data: data
    })
}

export const adminGetUsersRequest = async (offset, limit=5) => {
    return await client.request({
        method: "GET",
        url: `/admin/users`,
        params: {
            offset: offset,
            limit: limit
        }
    })
}

export const adminDeleteUsersRequest = async (userId) => {
    return await client.request({
        method: "DELETE",
        url: `/admin/users/${userId}`
    })
}
