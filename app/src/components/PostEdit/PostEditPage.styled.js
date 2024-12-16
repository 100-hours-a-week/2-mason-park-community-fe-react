import styled from "styled-components";

const S = {
    Wrapper: styled.div`
        width: 600px;
        min-height: calc(100vh - 104px);
        padding-top: 50px;
        
        display: flex;
        flex-direction: column;

        background-color: #212121;
        border-radius: 12px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    `,
    Title: styled.h2`
        margin-bottom: 20px;
        font-weight: 400;
        font-size: 24px;
        text-align: center;
        line-height: 31px;
    `
}

export default S;