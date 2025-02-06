import {notificationOpenAtom} from "../store/atoms";
import {useAtom} from "jotai";
import {useCallback} from "react";

const useNotification = () => {
    const [isNotificationOpen, setIsNotificationOpen] = useAtom(notificationOpenAtom);

    const closeNotification = useCallback(() => {
        setIsNotificationOpen(false)
    }, [setIsNotificationOpen]);

    const openNotification = useCallback(() => {
        setIsNotificationOpen(true)
    }, [setIsNotificationOpen]);

    return {
        isNotificationOpen,
        setIsNotificationOpen,
        closeNotification,
        openNotification
    };
}

export default useNotification;