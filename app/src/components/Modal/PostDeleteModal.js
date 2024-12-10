import S from './Modal.styled'
import useModal from "../../hooks/useModal";
import {useNavigate} from "react-router-dom";
import {deletePostRequest} from "../../api/post";

const PostDeleteModal = () => {
    const navigate = useNavigate();
    const {modal, closeModal} = useModal();
    const deletePost = async () => {
        try {
            await deletePostRequest(modal.targetId);

            closeModal();
            navigate("/");
        } catch (e) {
            console.error(`${e.response.data.error} : ${e.response.data.message}`);
        }
    }
    return(
        <>
            <S.Title>게시글을 삭제하시겠습니까?</S.Title>
            <S.Content>삭제한 내용은 복구할 수 없습니다.</S.Content>
            <S.ButtonWrapper>
                <S.CancelButton onClick={closeModal}>
                    취소
                </S.CancelButton>
                <S.ConfirmButton onClick={deletePost}>
                    확인
                </S.ConfirmButton>
            </S.ButtonWrapper>
        </>
    )
}

export default PostDeleteModal;