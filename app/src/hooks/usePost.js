import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getPostRequest} from "../api/post";
import {useAtom} from "jotai/index";
import {changeAtom} from "../store/atoms";

const usePost = () => {
    const params = useParams();

    const [isChange, setIsChange] = useAtom(changeAtom);
    const [loading, setLoading] = useState(false);
    const [post, setPost] = useState(null);

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
        setIsChange(false);
    }, [isChange]);

    return {
        post,
        loading
    }
}

export default usePost;