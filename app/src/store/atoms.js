import {atom} from "jotai";
import {atomWithStorage} from "jotai/utils";

/* 로그인 사용자 전역 상태 */
const loadUserFromStorage = () => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : {
        user_id: '',
        email: '',
        nickname: '',
        profile_image: '',
        role: 'ANONYMOUS',
        is_authenticated: false
    };
}

export const userAtom = atomWithStorage('user', loadUserFromStorage());

/* 헤더 상태 */
const loadHeaderFromStorage = () => {
    const storedHeader = localStorage.getItem('header');
    return storedHeader ? JSON.parse(storedHeader) : {
        back: 0,
        profile: false
    }
}
export const headerAtom = atomWithStorage('header', loadHeaderFromStorage());

/* 모달 상태 */
export const modalAtom = atom({
    isOpen: false,
    element: null,
    handler: null
})

/* 알림창 상태 */
export const notificationOpenAtom = atom(false);

/* 댓글 상태 */
export const commentAtom = atom({
    comment_id: '',
    content: '',
});

/* 변경 상태 */
export const changeAtom = atom(false);