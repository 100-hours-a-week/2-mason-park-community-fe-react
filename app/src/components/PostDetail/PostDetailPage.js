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
    const {post, setPost, postLoading} = usePost();
    const {comments, setComments, commentLoading} = useComments();
    const setHeader = useSetAtom(headerAtom);

    useEffect(() => {
        setHeader({
            back: 2,
            profile: true
        })
    }, [])

    return (
        <>
            <S.Wrapper>
                <PostDetail {...post} setPost={setPost} />
                <CommentForm setPost={setPost} setComments={setComments} />
            </S.Wrapper>
            <S.CommentContainer>
                {!commentLoading && comments.map((comment) => (
                    <CommentItem key={comment.comment_id} {...comment} setPost={setPost} setComments={setComments} />
                ))}
            </S.CommentContainer>
        </>
    );
}

export default PostDetailPage;