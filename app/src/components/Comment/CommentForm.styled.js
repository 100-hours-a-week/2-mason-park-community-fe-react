import styled from "styled-components";

const S = {
    Wrapper: styled.div`
        width: calc(100% - 20px);
        
        display: flex;
        flex-direction: column;
        align-items: center;
        
        border-radius: 16px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    `,
    TextCount: styled.div`
       margin-left: auto;
    `,
    CommentWrapper: styled.div`
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
    `,
    Box: styled.div`
        min-height: 20px;
        margin: 5px;
        width: 100%;
        display: flex;
        justify-content: space-between;
    `
}

export default S;