import S from './Loading.styled';
import Spinner from '../../assets/spinner.gif'
const Loading = () => {
    return(
        <S.Wrapper>
            <S.Text>잠시만 기다려 주세요.</S.Text>
            <img src={Spinner} alt="로딩중" width="5%" />
        </S.Wrapper>
    )
}

export default Loading;