import styled from "styled-components";

const S = {
    Wrapper: styled.div`
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
        border: 1px solid black;
        padding: 0 10px;
        margin-bottom: 5px;
    `,
}

export default S;