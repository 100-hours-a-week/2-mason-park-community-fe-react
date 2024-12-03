import axios from "axios";

export const getMyProfile = async () => {
    return await axios.request({
        method: "GET",
        url: "http://localhost:8080/api/users/me",
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true
    })
}