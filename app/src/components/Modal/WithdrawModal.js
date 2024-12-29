import S from './Modal.styled'
import useModal from "../../hooks/useModal";

const WithdrawModal = () => {
    const {modal, closeModal} = useModal();

    return(
        <>
            <S.Title>회원탈퇴 하시겠습니까?</S.Title>
            <S.Content>작성된 게시글과 댓글은 삭제됩니다</S.Content>
            <S.ButtonWrapper>
                <S.CancelButton onClick={closeModal}>
                    취소
                </S.CancelButton>
                <S.ConfirmButton onClick={modal.handler}>
                    확인
                </S.ConfirmButton>
            </S.ButtonWrapper>
        </>
    )
}

export default WithdrawModal;