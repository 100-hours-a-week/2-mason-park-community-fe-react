import S from './PostDetail.styled'
import Profile from "../common/Profile";
import DetailButton from "../Button/DetailButton";
import {useNavigate} from "react-router-dom";
import useModal from "../../hooks/useModal";
import {convertToKUnit} from "../../utils/utils";
import {useAtomValue} from "jotai";
import {userAtom} from "../../store/atoms";
import useThumbsUp from "../../hooks/useThumbsUp";

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
    user
}) => {
    const navigate = useNavigate();
    // 모달
    const {openModal} = useModal();
    // 좋아요
    const {thumbs, thumbCount, thumbsUp, thumbsDown} = useThumbsUp(is_thumbs, thumb_count);
    // 현재 로그인 유저 정보
    const me = useAtomValue(userAtom);
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
                            <DetailButton title={"삭제"} handler={() => openModal('deletePost', {'post_id': post_id})}/>
                        </S.MetaButtonContainer>
                    )}
                </S.MetaContainer>
            </S.HeaderWrapper>
            <S.ContentContainer>
                {post_image && (<S.ContentImage src={post_image}/>)}
                <S.ContentText>{content}</S.ContentText>
                <S.CountContainer>
                    <S.CountBox>{convertToKUnit(thumbCount)}<br/>좋아요 수</S.CountBox>
                    <S.CountBox>{convertToKUnit(view_count)}<br/>조회수</S.CountBox>
                    <S.CountBox>{convertToKUnit(comment_count)}<br/>댓글</S.CountBox>
                </S.CountContainer>
                {thumbs ? (<S.FillHeart onClick={thumbsDown}/>) : (<S.EmptyHeart onClick={thumbsUp}/>)}
            </S.ContentContainer>
        </S.Wrapper>
    )
}

export default PostDetail;