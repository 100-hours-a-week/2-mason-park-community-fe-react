import S from './Header.styled'
import {useNavigate} from "react-router-dom";
import {headerAtom, userAtom} from "../../store/atoms";
import {useAtom, useAtomValue} from "jotai";
import ProfileImageWithDropbox from "../../HOC/withDropbox";
import NotificationDropbox from "../Notification/NotificationDropbox";

const Header = () => {
    const navigate = useNavigate();
    const [me, setMe] = useAtom(userAtom);
    const header = useAtomValue(headerAtom);

    const clickBackBtn = () => {
        // 뒤로 가기
        if (header.back === 1) {
            navigate(-1);
        }
        // 메인 페이지로 가기
        else if (header.back === 2) {
            navigate('/');
        }
    }

    return (
        <S.Wrapper>
            {
                header.back !== 0 ? (
                    <S.BackButtonWrapper>
                        <S.BackButton onClick={clickBackBtn}/>
                    </S.BackButtonWrapper>
                ) : (
                    <div style={{ width: '35px' }}></div>
                )
            }
            <S.Title onClick={() => {navigate('/')}}>
                민수네 커뮤니티
            </S.Title>
            <S.ProfileWrapper>
                {
                    header.profile &&
                    <ProfileImageWithDropbox imageUrl={me.profile_image} isAuth={me.is_authenticated}/>
                }
                {
                    me.is_authenticated &&
                    <NotificationDropbox/>
                }
            </S.ProfileWrapper>
        </S.Wrapper>
    );
}

export default Header;