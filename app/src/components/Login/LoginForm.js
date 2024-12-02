import S from './LoginForm.styled'
import TextInput from "../Input/TextInput";
import FormButton from "../Button/FormButton";
import {useNavigate} from "react-router-dom";
import {error, validator} from "../../utils/utils";
import useForm from "../../hooks/useForm";
import HelperMessage from "../common/HelperMessage";

const LoginForm = () => {
    const navigate = useNavigate();
    const { values, errors, touched, disabled, handleChange, handleBlur, handleSubmit } = useForm({
        initialValues: {
            email: "",
            password: "",
        },
        validate: values => {
            const errors = {
                error: ''
            };

            // 이메일 유효성 검사
            if (!values.email) {
                errors.error = error.EMAIL_BLANK;
            } else if (!validator.email(values.email)) {
                errors.error = error.EMAIL_INVALID;
            } else {
                errors.email = error.BLANK;
            }

            if (!values.email || !validator.email(values.email)) return errors;

            // 비밀번호 유효성 검사
            if (!values.password) {
                errors.error = error.PASSWORD_BLANK;
            } else if (!validator.password(values.password)) {
                errors.error = error.PASSWORD_INVALID;
            } else {
                errors.error = error.BLANK;
            }

            return errors;
        },
        onSubmit: values => {
            // TODO : 로그인 요청
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