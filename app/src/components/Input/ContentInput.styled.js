import styled from "styled-components";

const S = {
    Wrapper: styled.div`
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-bottom: 5px;
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
        border-radius: 12px;
        border: 1px solid #B3B3B3;
        outline: none;
        padding: 20px;
    `
}

export default S;