import {atom} from "jotai";
import {getUnreadNotificationsRequest} from "../api/notification";

// 읽지 않은 알림 목록
export const notificationAtom = atom([]);
export const notificationOffsetAtom = atom(0);
export const notificationHasNextPageAtom = atom(true);
export const notificationIsFetchingAtom = atom(false);

export const fetchNotifications = async (get, set) => {
    const offset = get(notificationOffsetAtom);
    const hasNextPage = get(notificationHasNextPageAtom);
    const isFetching = get(notificationIsFetchingAtom);

    if (!hasNextPage || isFetching) return; // 데이터가 없거나 요청 중이면 종료

    set(notificationIsFetchingAtom, true); // 데이터 요청 시작

    try {
        const res = await getUnreadNotificationsRequest(offset, 10);

        const newNotifications = res.data;

        set(notificationAtom, (prevNotifications) =>
            [...prevNotifications, ...newNotifications.data].sort(
                (a, b) => new Date(b.created_at) - new Date(a.created_at)
            )
        );

        set(notificationOffsetAtom, offset + 10); // 다음 오프셋 갱신
        set(notificationHasNextPageAtom, newNotifications.offset + 10 < newNotifications.total); // 다음 페이지 존재 여부 갱신
    } catch (e) {
        console.error(`${e.response?.data?.error} : ${e.response?.data?.message}`);
    } finally {
        set(notificationIsFetchingAtom, false); // 데이터 요청 완료
    }
}

// 초기 데이터 로딩을 위한 atom
export const initialNotificationLoadAtom = atom(
    null,
    async (get, set) => {
    await fetchNotifications(get, set);
});

// 읽지 않은 알림 개수
export const unreadCountAtom = atom((get) =>
    get(notificationAtom).filter((n) => !n.is_read).length
)

// SSE 연결 객체가 저장될 Atom
export const eventSourceAtom = atom(null);

// SSE 연결을 관리하는 Atom
export const sseAtom = atom(
    (get) => get(notificationAtom),
    (get, set) => {
        if (get(eventSourceAtom)) return; // 이미 SSE 연결이 되어있으면 실행 X

        // SSE 연결 요청
        const eventSource = new EventSource(`http://localhost:8080/api/notifications/subscribe`, {
            withCredentials: true // 세션 쿠키 포함
        });

        // SSE 연결 상태 체크
        eventSource.onopen = () => {
            console.log("SSE 연결 성공");
        }

        // 이벤트 수신 핸들러
        eventSource.onmessage = (event) => {
            const newNotification = JSON.parse(event.data);
            set(notificationAtom, (prev) => [newNotification, ...prev]); // 최신 알림 추가
        };

        // 에러 실패 시 호출
        eventSource.onerror = () => {
            console.error('SSE 연결 실패');
            eventSource.close();
        }

        // 성공적으로 연결되면 eventSourceAtom에 저장
        set(eventSourceAtom, eventSource);

        // cleanup
        return () => eventSource.close();
    }
)