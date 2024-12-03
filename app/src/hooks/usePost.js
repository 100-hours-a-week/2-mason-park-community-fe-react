import {useEffect, useState} from "react";

const usePost = ({postId}) => {
    const [post, setPost] = useState({});

    const getPost = async () => {

    }

    useEffect(() => {

    }, [postId]);

    return {
        post
    }
}