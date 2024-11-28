import S from './ProfileImage.styled';

const ProfileImage = ({imageUrl}) => {
    return (
        <S.Wrapper>
            {imageUrl ? (<S.Image src={imageUrl} />) : (<S.NoImage />)}
        </S.Wrapper>
    )
}

export default ProfileImage;