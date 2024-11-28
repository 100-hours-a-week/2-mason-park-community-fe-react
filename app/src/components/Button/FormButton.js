import S from './FormButton.styled';

const FormButton = ({title, handler, disabled}) => {

    return (
        <S.Button onClick={handler} disabled={disabled}>
            {title}
        </S.Button>
    )
}

export default FormButton;