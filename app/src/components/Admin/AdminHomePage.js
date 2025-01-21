import S from './AdminHomePage.styled'
import {useSetAtom} from "jotai";
import {headerAtom} from "../../store/atoms";
import {useEffect} from "react";
import UserDashboard from "./UserDashboard";

const AdminHomePage = () => {
    const setHeader = useSetAtom(headerAtom);
    useEffect(() => {
        setHeader({
            back: 0,
            profile: false
        })
    }, [])
    return(
        <S.Wrapper>
            <UserDashboard/>
        </S.Wrapper>
    )
}

export default AdminHomePage;