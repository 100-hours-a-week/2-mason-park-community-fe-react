import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {postThumbsDownRequest, postThumbsUpRequest} from "../api/post";

const useThumbsUp = (isThumbs, count) => {
    const params = useParams();
    const [thumbs, setThumbs] = useState(isThumbs);

    const thumbsUp = async () => {
        try {
            await postThumbsUpRequest(params.post_id);
            setThumbs(prev => true);
        } catch (e) {
            console.error(`${e.response.data.error} : ${e.response.data.message}`);
        }
    }

    const thumbsDown = async () => {
        try {
            await postThumbsDownRequest(params.post_id);
            setThumbs(prev => false);
        } catch (e) {
            console.error(`${e.response.data.error} : ${e.response.data.message}`);
        }
    }

    useEffect(() => {
        setThumbs(isThumbs);
    }, [isThumbs, count]);

    return {
        thumbs,
        thumbsUp,
        thumbsDown,
    }
}

export default useThumbsUp;