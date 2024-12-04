import S from './RegisterPage.styled';
import RegisterForm from "./RegisterForm";
import {useSetAtom} from "jotai/index";
import {headerAtom} from "../../store/atoms";
import {useEffect} from "react";

const RegisterPage = () => {
    const setHeader = useSetAtom(headerAtom);

    useEffect(() => {
        setHeader({
            back: 0,
            profile: false
        })
    }, [])
    return (
        <S.Wrapper>
            <RegisterForm/>
        </S.Wrapper>
    )
}

export default RegisterPage;