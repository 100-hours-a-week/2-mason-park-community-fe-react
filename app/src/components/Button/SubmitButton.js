import S from './SubmitButton.styled';

const SubmitButton = ({title, handler, disabled}) => {

    return (
        <S.Button onClick={handler} disabled={disabled}>
            {title}
        </S.Button>
    )
}

export default SubmitButton;