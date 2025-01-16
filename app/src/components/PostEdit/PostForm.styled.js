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
    TextInputWrapper: styled.div`
        width: 360px;
        min-height: 90px;
        display: flex;
        flex-direction: column;
    `,
    TextCount: styled.div`
        text-align: right;
    `,
    TextAreaWrapper: styled.div`
        width: 360px;
        min-height: 340px;
        display: flex;
        flex-direction: column;
    `,
    FileInputWrapper: styled.div`
        width: 360px;
        min-height: 50px;
        display: flex;
        flex-direction: column;
        margin: 5px 0;
    `,
    TitleWrapper: styled.div`
        width: 100%;
        display: flex;
        flex-direction: column;
        margin: 20px 0;
    `,
    TitleLabel: styled.label`
        font-weight: 700;
        font-size: 15px;
        line-height: 18px;
        
        margin-bottom: 4px;
    `,
    TitleInput: styled.input`
        height: 65px;
        font-size: 16px;
        font-weight: 700;
        border-radius: 12px;
        border: 1px solid #B3B3B3;
        padding: 0 20px;
    `,
    ContentWrapper: styled.div`
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-bottom: 5px;
    `,
    ContentLabel: styled.label`
        font-weight: 700;
        font-size: 15px;
        line-height: 18px;
        
        margin-bottom: 4px;
    `,
    ContentTextarea: styled.textarea`
        height: 300px;
        resize: none;
        border-radius: 12px;
        border: 1px solid #B3B3B3;
        outline: none;
        padding: 20px;
    `
}

export default S;