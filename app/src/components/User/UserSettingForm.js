import S from './UserSettingForm.styled'
import ImageInput from "../Input/ImageInput";
import {useAtom} from "jotai";
import {userAtom} from "../../store/atoms";
import {existNickname} from "../../api/auth";
import {error} from "../../utils/utils";
import HelperMessage from "../common/HelperMessage";
import FormButton from "../Button/FormButton";
import {updateMyProfileRequest, withdrawRequest} from "../../api/user";
import {Slide, toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import useModal from "../../hooks/useModal";
import {useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useEffect} from "react";
import {debounce} from "lodash";

const UserSettingForm = () => {
    const navigate = useNavigate();
    const [user, setUser] = useAtom(userAtom);
    const {openModal, closeModal} = useModal();
    const formik = useFormik({
        initialValues: {
            nickname: user.nickname,
        },
        validationSchema: Yup.object({
            nickname: Yup.string()
                .required(error.NICKNAME_BLANK)
                .matches(
                    /^[^\s]{1,10}$/,
                    error.NICKNAME_INVALID
                )
        }),
        onSubmit: async values => {
            try {
                // 이미지 변경 여부
                const profile = localStorage.getItem("image");
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

    useEffect(() => {
        if (!formik.values.nickname) return;
        if (formik.values.nickname === user.nickname) return;

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

    const withdraw = async () => {
        try {
            await withdrawRequest();

            closeModal();
            localStorage.clear();
            navigate("/login");
        } catch (e) {
            console.error(`${e.response.data.error} : ${e.response.data.message}`);
        }
    }
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
                    title={"수정하기"}
                    disabled={!formik.isValid}
                    onClick={formik.handleSubmit}
                />
                <S.Link onClick={() => openModal('withdraw', withdraw)}>회원 탈퇴</S.Link>
                <ToastContainer/>
            </S.Wrapper>
        </>
    )
}

export default UserSettingForm;