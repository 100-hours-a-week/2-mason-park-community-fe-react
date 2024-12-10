import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useAtom} from "jotai";
import {commentAtom} from "../store/atoms";
import {getCommentsRequest} from "../api/comment";

const useComments = () => {
    const params = useParams();
    const [comment, setComment] = useAtom(commentAtom);
    const [comments, setComments] = useState([]);

    const getComments = async () => {
        try {
            const res = await getCommentsRequest(params.post_id);

            if (res.status !== 200) return;

            setComments(res.data.data);
        } catch (e) {
            console.error(`${e.response.data.error} : ${e.response.data.message}`);
        }
    }

    useEffect(() => {
        getComments();
        setComment(prev => {
            return {...prev, isNew: false};
        });
    }, [comment.isNew]);

    return {
        comments,
        comment,
        setComment
    }
}

export default useComments;