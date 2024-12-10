import S from './PostEditPage.styled';
import PostForm from "./PostForm";

const PostEditPage = () => {

    return (
        <S.Wrapper>
            <S.Title>
                게시글 작성
            </S.Title>

            <PostForm/>
        </S.Wrapper>
    );
}

export default PostEditPage;