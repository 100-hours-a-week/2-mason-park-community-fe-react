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
    `
}

export default S;