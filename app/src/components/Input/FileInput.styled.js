import styled from "styled-components";
import {FaXmark} from "react-icons/fa6";

const S = {
    Wrapper: styled.div`
        width: 360px;
        min-height: 50px;
        display: flex;
        flex-direction: column;
    `,
    Label: styled.label`
        font-weight: 700;
        font-size: 15px;
        line-height: 18px;
        
        margin-bottom: 4px;
    `,
    InputWrapper: styled.div`
        display: flex;
        align-items: center;
    `,
    InputButton: styled.label`
        width : 80px;
        height: 30px;
        background-color: #1ED760;
        color: black;
        border-radius: 4px;
        
        font-weight: 700;
        font-size: 15px;
        line-height: 30px;
        text-align: center;
        
        margin: 5px 0;
        cursor: pointer;
    `,
    InputFilename: styled.span`
        width: 250px;
        font-size: 14px;
        color: white;
        font-weight: 700;
        margin-left: 10px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    `,
    CancelButton: styled(FaXmark)`
        width: 20px;
        height: 20px;
        cursor: pointer;
    `,
    Input: styled.input`
        display: none;
    `,
}

export default S;