import S from './TextInput.styled'

const TextInput = ({title, name, type="text", error, touched, onChange, onBlur}) => {

    return (
        <S.Wrapper>
            <S.Label>{title}</S.Label>
            <S.Input
                name={name}
                type={type}
                onChange={onChange}
                onBlur={onBlur}
            />
            { touched && error && <S.Helper>{error}</S.Helper> }
        </S.Wrapper>
    )
}

export default TextInput;
