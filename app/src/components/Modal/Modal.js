import S from './Modal.styled';
import useModal from "../../hooks/useModal";

const Modal = () => {
    const {modal, closeModal} = useModal();

    return (
        <S.Wrapper onClick={closeModal}>
            <S.Box>
                {modal.element}
            </S.Box>
        </S.Wrapper>
    )
}

export default Modal;