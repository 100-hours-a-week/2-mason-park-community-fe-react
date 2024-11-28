import S from './ImageInput.styled'

const ImageInput = ({title, name, type="file", error}) => {

    return (
        <S.Wrapper>
            <S.Label>{title}</S.Label>
            { error ? (<S.Helper>{error.message}</S.Helper>) : null }
            <S.ImageBox>
                <S.NoImage/>
                <S.Input name={name} type={type} />
            </S.ImageBox>
        </S.Wrapper>
    )
}

export default ImageInput;
