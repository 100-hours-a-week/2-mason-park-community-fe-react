import S from './FileInput.styled'
import {useState} from "react";

const FileInput = ({title, name, type="file", onChange}) => {
    const [filename, setFilename] = useState();
    return (
        <S.Wrapper>
            <S.Label>{title}</S.Label>
            <S.InputWrapper>
                <S.InputButton htmlFor={'file'}>파일 찾기</S.InputButton>
                <S.InputFilename>{filename}</S.InputFilename>
                <S.Input
                    id={'file'}
                    name={name}
                    type={type}
                    accept={'image/png, image/jpg, image/jpeg'}
                    onChange={(e) => {onChange(e, setFilename)}}/>
            </S.InputWrapper>
        </S.Wrapper>
    )
}

export default FileInput;
