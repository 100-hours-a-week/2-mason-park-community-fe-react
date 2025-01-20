import S from './PostDetail.styled'
import Profile from "../common/Profile";
import DetailButton from "../Button/DetailButton";
import {useNavigate} from "react-router-dom";
import useModal from "../../hooks/useModal";
import {convertToKUnit} from "../../utils/utils";
import {useAtomValue} from "jotai";
import {userAtom} from "../../store/atoms";
import useThumbsUp from "../../hooks/useThumbsUp";
import {deletePostRequest} from "../../api/post";

const PostDetail = ({
    post_id,
    title,
    content,
    post_image,
    thumb_count,
    view_count,
    comment_count,
    created_at,
    is_thumbs,
    user,
    setPost
}) => {
    const navigate = useNavigate();
    // 모달
    const {openModal, closeModal} = useModal();
    // 좋아요
    const {thumbs, thumbsUp, thumbsDown} = useThumbsUp(is_thumbs);
    // 현재 로그인 유저 정보
    const me = useAtomValue(userAtom);

    const deletePost = async () => {
        try {
            await deletePostRequest(post_id);

            closeModal();
            navigate("/");
        } catch (e) {
            console.error(`${e.response.data.error} : ${e.response.data.message}`);
        }
    }

    const clickThumbsUp = () => {
        if (!me.is_authenticated) {
            alert('로그인이 필요한 기능입니다.');
            return;
        }
        thumbsUp();
        setPost(prev => ({
            ...prev,
            thumb_count: prev.thumb_count + 1
        }));
    }
    const clickThumbsDown = () => {
        if (!me.is_authenticated) {
            alert('로그인이 필요한 기능입니다.');
            return;
        }

        thumbsDown();
        setPost(prev => ({
            ...prev,
            thumb_count: prev.thumb_count - 1
        }));
    }
    return (
        <S.Wrapper>
            <S.HeaderWrapper>
                <S.HeaderTitle>{title}</S.HeaderTitle>
                <S.MetaContainer>
                    <Profile {...user} />
                    <S.MetaTime>{created_at}</S.MetaTime>
                    {user && user.user_id === me.user_id && (
                        <S.MetaButtonContainer>
                            <DetailButton title={"수정"} handler={() => navigate(`/posts/${post_id}/modify`)} />
                            <DetailButton title={"삭제"} handler={() => openModal('deletePost', deletePost)}/>
                        </S.MetaButtonContainer>
                    )}
                </S.MetaContainer>
            </S.HeaderWrapper>
            <S.ContentContainer>
                {post_image && (<S.ContentImage src={post_image}/>)}
                <S.ContentText>{content}</S.ContentText>
                <S.CountContainer>
                    <S.CountBox>{convertToKUnit(thumb_count)}<br/>좋아요 수</S.CountBox>
                    <S.CountBox>{convertToKUnit(view_count)}<br/>조회수</S.CountBox>
                    <S.CountBox>{convertToKUnit(comment_count)}<br/>댓글</S.CountBox>
                </S.CountContainer>
                {thumbs ? (<S.FillHeart onClick={clickThumbsDown}/>) : (<S.EmptyHeart onClick={clickThumbsUp}/>)}
            </S.ContentContainer>
        </S.Wrapper>
    )
}

export default PostDetail;