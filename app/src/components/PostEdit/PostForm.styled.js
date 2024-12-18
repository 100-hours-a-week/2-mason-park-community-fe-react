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
    `
}

export default S;