import S from './UserPasswordForm.styled'
import {error} from "../../utils/utils";
import HelperMessage from "../common/HelperMessage";
import FormButton from "../Button/FormButton";
import {updatePasswordRequest} from "../../api/user";
import {Slide, toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useFormik} from "formik";
import * as Yup from "yup";

const UserPasswordForm = () => {
    const formik = useFormik({
        initialValues: {
            password: "",
            passwordCheck: ""
        },
        validationSchema: Yup.object({
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
                .oneOf([Yup.ref('password')], error.PASSWORD_NOT_MATCH),
        }),
        onSubmit: async values => {
            try {
                const data = {
                    password: window.btoa(values.password),
                }

                // 비밀번호 변경 API 호출
                const res = await updatePasswordRequest(data);

                if (res.status !== 200) return;

                // 토스트 띄우기
                toast.success('수정 완료', {
                    position: "bottom-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    theme: "colored",
                    transition: Slide,
                });
            } catch (e) {
                alert('수정 실패')
                console.error(`${e.response.data.error} : ${e.response.data.message}`);
            }
        }
    });
    return(
        <>
            <S.Wrapper>
                <S.Title>비밀번호 수정</S.Title>

                <S.TextInputWrapper>
                    <S.InputWrapper>
                        <S.Label>{"비밀번호"}</S.Label>
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
                        <S.Label>{"비밀번호 확인"}</S.Label>
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

                <FormButton
                    title={"수정하기"}
                    disabled={!formik.isValid}
                    onClick={formik.handleSubmit}
                />
                <ToastContainer/>
            </S.Wrapper>
        </>
    )
}

export default UserPasswordForm;