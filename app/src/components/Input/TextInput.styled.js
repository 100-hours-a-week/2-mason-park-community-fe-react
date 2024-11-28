import styled from "styled-components";

const S = {
    Wrapper: styled.div`
        width: 360px;
        min-height: 80px;
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
        border: 1px solid black;
        padding: 0 10px;
        margin-bottom: 5px;
    `,
    Helper: styled.div`
        font-size: 12px;
        font-weight: 400;
        color: #FF0000;
    `

}

export default S;