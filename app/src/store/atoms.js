import {atom} from "jotai";

/* 로그인 사용자 전역 상태 */
export const userAtom = atom(null);

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