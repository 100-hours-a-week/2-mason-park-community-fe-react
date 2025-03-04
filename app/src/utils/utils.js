export const strings = {
    "MODIFY_URL" : "modify",
    "MODIFY_TITLE" : "게시글 수정",
    "MODIFY_USERS_INFO" : "회원정보수정",
    "MODIFY_USERS_PASSWORD" : "비밀번호수정",
    "LOGOUT" : "로그아웃",
    "LOGIN" : "로그인",
    "HEADER_TITLE" : "아무 말 대잔치",
    "MODAL_POST_DELETE_TITLE" : "게시글을 삭제하시겠습니까?",
    "MODAL_DELETE_CONTENT" : "삭제한 내용은 복구할 수 없습니다.",
    "MODAL_COMMENT_DELETE_TITLE" : "댓글을 삭제하시겠습니까?",
    "MODAL_USER_DELETE_TITLE" : "회원탈퇴 하시겠습니가?",
    "MODAL_USER_DELETE_CONTENT" : "작성한 게시글과 댓글을 삭제됩니다."
}

export const error = {
    "BLANK" : '',
    "EMAIL_INVALID" : "* 올바른 이메일 주 형식을 입력해주세요. \n (예: example@example.com)",
    "EMAIL_EXIST" : "* 중복된 이메일 입니다.",
    "EMAIL_BLANK" : "* 이메일을 입력해주세요.",
    "PASSWORD_BLANK" : "* 비밀번호를 입력해주세요.",
    "PASSWORD_INVALID_MIN_LEN" : "* 비밀번호는 최소 8자 이상이어야 합니다.",
    "PASSWORD_INVALID_MAX_LEN" : "* 비밀번호는 최대 20자 이하이어야 합니다.",
    "PASSWORD_INVALID" : "* 비밀번호는 대소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.",
    "PASSWORD_NOT_MATCH" : "* 비밀번호가 다릅니다.",
    "FAILED_LOGIN" : "* 입력하신 계정 정보가 정확하지 않았습니다.",
    "FAILED_REGISTER" : "* 회원가입에 실패하였습니다.",
    "CHECK_PASSWORD_BLANK" : "* 비밀번호를 한번 더 입력해주세요",
    "NICKNAME_BLANK" : "* 닉네임을 입력해주세요.",
    "NICKNAME_EXIST" : "* 중복된 닉네임 입니다.",
    "NICKNAME_INCLUDE_SPACE" : "* 띄어쓰기를 없애주세요.",
    "NICKNAME_INVALID" : "* 닉네임은 공백 없이 최대 10자 까지 작성 가능합니다.",
    "NICKNAME_EXCEED_MAX_LEN" : "* 닉네임은 최대 10자 까지 작성 가능합니다.",
    "PROFILE_IMG_BLANK" : "* 프로필 사진을 추가해주세요.",
    "TITLE_CONTENT_BLANK" : "* 제목, 내용을 모두 작성해주세요.",
    "TITLE_EXCEED_MAX_LEN" : "* 제목은 최대 26자 까지 작성 가능합니다.",
    "CONTENT_EXCEED_MAX_LEN" : "* 내용은 최대 1500자 까지 작성 가능합니다.",
    "COMMENT_CONTENT_EXCEED_MAX_LEN" : "* 내용은 최대 500자 까지 작성 가능합니다.",
    "CONTENT_BLANK" : "* 내용을 입력해주세요.",
    "NOT_WHITE_SPACE_ONLY" : "*공백만 입력은 허용되지 않습니다."
}

export const validator = {
    email(value) {
        // 대소문자 / 숫자 / @ / . / _ / - 포함 가능
        return  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i.test(value);
    },
    password(value) {
        // 비밀번호는 8자 이상 / 20자 이하 / 대소문자, 숫자, 특수문자를 각각 최소 1개 포함
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*?])[A-Za-z\d!@#$%^&*?]{8,20}$/.test(value);
    },
    checkPassword(origin, check) {
        return origin === check;
    },
    nickname(value) {
        return /^[가-힣a-zA-Z0-9]{2,10}$/.test(value);
    },
    postTitle(value) {
        return 0 <= value.length && value.length <= 26;
    },
    postContent(value) {
        return 0 <= value.length && value.length <= 1500;
    },
    commentContent(value) {
        return 0 <= value.length && value.length <= 500;
    },
    whiteSpace(value) {
        return value.trim() === '';
    }
}

export const convertToKUnit = val => {
    if (Number(val) >= 100000) {
        return '100K';
    } else if (Number(val) >= 10000) {
        return '10K';
    } else if (Number(val) >= 1000) {
        return '1K';
    } else {
        return val;
    }
}

const getScrollbarWidth = () => {
    return window.innerWidth - document.documentElement.offsetWidth;
}

export const blockScroll = (className= 'stop-scrolling') => {
    const isBlocked = document.body.classList.contains(className);
    if(isBlocked) return;

    document.body.style.setProperty('--scrollbar-width', `${getScrollbarWidth()}px`);
    document.body.classList.add(className);
}

export const unblockScroll = (className= 'stop-scrolling') => {
    const isBlocked = document.body.classList.contains(className);
    if(!isBlocked) return;

    document.body.style.removeProperty('--scrollbar-width');
    document.body.classList.remove(className);
}