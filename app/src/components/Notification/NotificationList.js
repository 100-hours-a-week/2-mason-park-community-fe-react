import S from './NotificationList.styled.js';
import {initialNotificationLoadAtom, notificationAtom, notificationIsFetchingAtom} from "../../store/notification";
import {useAtom, useAtomValue} from "jotai";
import NotificationItem from "./NotificationItem";
import useNotification from "../../hooks/useNotification";
import {useEffect, useRef} from "react";
import {throttle} from "lodash";

const NotificationList = () => {
    const scrollRef = useRef(null);
    const { closeNotification } = useNotification();
    const [notifications, setNotifications] = useAtom(notificationAtom);
    const isFetching = useAtomValue(notificationIsFetchingAtom);
    const [_, loadInitialData] = useAtom(initialNotificationLoadAtom); // 초기 데이터 로딩 atom

    useEffect(() => {
        const handleScroll = throttle(() => {
            if (!scrollRef.current) return;

            const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
            if (scrollTop + clientHeight >= scrollHeight - 100 && !isFetching) {
                // 스크롤이 거의 바닥에 닿았을 때 추가 데이터 로딩
                loadInitialData();
            }
        }, 300);

        const scrollElement = scrollRef.current;
        scrollElement.addEventListener('scroll', handleScroll);
        return () => scrollElement.removeEventListener('scroll', handleScroll);
    }, [isFetching, loadInitialData]);

    return (
        <S.NotificationWrapper>
            <S.DoubleArrowLeftWrapper>
                <S.DoubleArrowLeft onClick={closeNotification} />
            </S.DoubleArrowLeftWrapper>
            <S.NotificationTitle>
                읽지않은 알림
            </S.NotificationTitle>
            <S.NotificationContainer ref={scrollRef}>
                {notifications.length > 0 ? (notifications.map((notification) => (
                    <S.Box>
                        <NotificationItem {...notification} setNotifications={setNotifications}/>
                    </S.Box>
                ))) : (
                    <S.EmptyBox>알림이 없습니다.</S.EmptyBox>
                )}
            </S.NotificationContainer>
        </S.NotificationWrapper>
    )
}

export default NotificationList;