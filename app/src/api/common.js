import {client} from "./client";
import axios from "axios";

export const createPreSignedUrl = async (data) => {
    return await client.request({
        method: "POST",
        url: "/s3/pre-signed",
        data: data
    })
}

export const uploadImageToS3 = async (preSignedUrl, image) => {
    return await axios.request({
        method: "PUT",
        url: preSignedUrl,
        data: image
    });
}