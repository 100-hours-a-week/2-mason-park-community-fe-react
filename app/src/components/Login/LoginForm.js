import S from './LoginForm.styled'
import FormButton from "../Button/FormButton";
import {useNavigate} from "react-router-dom";
import {error} from "../../utils/utils";
import HelperMessage from "../common/HelperMessage";
import {useSetAtom} from "jotai";
import {loginRequest} from "../../api/auth";
import {getMyProfileRequest} from "../../api/user";
import {userAtom} from "../../store/atoms";
import {useFormik} from "formik";
import * as Yup from "yup";

const LoginForm = () => {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
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
                )
        }),
        onSubmit: async (values) => {
            try {
                const loginRes = await loginRequest({
                    ...values,
                    password: window.btoa(values.password) // base64 인코딩
                })

                if (loginRes.status !== 200) return;

                const meRes = await getMyProfileRequest();
                if (meRes.status !== 200) return;

                setUser(meRes.data.data);
                navigate('/');
            } catch (e) {
                alert(e.response.data.message);
                console.error(`${e.response.data.error} : ${e.response.data.message}`);
            }
        }
    })
    const setUser = useSetAtom(userAtom);

    return (
        <S.Wrapper>
            <S.Title>로그인</S.Title>
            <S.TextInputWrapper>
                <S.InputWrapper>
                    <S.Label>{"이메일"}</S.Label>
                    <S.Input
                        id={"email"}
                        name={"email"}
                        type={"text"}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </S.InputWrapper>
            </S.TextInputWrapper>
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
                <HelperMessage
                    touched={formik.touched.email || formik.touched.password}
                    error={formik.errors.email || formik.errors.password} />
            </S.TextInputWrapper>

            <FormButton title={"로그인"} disabled={!formik.isValid} onClick={formik.handleSubmit}/>
            <S.Link onClick={() => {navigate('/register')}}>회원가입</S.Link>
        </S.Wrapper>
    )
}

export default LoginForm;