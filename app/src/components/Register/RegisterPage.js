import S from './RegisterPage.styled';
import RegisterForm from "./RegisterForm";
import {Provider} from "jotai";

const RegisterPage = () => {
    return (
        <S.Wrapper>
            <Provider>
                <RegisterForm/>
            </Provider>
        </S.Wrapper>
    )
}

export default RegisterPage;