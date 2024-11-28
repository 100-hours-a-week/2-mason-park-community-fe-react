import S from './CommonButton.styled';

const CommonButton = ({title, handler, disabled}) => {

    return (
        <S.Button onClick={handler} disabled={disabled}>
            {title}
        </S.Button>
    )
}

export default CommonButton;