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
    Textarea: styled.textarea`
        height: 300px;
        resize: none;
        border: none;
        border-top: 1px solid black;
        border-bottom: 1px solid black;
        outline: none;
        padding: 20px;
    `
}

export default S;