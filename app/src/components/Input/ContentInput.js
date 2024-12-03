import S from './ContentInput.styled'

const ContentInput = ({title, name, value, onChange, onBlur}) => {

    return (
        <S.Wrapper>
            <S.Label>{title}</S.Label>
            <S.Textarea
                name={name}
                placeholder={'내용을 입력해주세요.'}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
            />
        </S.Wrapper>
    )
}

export default ContentInput;
