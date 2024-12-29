import S from './CommentItem.styled';
import Profile from "../common/Profile";
import DetailButton from "../Button/DetailButton";
import {useAtom, useAtomValue} from "jotai";
import {changeAtom, commentAtom, userAtom} from "../../store/atoms";
import {useParams} from "react-router-dom";
import useModal from "../../hooks/useModal";
import {deleteCommentRequest} from "../../api/comment";

const CommentItem = ({
    comment_id,
    content,
    user,
    created_at,
    setPost
 }) => {
    const {openModal, closeModal} = useModal();
    const params = useParams();
    const me = useAtomValue(userAtom);
    const [comment, setComment] = useAtom(commentAtom);
    const [isChange, setIsChange] = useAtom(changeAtom);

    const modifyHandler = () => {
        setComment({
            comment_id: comment_id,
            content: content
        })
    }

    const deleteComment = async () => {
        try {
            await deleteCommentRequest(params.post_id, comment_id);
            setIsChange(true);
            setPost(prev => ({
                ...prev,
                comment_count: prev.comment_count - 1
            }))
            closeModal();
        } catch (e) {
            console.error(`${e.response.data.error} : ${e.response.data.message}`);
        }
    }

    const clickOpenModal = () => {
        openModal('deleteComment', deleteComment);
    }

    return (
        <S.Wrapper>
            <S.MetaContainer>
                <Profile {...user} />
                <S.MetaTime>{created_at}</S.MetaTime>
                {user && user.user_id === me.user_id && (
                    <S.MetaButtonContainer>
                        <DetailButton title={"수정"} handler={modifyHandler} />
                        <DetailButton title={"삭제"} handler={clickOpenModal} />
                    </S.MetaButtonContainer>
                )}
            </S.MetaContainer>
            <S.Content>
                {content}
            </S.Content>
        </S.Wrapper>
    )
}

export default CommentItem;