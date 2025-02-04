import S from './NotificationItem.styled'
import ProfileImage from "../common/ProfileImage";
import {timeAgo} from "../../utils/utils";
import {readNotificationRequest} from "../../api/notification";

const NotificationItem = ({
    notification_id,
    type,
    message,
    is_read,
    created_at,
    sender,
    setNotifications
}) => {

    const readNotification = async () => {
        try {
            const res = await readNotificationRequest(notification_id);

            if (res.status !== 200) return;
            setNotifications(prev => prev.filter(notification => notification.notification_id !== notification_id));
        } catch (e) {
            console.error(`${e.response.data.error} : ${e.response.data.message}`);
        }
    }

    return (
        <S.Wrapper>
            <ProfileImage imageUrl={sender.profile_image}/>
            <S.Message>
                {`${sender.nickname} ${message}`}
            </S.Message>
            <S.Time>
                {timeAgo(created_at)}
            </S.Time>
            <S.Check onClick={readNotification}/>
        </S.Wrapper>
    )
}

export default NotificationItem;