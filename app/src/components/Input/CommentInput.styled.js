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
        width: 100%;
        height: 120px;
        resize: none;
        
        border-radius: 8px;
        
        outline: none;
        padding: 20px;
        
        font-size: 15px;
        font-weight: 400;
        line-height: 21px;
    `
}

export default S;