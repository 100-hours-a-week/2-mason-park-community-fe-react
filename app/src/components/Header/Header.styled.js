import styled from "styled-components";
import {IoIosArrowBack} from "react-icons/io";

const S = {
    Wrapper: styled.div`
        width: 600px;
        height: 100%;
        
        display: grid;
        grid-template-columns: 150px auto 150px;
        align-items: center;
        justify-items: center;
        
        position: relative;
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
        
        cursor: pointer;
    `,
    ProfileWrapper: styled.div`
        width: 100px;
        display: flex;
        justify-content: space-between;
    `
}

export default S;