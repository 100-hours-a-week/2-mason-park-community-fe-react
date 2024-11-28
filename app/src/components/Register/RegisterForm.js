import S from './RegisterForm.styled'
import TextInput from "../Input/TextInput";
import FormButton from "../Button/FormButton";
import {useNavigate} from "react-router-dom";
import ImageInput from "../Input/ImageInput";

const RegisterForm = () => {
    const navigate = useNavigate();

    return (
        <S.Wrapper>
            <S.Title>회원가입</S.Title>
            <ImageInput title={"프로필 사진"} name={"profile"}/>
            <TextInput title={"이메일*"} name={"email"} placeholder={"이메일을 입력하세요"} />
            <TextInput title={"비밀번호*"} name={"password"} placeholder={"비밀번호를 입력하세요"} />
            <TextInput title={"비밀번호 확인*"} name={"password"} placeholder={"비밀번호를 한번 더 입력하세요"} />
            <TextInput title={"닉네임*"} name={"nickname"} placeholder={"닉네임을 입력하세요"} />
            <FormButton title={"회원가입"} disabled={false}/>
            <S.Link onClick={() => {navigate('/login')}}>로그인하러 가기</S.Link>
        </S.Wrapper>
    )
}

export default RegisterForm;