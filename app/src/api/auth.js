import axios from "axios";

export const register = async (data) => {
    return await axios.request({
        method: 'POST',
        url: `http://localhost:8080/api/auth/register`,
        headers: {
            'Content-Type': 'application/json',
        },
        data: data,
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
