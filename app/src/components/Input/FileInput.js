import S from './FileInput.styled'

const FileInput = ({title, name, type="file", onChange}) => {

    return (
        <S.Wrapper>
            <S.Label>{title}</S.Label>
            <S.Input
                name={name}
                type={type}
                accept={'image/png, image/jpg, image/jpeg'}
                onChange={onChange} />
        </S.Wrapper>
    )
}

export default FileInput;
