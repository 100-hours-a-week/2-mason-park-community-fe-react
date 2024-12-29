import S from './Modal.styled'
import useModal from "../../hooks/useModal";

const CommentDeleteModal = () => {
    const {modal, closeModal} = useModal();

    return(
        <>
            <S.Title>댓글을 삭제하시겠습니까?</S.Title>
            <S.Content>삭제한 내용은 복구할 수 없습니다.</S.Content>
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

export default CommentDeleteModal;