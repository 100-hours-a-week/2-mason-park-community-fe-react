import S from './Modal.styled'
import useModal from "../../hooks/useModal";
import {withdrawRequest} from "../../api/user";
import {useNavigate} from "react-router-dom";

const WithdrawModal = () => {
    const navigate = useNavigate();
    const {closeModal} = useModal();
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
            <S.Title>회원탈퇴 하시겠습니까?</S.Title>
            <S.Content>작성된 게시글과 댓글은 삭제됩니다</S.Content>
            <S.ButtonWrapper>
                <S.CancelButton onClick={closeModal}>
                    취소
                </S.CancelButton>
                <S.ConfirmButton onClick={withdraw}>
                    확인
                </S.ConfirmButton>
            </S.ButtonWrapper>
        </>
    )
}

export default WithdrawModal;