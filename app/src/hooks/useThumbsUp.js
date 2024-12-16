import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {postThumbsDownRequest, postThumbsUpRequest} from "../api/post";
import {useAtom} from "jotai/index";
import {changeAtom} from "../store/atoms";

const useThumbsUp = (isThumbs) => {
    const params = useParams();
    const [isChange, setIsChange] = useAtom(changeAtom);
    const [thumbs, setThumbs] = useState(isThumbs);

    const thumbsUp = async () => {
        try {
            await postThumbsUpRequest(params.post_id);
            setThumbs(prev => true);
            setIsChange(prev => true);
        } catch (e) {
            console.error(`${e.response.data.error} : ${e.response.data.message}`);
        }
    }

    const thumbsDown = async () => {
        try {
            await postThumbsDownRequest(params.post_id);
            setThumbs(prev => false);
            setIsChange(prev => true);
        } catch (e) {
            console.error(`${e.response.data.error} : ${e.response.data.message}`);
        }
    }

    useEffect(() => {
        setThumbs(isThumbs);
    }, [isThumbs]);

    return {
        thumbs,
        thumbsUp,
        thumbsDown,
    }
}

export default useThumbsUp;