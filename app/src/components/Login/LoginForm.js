import S from './LoginForm.styled'
import TextInput from "../Input/TextInput";
import SubmitButton from "../Button/SubmitButton";
import {useNavigate} from "react-router-dom";

const LoginForm = () => {
    const navigate = useNavigate();

    return (
        <S.Wrapper>
            <S.Title>로그인</S.Title>
            <TextInput title={"이메일"} name={"email"} placeholder={"이메일을 입력하세요"} />
            <TextInput title={"비밀번호"} name={"password"} placeholder={"비밀번호를 입력하세요"} />
            <SubmitButton title={"로그인"} disabled={false}/>
            <S.Link onClick={() => {navigate('/register')}}>회원가입</S.Link>
        </S.Wrapper>
    )
}

export default LoginForm;