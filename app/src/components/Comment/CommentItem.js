import S from './CommentItem.styled';
import Profile from "../common/Profile";
import DetailButton from "../Button/DetailButton";
import {useAtom, useAtomValue} from "jotai";
import {commentAtom, userAtom} from "../../store/atoms";
import {useParams} from "react-router-dom";
import useModal from "../../hooks/useModal";

const CommentItem = ({
    comment_id,
    content,
    user,
    created_at
 }) => {
    const {modal, openModal} = useModal();
    const params = useParams();
    const me = useAtomValue(userAtom);
    const [_, setComment] = useAtom(commentAtom);

    const modifyHandler = () => {
        setComment({
            comment_id: comment_id,
            content: content
        })
    }

    return (
        <S.Wrapper>
            <S.MetaContainer>
                <Profile {...user} />
                <S.MetaTime>{created_at}</S.MetaTime>
                {user && user.user_id === me.user_id && (
                    <S.MetaButtonContainer>
                        <DetailButton title={"수정"} handler={modifyHandler} />
                        <DetailButton title={"삭제"} />
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