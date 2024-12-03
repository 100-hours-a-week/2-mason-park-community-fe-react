import S from './TextInput.styled'

const TextInput = ({title, name, value, type="text", onChange, onBlur}) => {

    return (
        <S.Wrapper>
            <S.Label>{title}</S.Label>
            <S.Input
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
            />
        </S.Wrapper>
    )
}

export default TextInput;
