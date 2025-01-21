import S from './UserItem.styled'
import ProfileImage from "../common/ProfileImage";
import useModal from "../../hooks/useModal";
import {adminDeleteUsersRequest} from "../../api/admin";
import {useAtom} from "jotai";
import {changeAtom, userAtom} from "../../store/atoms";

const UserItem = ({
    user_id,
    email,
    nickname,
    profile_image,
    created_at,
    setUsers
}) => {
    const {openModal, closeModal} = useModal();
    const [me, setMe] = useAtom(userAtom);

    const clickOpenModal = () => {
        openModal('deleteUser', deleteUser);
    }

    const deleteUser = async () => {
        try {
            await adminDeleteUsersRequest(user_id);
            setUsers(prev => prev.filter(user => user.user_id !== user_id));
            closeModal();
        } catch (e) {
            console.error(`${e.response.data.error} : ${e.response.data.message}`);
        }
    }

    return (
        <S.Wrapper>
            <S.UserContainer>
                <S.No>{user_id}</S.No>
                <ProfileImage imageUrl={profile_image}/>
                <S.Text>{email}</S.Text>
                <S.Nickname>{nickname}</S.Nickname>
                <S.Text>{created_at}</S.Text>
            </S.UserContainer>
            <S.ControlBox>
                {me.user_id !== user_id && <S.TrashCan onClick={clickOpenModal}/>}
            </S.ControlBox>
        </S.Wrapper>
    )
}

export default UserItem;