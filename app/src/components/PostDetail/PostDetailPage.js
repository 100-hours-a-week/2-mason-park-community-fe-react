import S from './PostDetailPage.styled';
import {useSetAtom} from "jotai/index";
import {headerAtom} from "../../store/atoms";
import {useEffect} from "react";
import PostDetail from "./PostDetail";
import usePost from "../../hooks/usePost";

const PostDetailPage = () => {
    const {post} = usePost();
    const setHeader = useSetAtom(headerAtom);

    useEffect(() => {
        setHeader({
            back: 0,
            profile: true
        })
    }, [])

    return (
        <S.Wrapper>
            <PostDetail {...post} />
        </S.Wrapper>
    );
}

export default PostDetailPage;