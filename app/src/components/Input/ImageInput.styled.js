import styled from "styled-components";
import {FaPlus} from "react-icons/fa6";

const S = {
    Wrapper: styled.div`
        width: 360px;
        min-height: 190px;
        display: flex;
        flex-direction: column;
    `,
    Label: styled.label`
        font-weight: 700;
        font-size: 15px;
        line-height: 18px;
        
        margin-bottom: 4px;
    `,
    ImageBox: styled.div`
        width: 150px;
        height: 150px;
        
        align-self: center;
        display: flex;
        justify-content: center;
        align-items: center;
        
        border: 1px solid #B3B3B3;
        background-color: #535353;
        border-radius: 50%;
        overflow: hidden;
        cursor: pointer;
    `,
    Image: styled.img`
        width: 150px;
        height: 150px;
    `,

    NoImage: styled(FaPlus)`
        color: #B3B3B3;
        width: 35px;
        height: 35px;
    `,

    Input: styled.input`
        display: none;
    `,

}

export default S;