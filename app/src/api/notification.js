import {client} from "./client";

export const getNotificationsRequest = async (offset, limit=5) => {
    return await client.request({
        method: "GET",
        url: `/notifications`,
        params: {
            offset: offset,
            limit: limit
        }
    })
}

export const deleteNotificationRequest = async (notificationId) => {
    return await client.request({
        method: "DELETE",
        url: `/notifications/${notificationId}`
    })
}

export const readNotificationRequest = async (notificationId) => {
    return await client.request({
        method: "PATCH",
        url: `/notifications/${notificationId}/read`
    })
}