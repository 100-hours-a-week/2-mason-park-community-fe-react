import styled from "styled-components";

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
    `,
    InputFilename: styled.span`
        font-size: 14px;
        color: white;
        font-weight: 700;
        margin-left: 10px;
    `,
    Input: styled.input`
        display: none;
    `,
}

export default S;