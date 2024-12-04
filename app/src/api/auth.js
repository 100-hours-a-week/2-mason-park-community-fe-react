import axios from "axios";

export const loginRequest = async (data) => {
    return await axios.request({
        method: "POST",
        url: "http://localhost:8080/api/auth/login",
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
        data: data,
    })
}

export const logoutRequest = async () => {
    return await axios.request({
        method: "POST",
        url: "http://localhost:8080/api/auth/logout",
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
    })
}

export const registerRequest = async (data) => {
    return await axios.request({
        method: 'POST',
        url: `http://localhost:8080/api/auth/register`,
        headers: {
            'Content-Type': 'application/json',
        },
        data: data,
        withCredentials: true
    })
}

export const existEmail = async (data) => {
    return await axios.request({
        method: 'GET',
        url: `http://localhost:8080/api/auth/emails/exist`,
        headers: {
            'Content-Type': 'application/json',
        },
        params: {
            email: data
        }
    });
}

export const existNickname = async (data) => {
    return await axios.request({
        method: 'GET',
        url: `http://localhost:8080/api/auth/nicknames/exist`,
        headers: {
            'Content-Type': 'application/json',
        },
        params: {
            nickname: data
        }
    })
}
