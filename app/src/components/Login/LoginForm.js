import S from './LoginForm.styled'
import TextInput from "../Input/TextInput";
import FormButton from "../Button/FormButton";
import {useNavigate} from "react-router-dom";
import {error, validator} from "../../utils/utils";
import useForm from "../../hooks/useForm";
import HelperMessage from "../common/HelperMessage";
import {useAtom, useSetAtom} from "jotai";
import {login} from "../../api/auth";
import {getMyProfile} from "../../api/user";
import {userAtom, commonErrorAtom as errorAtom} from "../../store/atoms";

const LoginForm = () => {
    const navigate = useNavigate();
    const [errors, setErrors] = useAtom(errorAtom);
    const setUser= useSetAtom(userAtom);
    const { values, touched, disabled, handleChange, handleBlur, handleSubmit } = useForm({
        initialValues: {
            email: "",
            password: "",
        },
        validate:  values => {

            // 이메일 유효성 검사 : 입력
            if (!values.email) {
                setErrors((prev) => {
                    return {...prev, error: error.EMAIL_BLANK}
                });
            }
            // 이메일 유효성 검사 : 정규식
            else if (!validator.email(values.email)) {
                setErrors((prev) => {
                    return {...prev, error: error.EMAIL_INVALID }
                });
            }
            // 이메일 유효성 검사 : 중복
            else {
                setErrors((prev) => {
                    return {...prev, error: error.BLANK }
                });
            }

            if (!values.email || !validator.email(values.email)) return [values, errors];

            // 비밀번호 유효성 검사 : 입력
            if (!values.password) {
                setErrors((prev) => {
                    return {...prev, error: error.PASSWORD_BLANK }
                });
            }
            // 비밀번호 유효성 검사 : 정규식
            else if (!validator.password(values.password)) {
                setErrors((prev) => {
                    return {...prev, error: error.PASSWORD_INVALID }
                });
            }
            // 비밀번호 유효성 검사 : 통과
            else {
                setErrors((prev) => {
                    return {...prev, error: error.BLANK }
                });
            }

            return [values, errors];
        },
        onSubmit: async values => {
            try {
                const loginRes = await login({
                    ...values,
                    password: window.btoa(values.password)
                })

                if (loginRes.status !== 200) return;

                const meRes = await getMyProfile();
                if (meRes.status !== 200) return;

                setUser(meRes.data);
                navigate('/');
            } catch (e) {
                console.error(`${e.response.data.error} : ${e.response.data.message}`);
                setErrors((prev) => {
                    return {...prev, error: e.response.data.message }
                });
            }
        }
    })
    return (
        <S.Wrapper>
            <S.Title>로그인</S.Title>
            <S.TextInputWrapper>
                <TextInput
                    title={"이메일"}
                    name={"email"}
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            </S.TextInputWrapper>
            <S.TextInputWrapper>
                <TextInput
                    type={"password"}
                    title={"비밀번호"}
                    name={"password"}
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <HelperMessage touched={touched.email || touched.password} error={errors.error} />
            </S.TextInputWrapper>

            <FormButton title={"로그인"} disabled={disabled} onClick={handleSubmit}/>
            <S.Link onClick={() => {navigate('/register')}}>회원가입</S.Link>
        </S.Wrapper>
    )
}

export default LoginForm;