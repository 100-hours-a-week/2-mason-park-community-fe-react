import S from './PostEditPage.styled';
import PostForm from "./PostForm";
import usePost from "../../hooks/usePost";

const PostModifyPage = () => {
    const {post, loading} = usePost();
    return (
        <S.Wrapper>
            <>
                <S.Title>
                    게시글 수정
                </S.Title>

                {!loading && <PostForm {...post}/>}
            </>
        </S.Wrapper>
    );
}

export default PostModifyPage;