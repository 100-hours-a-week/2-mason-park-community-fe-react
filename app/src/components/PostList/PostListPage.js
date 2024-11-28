import S from './PostListPage.styled';
import CommonButton from "../Button/CommonButton";
import {useNavigate} from "react-router-dom";

const PostListPage = () => {
    const navigate = useNavigate();

    return (
        <S.Wrapper>
            <S.Title>
                안녕하세요, <br/>
                아무 말 대잔치 게시판 입니다.
            </S.Title>
            <CommonButton title={"게시글 작성"} handler={() => navigate('/write')}/>
        </S.Wrapper>
    );
}

export default PostListPage;