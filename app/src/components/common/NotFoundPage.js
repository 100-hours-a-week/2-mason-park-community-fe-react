import S from './NotFoundPage.styled'
import {useSetAtom} from "jotai";
import {headerAtom, userAtom} from "../../store/atoms";
import {useEffect} from "react";

const NotFoundPage = () => {
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
            <S.Error>404</S.Error>
            <S.Error>Not Found</S.Error>
        </S.Wrapper>
    )
}

export default NotFoundPage;