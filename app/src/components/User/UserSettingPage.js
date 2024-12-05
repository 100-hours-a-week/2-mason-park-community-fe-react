import S from './UserSettingPage.styled'
import {useAtomValue, useSetAtom} from "jotai";
import {headerAtom, userAtom} from "../../store/atoms";
import {useEffect} from "react";
import {Outlet} from "react-router-dom";

const UserSettingPage = () => {
    const setHeader = useSetAtom(headerAtom);
    const user = useAtomValue(userAtom);
    useEffect(() => {
        setHeader({
            back: 2,
            profile: true
        })
    }, [user])
    return(
        <S.Wrapper>
            <Outlet/>
        </S.Wrapper>
    )
}

export default UserSettingPage;