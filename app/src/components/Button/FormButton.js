import S from './FormButton.styled';

const FormButton = ({title, disabled, onClick}) => {

    return (
        <S.Button onClick={onClick} disabled={disabled}>
            {title}
        </S.Button>
    )
}

export default FormButton;