import styled from "styled-components";

const S = {
    Wrapper: styled.div`
        width: 100%;
        display: flex;
        flex-direction: column;
        margin: 20px 0;
    `,
    Label: styled.label`
        font-weight: 700;
        font-size: 15px;
        line-height: 18px;
        
        margin-bottom: 4px;
    `,
    Input: styled.input`
        height: 65px;
        font-size: 16px;
        font-weight: 700;
        border-radius: 0;
        border: none;
        border-top: 1px solid black;
        border-bottom: 1px solid black;
        padding: 0 20px;
    `,
}

export default S;