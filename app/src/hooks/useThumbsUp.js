import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {postThumbsDownRequest, postThumbsUpRequest} from "../api/post";

const useThumbsUp = (isThumbs, count) => {
    const params = useParams();
    const [thumbs, setThumbs] = useState(isThumbs);
    const [thumbCount, setThumbCount] = useState(count);

    const thumbsUp = async () => {
        try {
            await postThumbsUpRequest(params.post_id);
            setThumbs(prev => true);
            setThumbCount(prev => prev + 1);
        } catch (e) {
            console.error(`${e.response.data.error} : ${e.response.data.message}`);
        }
    }

    const thumbsDown = async () => {
        try {
            await postThumbsDownRequest(params.post_id);
            setThumbs(prev => false);
            setThumbCount(prev => prev - 1);
        } catch (e) {
            console.error(`${e.response.data.error} : ${e.response.data.message}`);
        }
    }

    useEffect(() => {
        setThumbs(isThumbs);
        setThumbCount(count);
    }, [isThumbs, count]);

    return {
        thumbs,
        thumbCount,
        thumbsUp,
        thumbsDown,
    }
}

export default useThumbsUp;