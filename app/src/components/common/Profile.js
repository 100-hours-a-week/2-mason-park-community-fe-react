import S from './Profile.styled'
import ProfileImage from "./ProfileImage";

const Profile = ({user_id, nickname, profile_image}) => {

    return (
    <S.Wrapper>
        <ProfileImage imageUrl={profile_image} />
        <S.Nickname>{nickname}</S.Nickname>
    </S.Wrapper>)
}

export default Profile;

