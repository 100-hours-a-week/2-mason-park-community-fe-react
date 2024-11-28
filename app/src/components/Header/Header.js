import S from './Header.styled'
import ProfileImage from "../common/ProfileImage";

const Header = ({back, title, imageUrl}) => {
    return (
        <S.Wrapper>
            <S.BackButtonWrapper>
                 <S.BackButton />
            </S.BackButtonWrapper>
            <S.Title>
                {title}
            </S.Title>
            <ProfileImage imageUrl={imageUrl}/>
        </S.Wrapper>
    );
}

export default Header;