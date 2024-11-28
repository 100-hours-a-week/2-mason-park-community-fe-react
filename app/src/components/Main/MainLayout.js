import S from './MainLayout.styled'
import {Outlet} from "react-router-dom";
import Header from "../Header/Header";
const MainLayout = () => {

    // TODO : 인증 정보 전역 상태 관리
    return (
        <S.Layout>
            <Header title={'아무 말 대잔치'}/>
            <Outlet />
        </S.Layout>
    )
}

export default MainLayout;