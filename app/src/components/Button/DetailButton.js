import S from './DetailButton.styled';

const DetailButton = ({title, handler}) => {

    return (
        <S.Button onClick={handler} >
            {title}
        </S.Button>
    )
}

export default DetailButton;