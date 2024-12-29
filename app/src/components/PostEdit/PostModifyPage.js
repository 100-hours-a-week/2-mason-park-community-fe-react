import S from './PostEditPage.styled';
import PostForm from "./PostForm";
import {useAtom} from "jotai/index";
import {headerAtom, userAtom} from "../../store/atoms";
import {useEffect, useState} from "react";
import {useAtomValue} from "jotai";
import usePost from "../../hooks/usePost";
import Loading from "../common/Loading";
import {Navigate} from "react-router-dom";

const PostModifyPage = () => {
    const [_, setHeader] = useAtom(headerAtom);
    const [success, setSuccess] = useState(null);
    const me = useAtomValue(userAtom);
    const {post, loading} = usePost();

    useEffect(() => {
        if (post && me) {
            if (String(post.user.user_id) !== String(me.user_id)) {
                alert("해당 게시글에 접근 권한이 없습니다.");
                setSuccess(false);
            } else {
                setSuccess(true);
            }
        }
    }, [me, post])

    useEffect(() => {
        setHeader({
            back: 1,
            profile: true
        })
    }, []);

    if (success === null) {
        return <Loading/>
    }

    return (
        success ? (
            <S.Wrapper>
                <>
                    <S.Title>
                        게시글 수정
                    </S.Title>

                    {loading ? (<Loading/>) : (<PostForm {...post}/>)}
                </>
            </S.Wrapper>
        ) : (
                <Navigate to={`/`}></Navigate>
        )
    );
}

export default PostModifyPage;