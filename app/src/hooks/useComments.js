import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getCommentsRequest} from "../api/comment";
import {useAtom} from "jotai";
import {changeAtom} from "../store/atoms";

const useComments = () => {
    const params = useParams();
    const [isChange, setIsChange] = useAtom(changeAtom);
    const [loading, setLoading] = useState(false);
    const [comments, setComments] = useState([]);

    const getComments = async () => {
        try {
            setLoading(true);
            const res = await getCommentsRequest(params.post_id);

            if (res.status !== 200) return;

            setComments(res.data.data);
        } catch (e) {
            console.error(`${e.response.data.error} : ${e.response.data.message}`);
        }
        setLoading(false);
    }

    useEffect(() => {
        getComments();
        setIsChange(false);
    }, [isChange]);

    return {
        comments,
        loading,
    }
}

export default useComments;