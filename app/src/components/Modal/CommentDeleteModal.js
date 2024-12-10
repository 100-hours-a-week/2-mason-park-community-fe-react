import S from './Modal.styled'
import useModal from "../../hooks/useModal";
import {deleteCommentRequest} from "../../api/comment";
import {changeAtom} from "../../store/atoms";
import {useAtom} from "jotai";

const CommentDeleteModal = () => {
    const {modal, closeModal} = useModal();
    const [_, setIsChange] = useAtom(changeAtom);

    const deleteComment = async () => {
        try {
            await deleteCommentRequest(modal.targetId.post_id, modal.targetId.comment_id);
            setIsChange(true);
            closeModal();
        } catch (e) {
            console.error(`${e.response.data.error} : ${e.response.data.message}`);
        }
    }
    return(
        <>
            <S.Title>댓글을 삭제하시겠습니까?</S.Title>
            <S.Content>삭제한 내용은 복구할 수 없습니다.</S.Content>
            <S.ButtonWrapper>
                <S.CancelButton onClick={closeModal}>
                    취소
                </S.CancelButton>
                <S.ConfirmButton onClick={deleteComment}>
                    확인
                </S.ConfirmButton>
            </S.ButtonWrapper>
        </>
    )
}

export default CommentDeleteModal;