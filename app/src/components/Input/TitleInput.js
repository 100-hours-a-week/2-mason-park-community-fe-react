import S from './TitleInput.styled'

const TitleInput = ({title, name, value, onChange, onBlur}) => {

    return (
        <S.Wrapper>
            <S.Label>{title}</S.Label>
            <S.Input
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                placeholder={'제목을 입력해주세요. (최대 26글자)'}
            />
        </S.Wrapper>
    )
}

export default TitleInput;
