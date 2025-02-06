import {client} from "./client";

export const readNotificationRequest = async (notificationId) => {
    return await client.request({
        method: "PATCH",
        url: `/notifications/${notificationId}/read`
    })
}

export const getUnreadNotificationsRequest = async (offset, limit=5) => {
    return await client.request({
        method: "GET",
        url: `/notifications/unread`,
        params: {
            offset: offset,
            limit: limit
        }
    })
}