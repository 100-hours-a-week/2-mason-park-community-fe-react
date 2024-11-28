import S from './TextInput.styled'

const TextInput = ({title, name, type="text", placeholder="", error}) => {

    return (
        <S.Wrapper>
            <S.Label>{title}</S.Label>
            <S.Input name={name} type={type} placeholder={placeholder}/>
            { error ? (<S.Helper>{error.message}</S.Helper>) : null }
        </S.Wrapper>
    )
}

export default TextInput;
