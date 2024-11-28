import styled from "styled-components";
import {IoIosArrowBack} from "react-icons/io";

const S = {
    Wrapper: styled.div`
        width: 100%;
        height: 104px;
        
        display: flex;
        justify-content: center;
        align-items: center;
        
        border-bottom: 1px solid black;
        
    `,
    BackButtonWrapper: styled.div`
        width: 35px;
        height: 35px;
        
        display: flex;
        justify-content: center;
        align-items: center;
        
        cursor: pointer;
    `,
    BackButton: styled(IoIosArrowBack)`
        width: 100%;
        height: 100%;
    `
    ,
    Title: styled.div`
        text-align: center;
        font-size: 32px;
        font-weight: 400;
        
        margin: 0 10%;
    `,
}

export default S;