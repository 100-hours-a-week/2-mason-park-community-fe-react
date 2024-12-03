import S from './RegisterForm.styled'
import TextInput from "../Input/TextInput";
import FormButton from "../Button/FormButton";
import {useNavigate} from "react-router-dom";
import ImageInput from "../Input/ImageInput";
import useForm from "../../hooks/useForm";
import {error, validator} from "../../utils/utils";
import HelperMessage from "../common/HelperMessage";
import {existEmail, existNickname, register} from "../../api/auth";
import {useAtom} from "jotai";
import {registerErrorAtom as errorAtom} from "../../store/atoms";

const RegisterForm = () => {
    const navigate = useNavigate();
    // 에러 전역 상태
    const [errors, setErrors] = useAtom(errorAtom);

    const {
        values,
        touched,
        disabled,
        handleChange,
        handleBlur,
        handleSubmit
    } = useForm({
        initialValues: {
            email: "",
            password: "",
            passwordCheck: "",
            nickname: "",
        },
        validate: async values => {

            // 이메일 유효성 검사 : 입력
            if (!values.email) {
                setErrors((prev) => {
                    return {...prev, email: error.EMAIL_BLANK}
                });
            }
            // 이메일 유효성 검사 : 정규식
            else if (!validator.email(values.email)) {
                setErrors((prev) => {
                    return {...prev, email: error.EMAIL_INVALID }
                });
            }
            // 이메일 유효성 검사 : 중복
            else {
                try {
                    await existEmail(values.email);
                    setErrors((prev) => {
                        return {...prev, email: error.BLANK }
                    });
                } catch (e) {
                    console.error(`${e.response.data.error} : ${e.response.data.message}`);
                    setErrors((prev) => {
                        return {...prev, email: error.EMAIL_EXIST }
                    });
                }
            }

            // 비밀번호 유효성 검사 : 입력
            if (!values.password) {
                setErrors((prev) => {
                    return {...prev, password: error.PASSWORD_BLANK }
                });
            }
            // 비밀번호 유효성 검사 : 정규식
            else if (!validator.password(values.password)) {
                setErrors((prev) => {
                    return {...prev, password: error.PASSWORD_INVALID }
                });
            }
            // 비밀번호 유효성 검사 : 통과
            else {
                setErrors((prev) => {
                    return {...prev, password: error.BLANK }
                });
            }

            // 비밀번호 확인 유효성 검사 : 입력
            if (!values.passwordCheck) {
                setErrors((prev) => {
                    return {...prev, passwordCheck: error.CHECK_PASSWORD_BLANK }
                });
            }
            // 비밀번호 확인 유효성 검사 : 일치
            else if (!validator.checkPassword(values.password, values.passwordCheck)) {
                setErrors((prev) => {
                   return  {...prev, passwordCheck: error.PASSWORD_NOT_MATCH }
                });
            }
            // 비밀번호 확인 유효성 검사 : 통과
            else {
                setErrors((prev) => {
                    return {...prev, passwordCheck: error.BLANK }
                });
            }

            // 닉네임 유효성 검사 : 입력
            if (!values.nickname) {
                setErrors((prev) => {
                    return {...prev, nickname: error.NICKNAME_BLANK }
                });
            }
            // 닉네임 유효성 검사 : 공백 포함
            else if (values.nickname.includes(' ')) {
                setErrors((prev) => {
                    return {...prev, nickname: error.NICKNAME_INCLUDE_SPACE };
                });
            }
            // 닉네임 유효성 검사 : 길이
            else if (values.nickname.length >= 11) {
                setErrors((prev) => {
                    return {...prev, nickname: error.NICKNAME_EXCEED_MAX_LEN };
                });
            }
            // 닉네임 유효성 검사 : 중복
            else {
                try {
                    await existNickname(values.nickname);
                    setErrors((prev) => {
                        return {...prev, nickname: error.BLANK };
                    });
                } catch (e) {
                    console.error(`${e.response.data.error} : ${e.response.data.message}`);
                    setErrors((prev) => {
                        return {...prev, nickname: error.NICKNAME_EXIST }
                    });
                }
            }

            return [values, errors];
        },
        onSubmit: async (values) => {
            try {
                // 프로필 이미지 추가, 비밀번호 base64 인코딩
                const res = await register({
                    ...values,
                    profile_image: localStorage.getItem('profileImage'),
                    password: window.btoa(values.password)
                });

                // 성공 시 로그인 페이지 이동
                if (res.status === 201) {
                    navigate('/login');
                }

            } catch (e) {
                alert(error.FAILED_REGISTER);
                console.error(`${e.response.data.error} : ${e.response.data.message}`);
            }
        }
    })

    return (
        <S.Wrapper>
            <S.Title>회원가입</S.Title>

            <ImageInput
                title={"프로필 사진"}
                name={"profileImage"}
            />

            <S.TextInputWrapper>
                <TextInput
                    title={"이메일*"}
                    name={"email"}
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <HelperMessage touched={touched.email} error={errors.email} />
            </S.TextInputWrapper>

            <S.TextInputWrapper>
                <TextInput
                    type={"password"}
                    title={"비밀번호*"}
                    name={"password"}
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <HelperMessage touched={touched.password} error={errors.password} />
            </S.TextInputWrapper>

            <S.TextInputWrapper>
                <TextInput
                    type={"password"}
                    title={"비밀번호 확인*"}
                    name={"passwordCheck"}
                    value={values.passwordCheck}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <HelperMessage touched={touched.passwordCheck} error={errors.passwordCheck} />
            </S.TextInputWrapper>

            <S.TextInputWrapper>
                <TextInput
                    title={"닉네임*"}
                    name={"nickname"}
                    value={values.nickname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <HelperMessage touched={touched.nickname} error={errors.nickname} />
            </S.TextInputWrapper>

            <FormButton
                title={"회원가입"}
                disabled={disabled}
                onClick={handleSubmit}
            />
            <S.Link onClick={() => {navigate('/login')}}>로그인하러 가기</S.Link>
        </S.Wrapper>
    )
}

export default RegisterForm;