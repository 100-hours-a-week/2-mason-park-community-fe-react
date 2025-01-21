import S from './LoginForm.styled'
import FormButton from "../Button/FormButton";
import {useNavigate} from "react-router-dom";
import {error} from "../../utils/utils";
import HelperMessage from "../common/HelperMessage";
import {getMyProfileRequest} from "../../api/user";
import {userAtom} from "../../store/atoms";
import {useFormik} from "formik";
import * as Yup from "yup";
import {adminLoginRequest} from "../../api/admin";
import {useAtom} from "jotai";

const AdminLoginForm = () => {
    const [me, setMe] = useAtom(userAtom);
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            secretKey: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .required(error.EMAIL_BLANK),

            password: Yup.string()
                .required(error.PASSWORD_BLANK),

            secretKey: Yup.string()
                .required(error.SECRET_KEY_BLANK)
        }),
        onSubmit: async (values) => {
            try {
                const loginRes = await adminLoginRequest({
                    ...values,
                    password: window.btoa(values.password), // base64 인코딩
                    secretKey: window.btoa(values.secretKey)
                })

                if (loginRes.status !== 200) return;

                const meRes = await getMyProfileRequest();
                if (meRes.status !== 200) return;

                setMe(meRes.data.data);
                navigate('/admin/home');
            } catch (e) {
                alert(e.response.data.message);
                console.error(`${e.response.data.error} : ${e.response.data.message}`);
            }
        }
    })

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
            </S.TextInputWrapper>
            <S.TextInputWrapper>
                <S.InputWrapper>
                    <S.Label>{"시크릿 키"}</S.Label>
                    <S.Input
                        id={"secretKey"}
                        name={"secretKey"}
                        type={"password"}
                        value={formik.values.secretKey}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </S.InputWrapper>
                <HelperMessage
                    touched={formik.touched.email || formik.touched.password || formik.touched.secretKey}
                    error={formik.errors.email || formik.errors.password || formik.touched.secretKey} />
            </S.TextInputWrapper>


            <FormButton title={"로그인"} disabled={!formik.isValid} onClick={formik.handleSubmit}/>
        </S.Wrapper>
    )
}

export default AdminLoginForm;