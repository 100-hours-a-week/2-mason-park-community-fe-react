import S from './LoginPage.styled'
import {useSetAtom} from "jotai";
import {headerAtom, userAtom} from "../../store/atoms";
import {useEffect} from "react";
import AdminLoginForm from "./AdminLoginForm";

const AdminLoginPage = () => {
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
            <AdminLoginForm />
        </S.Wrapper>
    )
}

export default AdminLoginPage;