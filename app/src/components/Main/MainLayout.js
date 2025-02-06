import S from './MainLayout.styled'
import {Outlet} from "react-router-dom";
import Header from "../Header/Header";
import useNotification from "../../hooks/useNotification";
import NotificationList from "../Notification/NotificationList";
import {useAtom, useAtomValue} from "jotai";
import {userAtom} from "../../store/atoms";
import {useSetAtom} from "jotai/index";
import {initialNotificationLoadAtom, sseAtom} from "../../store/notification";
import {useEffect} from "react";

const MainLayout = () => {
    const { isNotificationOpen } = useNotification();
    const me = useAtomValue(userAtom);
    const initSSE = useSetAtom(sseAtom);
    const [_, loadInitialData] = useAtom(initialNotificationLoadAtom); // 초기 데이터 로딩 atom

    useEffect(() => {
        // 로그인 한 경우에만 SSE 연결 시도
        if (me.is_authenticated) {
            initSSE();
            loadInitialData();
        }
    }, [me.is_authenticated]);
    return (
        <S.Layout>
            <S.HeaderWrapper>
                <Header />
            </S.HeaderWrapper>
            <Outlet />
            {isNotificationOpen && <NotificationList />}
        </S.Layout>
    )
}

export default MainLayout;