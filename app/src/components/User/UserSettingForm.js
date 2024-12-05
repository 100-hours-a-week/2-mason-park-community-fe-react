import S from './UserSettingForm.styled'
import ImageInput from "../Input/ImageInput";
import TextInput from "../Input/TextInput";
import {useAtom} from "jotai";
import {commonErrorAtom as errorAtom} from "../../store/atoms";
import {userAtom} from "../../store/atoms";
import useForm from "../../hooks/useForm";
import {existNickname} from "../../api/auth";
import {error} from "../../utils/utils";
import HelperMessage from "../common/HelperMessage";
import FormButton from "../Button/FormButton";
import {updateMyProfileRequest} from "../../api/user";
import {Slide, toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import useModal from "../../hooks/useModal";

const UserSettingForm = () => {
    const [user, setUser] = useAtom(userAtom);
    const [errors, setErrors] = useAtom(errorAtom);
    const {openModal} = useModal();
    const { values, touched, disabled, handleChange, handleBlur, handleSubmit } = useForm({
        initialValues: {
            nickname: user.nickname
        },
        validate: async values => {
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
            else if (values.nickname !== user.nickname) {
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
        onSubmit: async values => {
            try {
                // 이미지 변경 여부
                const profile = localStorage.getItem("profileImage");
                const data = {
                    ...values,
                    profile_image: profile ? profile : user.profile_image
                }

                // 회원 정보 수정 API 호출
                const res = await updateMyProfileRequest(data);

                if (res.status !== 200) return;

                // 변경 사항 반영
                setUser(prev => ({
                    ...prev,
                    nickname: data.nickname,
                    profile_image: data.profile_image
                }))

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
                <S.Title>회원정보수정</S.Title>
                <ImageInput
                    title={"프로필 사진"}
                    name={"profileImage"}
                />
                <S.TextWrapper>
                    <S.Label>이메일</S.Label>
                    <S.Content>{user.email}</S.Content>
                </S.TextWrapper>
                <S.TextInputWrapper>
                    <TextInput
                        title={"닉네임"}
                        name={"nickname"}
                        value={values.nickname}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <HelperMessage touched={touched.nickname} error={errors.nickname} />
                </S.TextInputWrapper>
                <FormButton
                    title={"수정하기"}
                    disabled={disabled}
                    onClick={handleSubmit}
                />
                <S.Link onClick={() => openModal('withdraw')}>회원 탈퇴</S.Link>
                <ToastContainer/>
            </S.Wrapper>
        </>
    )
}

export default UserSettingForm;