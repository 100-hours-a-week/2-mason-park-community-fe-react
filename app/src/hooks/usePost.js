import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getPostRequest} from "../api/post";

const usePost = () => {
    const params = useParams();

    const [loading, setLoading] = useState(false);
    const [post, setPost] = useState({});

    const getPost = async () => {
        try {
            setLoading(true);
            const res = await getPostRequest(params.post_id);

            if (res.status !== 200) return;

            setPost(res.data.data);
        } catch (e) {
            console.error(`${e.response.data.error} : ${e.response.data.message}`);
        }
        setLoading(false);
    }

    useEffect(() => {
        getPost();
    }, [params.post_id]);

    return {
        post,
        loading
    }
}

export default usePost;