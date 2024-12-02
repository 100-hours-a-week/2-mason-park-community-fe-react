import S from './ImageInput.styled'
import { useRef, useState } from "react";
import {error} from "../../utils/utils";

const ImageInput = ({title, name, type="file"}) => {
    const [imageUrl, setImageUrl] = useState('');
    const fileInputRef = useRef(null);

    const openInput = () => {
        if (!fileInputRef.current) return;
        fileInputRef.current.click();
    }

    const addImage = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = (e) => {
            setImageUrl(reader.result);

            // TODO : 로컬 스토리지 저장
            // TODO : 이미지 등록
        }
    }

    return (
        <S.Wrapper>
            <S.Label>{title}</S.Label>
            { !imageUrl && <S.Helper>{error.PROFILE_IMG_BLANK}</S.Helper>}
            <S.ImageBox onClick={openInput}>
                { imageUrl ? (<S.Image src={imageUrl} />) : (<S.NoImage/>)}
                <S.Input name={name} type={type} accept={'image/png, image/jpg, image/jpeg'} ref={fileInputRef} onChange={addImage} />
            </S.ImageBox>
        </S.Wrapper>
    )
}

export default ImageInput;
