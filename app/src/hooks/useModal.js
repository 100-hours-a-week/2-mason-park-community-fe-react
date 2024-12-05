import {modalAtom} from "../store/atoms";
import {useAtom} from "jotai";
import {useCallback} from "react";
import WithdrawModal from "../components/Modal/WithdrawModal";
import {blockScroll, unblockScroll} from "../utils/utils";

const ModalType = {
    withdraw: <WithdrawModal />
}

const useModal = () => {
    const [modal, setModal] = useAtom(modalAtom);

    const closeModal = useCallback(() => {
        unblockScroll();
        setModal(prev => {
            return { ...prev, isOpen: false}
        })
    }, [setModal]);

    const openModal = useCallback(type => {
        blockScroll();
        setModal(prev => {
            return {
                ...prev,
                element: ModalType[type],
                isOpen: true
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