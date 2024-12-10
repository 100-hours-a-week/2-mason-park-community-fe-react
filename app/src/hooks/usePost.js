import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getPostRequest} from "../api/post";

const usePost = () => {
    const params = useParams();

    const [post, setPost] = useState({});

    const getPost = async () => {
        try {
            const res = await getPostRequest(params.post_id);

            if (res.status !== 200) return;

            setPost(res.data.data);
        } catch (e) {
            console.error(`${e.response.data.error} : ${e.response.data.message}`);
        }
    }

    useEffect(() => {
        getPost();
    }, []);

    return {
        post
    }
}

export default usePost;