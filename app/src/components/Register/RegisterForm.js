import S from './RegisterForm.styled'
import FormButton from "../Button/FormButton";
import {useNavigate} from "react-router-dom";
import ImageInput from "../Input/ImageInput";
import {error} from "../../utils/utils";
import HelperMessage from "../common/HelperMessage";
import {existEmail, existNickname, registerRequest} from "../../api/auth";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useEffect} from "react";
import {debounce} from "lodash";

const RegisterForm = () => {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            passwordCheck: "",
            nickname: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email(error.EMAIL_INVALID)
                .required(error.EMAIL_BLANK),
            password: Yup.string()
                .required(error.PASSWORD_BLANK)
                .min(8, error.PASSWORD_INVALID_MIN_LEN)
                .max(20, error.PASSWORD_INVALID_MAX_LEN)
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*?])[A-Za-z\d!@#$%^&*?]{8,20}$/,
                    error.PASSWORD_INVALID
                ),
            passwordCheck: Yup.string()
                .required(error.CHECK_PASSWORD_BLANK)
                .oneOf([Yup.ref('password'), error.PASSWORD_NOT_MATCH]),
            nickname: Yup.string()
                .required(error.NICKNAME_BLANK)
                .matches(
                    /^[^\s]{1,10}$/,
                    error.NICKNAME_INVALID
                )
        }),
        onSubmit: async (values) => {
            try {
                // 프로필 이미지 추가, 비밀번호 base64 인코딩
                const res = await registerRequest({
                    email: values.email,
                    password: window.btoa(values.password),
                    nickname: values.nickname,
                    profile_image: localStorage.getItem('image'),
                });

                // 성공 시 로그인 페이지 이동
                if (res.status === 201) {
                    navigate('/login');
                }

            } catch (e) {
                alert(error.FAILED_REGISTER);
                console.error(`${e.response.data.error} : ${e.response.data.message}`);
            }
        },
    })

    useEffect(() => {
        if (!formik.values.email) return;

        const debouncedExistEmail = debounce(async (value) => {
            try {
                await existEmail(value);
            } catch (e) {
                console.error(`${e.response.data.error} : ${e.response.data.message}`);
                formik.setFieldError('email', error.EMAIL_EXIST);
            }
        }, 500);

        debouncedExistEmail(formik.values.email);

        return () => debouncedExistEmail.cancel();
    }, [formik.values.email]);

    useEffect(() => {
        if (!formik.values.nickname) return;

        const debouncedExistNickname = debounce(async (value) => {
            try {
                await existNickname(value);
            } catch (e) {
                console.error(`${e.response.data.error} : ${e.response.data.message}`);
                formik.setFieldError('nickname', error.NICKNAME_EXIST);
            }
        }, 500);

        debouncedExistNickname(formik.values.nickname);

        return () => debouncedExistNickname.cancel();
    }, [formik.values.nickname]);

    return (
        <S.Wrapper>
            <S.Title>회원가입</S.Title>

            <ImageInput
                title={"프로필 사진"}
                name={"profileImage"}
            />

            <S.TextInputWrapper>
                <S.InputWrapper>
                    <S.Label>{"이메일*"}</S.Label>
                    <S.Input
                        id={"email"}
                        name={"email"}
                        type={"text"}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </S.InputWrapper>
                <HelperMessage touched={formik.touched.email} error={formik.errors.email} />
            </S.TextInputWrapper>

            <S.TextInputWrapper>
                <S.InputWrapper>
                    <S.Label>{"비밀번호*"}</S.Label>
                    <S.Input
                        id={"password"}
                        name={"password"}
                        type={"password"}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </S.InputWrapper>
                <HelperMessage touched={formik.touched.password} error={formik.errors.password} />
            </S.TextInputWrapper>

            <S.TextInputWrapper>
                <S.InputWrapper>
                    <S.Label>{"비밀번호 확인*"}</S.Label>
                    <S.Input
                        id={"passwordCheck"}
                        name={"passwordCheck"}
                        type={"password"}
                        value={formik.values.passwordCheck}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </S.InputWrapper>
                <HelperMessage touched={formik.touched.passwordCheck} error={formik.errors.passwordCheck} />
            </S.TextInputWrapper>

            <S.TextInputWrapper>
                <S.InputWrapper>
                    <S.Label>{"닉네임*"}</S.Label>
                    <S.Input
                        id={"nickname"}
                        name={"nickname"}
                        type={"text"}
                        value={formik.values.nickname}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </S.InputWrapper>
                <HelperMessage touched={formik.touched.nickname} error={formik.errors.nickname} />
            </S.TextInputWrapper>

            <FormButton
                title={"회원가입"}
                disabled={!formik.isValid}
                onClick={formik.handleSubmit}
            />
            <S.Link onClick={() => {navigate('/login')}}>로그인하러 가기</S.Link>
        </S.Wrapper>
    )
}

export default RegisterForm;