import {modalAtom} from "../store/atoms";
import {useAtom} from "jotai";
import {useCallback} from "react";
import WithdrawModal from "../components/Modal/WithdrawModal";
import {blockScroll, unblockScroll} from "../utils/utils";
import PostDeleteModal from "../components/Modal/PostDeleteModal";
import CommentDeleteModal from "../components/Modal/CommentDeleteModal";

const ModalType = {
    withdraw: <WithdrawModal />,
    deletePost: <PostDeleteModal />,
    deleteComment: <CommentDeleteModal />,
}

const useModal = () => {
    const [modal, setModal] = useAtom(modalAtom);

    const closeModal = useCallback(() => {
        unblockScroll();
        setModal(prev => {
            return { ...prev, isOpen: false}
        })
    }, [setModal]);

    const openModal = useCallback((type, id) => {
        blockScroll();
        setModal(prev => {
            return {
                ...prev,
                element: ModalType[type],
                isOpen: true,
                targetId: id
            }
        })
    }, [setModal]);

    return {
        modal,
        closeModal,
        openModal
    };
}

export default useModal;