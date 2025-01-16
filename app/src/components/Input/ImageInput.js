import S from './ImageInput.styled'
import SC from '../common/common.styled'
import {useRef, useState} from "react";
import {error} from "../../utils/utils";
import {useAtomValue} from "jotai";
import {userAtom} from "../../store/atoms";
import {createPreSignedUrl, uploadImageToS3} from "../../api/common";

const ImageInput = ({title, name, type="file"}) => {
    const user = useAtomValue(userAtom);
    const [imageUrl, setImageUrl] = useState(user.profile_image);
    const fileInputRef = useRef(null);

    const openInput = () => {
        if (!fileInputRef.current) return;
        fileInputRef.current.click();
    }

    const addImage = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB
        if (file.size > MAX_FILE_SIZE) {
            alert('이미지 파일 크기가 1MB를 초과합니다. 다른 파일을 선택해주세요.');
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async (e) => {
            setImageUrl(reader.result);

            try {
                const res = await createPreSignedUrl({
                    filename: file.name,
                    path: process.env.REACT_APP_S3_USER
                });

                if (res.status !== 201) return;

                const result = await uploadImageToS3(res.data.data.preSignedUrl, file);
                localStorage.setItem('image', `${process.env.REACT_APP_CDN_URL}${res.data.data.key}`);
            } catch (e) {
                console.error(`${e.response.data.error} : ${e.response.data.message}`);
            }
        }
    }

    return (
        <S.Wrapper>
            <S.Label>{title}</S.Label>
            { !imageUrl && <SC.Helper>{error.PROFILE_IMG_BLANK}</SC.Helper>}
            <S.ImageBox onClick={openInput}>
                { imageUrl ? (<S.Image src={imageUrl} />) : (<S.NoImage/>)}
                <S.Input name={name} type={type} accept={'image/png, image/jpg, image/jpeg, image/gif'} ref={fileInputRef} onChange={addImage} />
            </S.ImageBox>
        </S.Wrapper>
    )
}

export default ImageInput;
