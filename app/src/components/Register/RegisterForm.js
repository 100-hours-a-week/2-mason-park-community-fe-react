import S from './RegisterForm.styled'
import TextInput from "../Input/TextInput";
import FormButton from "../Button/FormButton";
import {useNavigate} from "react-router-dom";
import ImageInput from "../Input/ImageInput";
import useForm from "../../hooks/useForm";
import {error, validator} from "../../utils/utils";
import HelperMessage from "../common/HelperMessage";

const RegisterForm = () => {
    const navigate = useNavigate();

    const { values, errors, touched, disabled, handleChange, handleBlur, handleSubmit } = useForm({
        initialValues: {
            email: "",
            password: "",
            passwordCheck: "",
            nickname: "",
        },
        validate: values => {
            const errors = {
                email: error.EMAIL_BLANK,
                password: error.PASSWORD_BLANK,
                passwordCheck: error.CHECK_PASSWORD_BLANK,
                nickname: error.NICKNAME_BLANK,
            };

            // 이메일 유효성 검사
            if (!values.email) {
                errors.email = error.EMAIL_BLANK;
            } else if (!validator.email(values.email)) {
                errors.email = error.EMAIL_INVALID;
            } else {
                // TODO : 이메일 중복 검사
                errors.email = error.BLANK;
            }

            // 비밀번호 유효성 검사
            if (!values.password) {
                errors.password = error.PASSWORD_BLANK;
            } else if (!validator.password(values.password)) {
                errors.password = error.PASSWORD_INVALID;
            } else {
                errors.password = error.BLANK;
            }

            // 비밀번호 확인 유효성 검사
            if (!values.passwordCheck) {
                errors.passwordCheck = error.CHECK_PASSWORD_BLANK;
            } else if (!validator.checkPassword(values.password, values.passwordCheck)) {
                errors.passwordCheck = error.PASSWORD_NOT_MATCH;
            } else {
                errors.passwordCheck = error.BLANK;
            }

            // 닉네임 유효성 검사
            if (!values.nickname) {
                errors.nickname = error.NICKNAME_BLANK;
            } else if (values.nickname.includes(' ')) {
                errors.nickname = error.NICKNAME_INCLUDE_SPACE
            } else if (values.nickname.length >= 11) {
                errors.nickname = error.NICKNAME_EXCEED_MAX_LEN
            } else {
                // TODO : 닉네임 중복 검사
                errors.nickname = error.BLANK;
            }

            return errors;
        },
        onSubmit: values => {
            // TODO : 회원가입 요청
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