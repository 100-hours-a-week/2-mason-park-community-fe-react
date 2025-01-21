import {modalAtom} from "../store/atoms";
import {useAtom} from "jotai";
import {useCallback} from "react";
import WithdrawModal from "../components/Modal/WithdrawModal";
import {blockScroll, unblockScroll} from "../utils/utils";
import PostDeleteModal from "../components/Modal/PostDeleteModal";
import CommentDeleteModal from "../components/Modal/CommentDeleteModal";
import UserDeleteModal from "../components/Modal/UserDeleteModal";

const ModalType = {
    withdraw: <WithdrawModal />,
    deletePost: <PostDeleteModal />,
    deleteComment: <CommentDeleteModal />,
    deleteUser: <UserDeleteModal />,
}

const useModal = () => {
    const [modal, setModal] = useAtom(modalAtom);

    const closeModal = useCallback(() => {
        unblockScroll();
        setModal(prev => {
            return { ...prev, isOpen: false}
        })
    }, [setModal]);

    const openModal = useCallback((type, handler) => {
        blockScroll();
        setModal(prev => {
            return {
                ...prev,
                element: ModalType[type],
                isOpen: true,
                handler: handler
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