import {atom} from "jotai";
import {atomWithStorage} from "jotai/utils";

/* 로그인 사용자 전역 상태 */
export const userAtom = atomWithStorage('user', {
    user_id: '',
    email: '',
    nickname: '',
    profile_image: '',
    is_authenticated: false
});

/* 헤더 상태 */
export const headerAtom = atomWithStorage('header', {
    back: 0,
    profile: false
})

/* 에러 전역 상태 */
export const commonErrorAtom = atom({
    error: ''
})

export const registerErrorAtom = atom({
    email: '',
    password: '',
    passwordCheck: '',
    nickname: '',
})

/* 모달 상태 */
export const modalAtom = atom({
    isOpen: false,
    element: null,
    targetId: null,
})

/* 댓글 목록 상태 */
export const commentAtom = atom({
    isNew: false,
});