import styled from "styled-components";
import {FaHeart, FaRegHeart} from "react-icons/fa";

const S = {
    Wrapper: styled.div`
        width: 100%;
        
        display: flex;
        flex-direction: column;
        
        padding: 10px 20px;
    `,
    HeaderWrapper: styled.div`
        display: flex;
        flex-direction: column;
    `,
    HeaderTitle: styled.h1`
        font-weight: 700;
        font-size: 24px;
        line-height: 31px;
    `,
    MetaContainer: styled.div`
        display: flex;
        align-items: center;
        margin: 10px 0;
    `,
    MetaTime: styled.span`
        font-size: 14px;
        margin-left : 15px;
    `,
    MetaButtonContainer: styled.div`
        display: flex;
        align-items: center;
        margin-left: auto;
    `,
    ContentContainer: styled.div`
        width: 550px;
        
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        
        border-top: 1px solid #1ED760;
        border-bottom: 1px solid #1ED760;
    `,
    ContentImage: styled.img`
        width: 100%;
        height: 300px;
        object-fit: scale-down;
        
        margin: 10px 0;
    `,
    ContentText: styled.span`
        width: 100%;
        
        font-weight: 400;
        font-size: 15px;
        line-height: 21px;
        text-align: start;
        min-height: 300px;
        margin: 10px 0;
    `,
    CountContainer: styled.div`
        width: 360px;
        
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 10px 0;
    `,
    CountBox: styled.div`
        width: 115px;
        height: 75px;
        
        border-radius: 16px;
        background-color: #1ED760;
        color: black;
        font-size: 20px;
        font-weight: 700;
        line-height: 35px;
        text-align: center;
    `,
    EmptyHeart: styled(FaRegHeart)`
        color: #1ED760;
        width: 30px;
        height: 30px;
        margin-bottom: 10px;
        cursor: pointer;
    `,
    FillHeart: styled(FaHeart)`
        color: #1ED760;
        width: 30px;
        height: 30px;
        margin-bottom: 10px;
        cursor: pointer;
    `

}

export default S;