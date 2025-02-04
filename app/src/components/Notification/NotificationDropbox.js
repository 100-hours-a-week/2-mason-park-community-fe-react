import S from './NotificationDropbox.styled.js';
import {useEffect, useRef, useState} from "react";
import {notificationAtom, unreadCountAtom} from "../../store/notification";
import {useAtom, useAtomValue} from "jotai";
import NotificationItem from "./NotificationItem";

const NotificationDropbox = () => {
    const dropboxRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => {
        if (!isOpen) { // 열려 있지 않을 때만 열기
            setIsOpen(true);
        }
    };

    useEffect(() => {
        const handleOutsideClose = (e) => {
            if (isOpen && !dropboxRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("click", handleOutsideClose);

        return () => document.removeEventListener("click", handleOutsideClose);
    }, [isOpen])

    const unreadCount = useAtomValue(unreadCountAtom);
    const [notifications, setNotifications] = useAtom(notificationAtom);

    return (
        <div ref={dropboxRef} style={{position: "relative", width: '35px'}}
             onClick={toggleDropdown}>
            { unreadCount > 0 && <S.New/> }
            <S.Notification />
            {isOpen && <S.Wrapper>
                {notifications.length > 0 ? (notifications.slice(0, 5).map((notification) => (
                    <S.Box>
                        <NotificationItem {...notification} setNotifications={setNotifications} />
                    </S.Box>
                ))) : (
                    <S.Box>새로운 알림이 없습니다.</S.Box>
                )}
                <S.Box>
                    더보기
                </S.Box>
            </S.Wrapper>}
        </div>
    )
}

export default NotificationDropbox;