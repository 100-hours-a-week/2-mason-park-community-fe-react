import S from './PostEditPage.styled';
import {useNavigate, useParams} from "react-router-dom";
import PostForm from "./PostForm";

const PostEditPage = () => {
    const navigate = useNavigate();
    const params = useParams();
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