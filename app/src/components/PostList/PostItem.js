import S from './PostItem.styled'
import {convertToKUnit} from "../../utils/utils";
import {useNavigate} from "react-router-dom";
import ProfileImage from "../common/ProfileImage";

const PostItem = ({
      post_id,
      title,
      thumb_count,
      view_count,
      comment_count,
      created_at,
      user
}) => {
    const navigate = useNavigate();
    const navigateDetail = () => {
        navigate(`/posts/${post_id}`)
    }


    return (
        <S.Wrapper onClick={navigateDetail}>
            <S.Title>{title}</S.Title>
            <S.MetaContainer>
                <S.MetaItem>
                    좋아요 {convertToKUnit(thumb_count)}
                </S.MetaItem>
                <S.MetaItem>
                    댓글 {convertToKUnit(comment_count)}
                </S.MetaItem>
                <S.MetaItem>
                    조회수 {convertToKUnit(view_count)}
                </S.MetaItem>
                <S.MetaTime>
                    {created_at}
                </S.MetaTime>
            </S.MetaContainer>
            <S.ProfileContainer>
                <ProfileImage imageUrl={user.profile_image}/>
                <S.ProfileNickname>{user.nickname}</S.ProfileNickname>
            </S.ProfileContainer>
        </S.Wrapper>
    )
}

export default PostItem;