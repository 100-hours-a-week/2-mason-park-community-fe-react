import {atom} from "jotai";

// 읽지 않은 알림 목록
export const notificationAtom = atom([]);

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
        if (eventSource.readyState === EventSource.OPEN) {
            console.log("SSE 연결 성공");
        } else if (eventSource.readyState === EventSource.CONNECTING) {
            console.log("SSE 연결 중...");
        } else {
            console.log("SSE 연결 종료");
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