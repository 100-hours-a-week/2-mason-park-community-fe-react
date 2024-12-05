import S from './UserPasswordForm.styled'
import TextInput from "../Input/TextInput";
import {useAtom} from "jotai";
import {registerErrorAtom as errorAtom} from "../../store/atoms";
import useForm from "../../hooks/useForm";
import {error, validator} from "../../utils/utils";
import HelperMessage from "../common/HelperMessage";
import FormButton from "../Button/FormButton";
import {updatePasswordRequest} from "../../api/user";
import {Slide, toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const UserPasswordForm = () => {
    const [errors, setErrors] = useAtom(errorAtom);
    const { values, touched, disabled, handleChange, handleBlur, handleSubmit } = useForm({
        initialValues: {
            password: '',
            passwordCheck: '',
        },
        validate: async values => {
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

            return [values, errors];
        },
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
    })
    return(
        <>
            <S.Wrapper>
                <S.Title>비밀번호 수정</S.Title>

                <S.TextInputWrapper>
                    <TextInput
                        type={"password"}
                        title={"비밀번호"}
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
                        title={"비밀번호 확인"}
                        name={"passwordCheck"}
                        value={values.passwordCheck}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <HelperMessage touched={touched.passwordCheck} error={errors.passwordCheck} />
                </S.TextInputWrapper>

                <FormButton
                    title={"수정하기"}
                    disabled={disabled}
                    onClick={handleSubmit}
                />
                <ToastContainer/>
            </S.Wrapper>
        </>
    )
}

export default UserPasswordForm;