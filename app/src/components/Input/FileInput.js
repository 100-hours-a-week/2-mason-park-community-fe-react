import S from './FileInput.styled'
import { useRef } from "react";

const FileInput = ({title, name, type="file"}) => {
    const fileInputRef = useRef(null);

    const addImage = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = (e) => {
            localStorage.setItem('profileImage', reader.result);
        }
    }

    return (
        <S.Wrapper>
            <S.Label>{title}</S.Label>
            <S.Input name={name} type={type} accept={'image/png, image/jpg, image/jpeg'} ref={fileInputRef} onChange={addImage} />
        </S.Wrapper>
    )
}

export default FileInput;
