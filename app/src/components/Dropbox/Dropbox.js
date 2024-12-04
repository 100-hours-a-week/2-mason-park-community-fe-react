import S from '../Dropbox/Dropbox.styled';
import {useNavigate} from "react-router-dom";
import {logoutRequest} from "../../api/auth";

const Dropbox = ({isAuth}) => {
    const navigate = useNavigate();
    const logout = async () => {
        try {
            await logoutRequest();
            navigate("/login");
        } catch (e) {
            console.error(`${e.response.data.error} : ${e.response.data.message}`);
            alert(`로그아웃 실패 !`);
        }
    }

    return (
        <S.Wrapper>
            {isAuth ? (
                <>
                    <S.Box onClick={() => {navigate('/users/setting')}} >회원정보수정</S.Box>
                    <S.Box onClick={() => {navigate('/users/password')}}>비밀번호수정</S.Box>
                    <S.Box onClick={logout}>로그아웃</S.Box>
                </>) : (
                    <S.Box onClick={() => {navigate('/login')}}>로그인</S.Box>
            )}

        </S.Wrapper>
    )
}

export default Dropbox;