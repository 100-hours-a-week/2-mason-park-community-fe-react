import S from './LoginPage.styled'
import LoginForm from "./LoginForm";
import {useSetAtom} from "jotai";
import {headerAtom, userAtom} from "../../store/atoms";
import {useEffect} from "react";

const LoginPage = () => {
    const setHeader = useSetAtom(headerAtom);
    const setUser = useSetAtom(userAtom);
    useEffect(() => {
        setHeader({
            back: 0,
            profile: false
        })
        setUser({
            is_authenticated: false,
        })
    }, [])
    return(
        <S.Wrapper>
            <LoginForm />
        </S.Wrapper>
    )
}

export default LoginPage;