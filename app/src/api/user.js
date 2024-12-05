import axios from "axios";

export const getMyProfileRequest = async () => {
    return await axios.request({
        method: "GET",
        url: "http://localhost:8080/api/users/me",
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true
    })
}

export const updateMyProfileRequest = async (data) => {
    return await axios.request({
        method: "PATCH",
        url: "http://localhost:8080/api/users/me",
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
        data: data,
    })
}

export const updatePasswordRequest = async (data) => {
    return await axios.request({
        method: "PATCH",
        url: "http://localhost:8080/api/users/me/password",
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
        data: data,
    })
}