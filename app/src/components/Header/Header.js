import S from './Header.styled'
import {useNavigate} from "react-router-dom";
import {headerAtom, userAtom} from "../../store/atoms";
import {useAtom, useAtomValue} from "jotai";
import ProfileImageWithDropbox from "../../HOC/withDropbox";
import useNotification from "../../hooks/useNotification";
import {unreadCountAtom} from "../../store/notification";

const Header = () => {
    const navigate = useNavigate();
    const [me, setMe] = useAtom(userAtom);
    const {openNotification} = useNotification();
    const header = useAtomValue(headerAtom);
    const unreadCount = useAtomValue(unreadCountAtom);

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
                <div style={{position: "relative", width: '35px'}}>
                    {
                        me.is_authenticated &&
                        <S.Notification onClick={openNotification}/>
                    }
                    {
                        me.is_authenticated &&
                        unreadCount > 0 &&
                        <S.New/>
                    }
                </div>
            </S.ProfileWrapper>
        </S.Wrapper>
    );
}

export default Header;