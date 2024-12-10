import S from './PostDetailPage.styled';
import {useSetAtom} from "jotai/index";
import {headerAtom} from "../../store/atoms";
import {useEffect} from "react";
import PostDetail from "./PostDetail";
import usePost from "../../hooks/usePost";
import CommentForm from "../Comment/CommentForm";
import useComments from "../../hooks/useComments";
import CommentItem from "../Comment/CommentItem";

const PostDetailPage = () => {
    const {post} = usePost();
    const {comments, loading} = useComments();
    const setHeader = useSetAtom(headerAtom);

    useEffect(() => {
        setHeader({
            back: 1,
            profile: true
        })
    }, [])

    return (
        <S.Wrapper>
            <PostDetail {...post} />
            <CommentForm />
            <S.CommentContainer>
                {!loading && comments.map((comment) => (
                    <CommentItem key={comment.comment_id} {...comment} />
                ))}
            </S.CommentContainer>
        </S.Wrapper>
    );
}

export default PostDetailPage;