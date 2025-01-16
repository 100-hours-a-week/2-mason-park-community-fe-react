import styled from "styled-components";

const S = {
    Wrapper: styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
    `,
    Title: styled.div`
        font-weight: 700;
        font-size: 32px;
        line-height: 38px;
        margin-bottom: 20px;
    `,
    Link: styled.span`
        font-size: 14px;
        font-weight: 400;
        cursor: pointer;
        margin: 5px 0;
    `,
    TextInputWrapper: styled.div`
        width: 360px;
        min-height: 95px;
        display: flex;
        flex-direction: column;
    `,
    InputWrapper: styled.div`
        width: 100%;
        display: flex;
        flex-direction: column;
    `,
    Label: styled.label`
        font-weight: 700;
        font-size: 15px;
        line-height: 18px;
        
        margin-bottom: 4px;
    `,
    Input: styled.input`
        height: 33px;
        border-radius: 4px;
        padding: 0 10px;
        margin-bottom: 5px;
    `
}

export default S;