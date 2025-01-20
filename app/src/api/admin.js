import {client} from "./client";

export const adminLoginRequest = async (data) => {
    return await client.request({
        method: "POST",
        url: `/admin/auth/login`,
        data: data
    })
}
