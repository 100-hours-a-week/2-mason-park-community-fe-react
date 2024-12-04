import styled from "styled-components";

const S = {
    Layout: styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        min-height: 100vh;
        background-color: #F4F5F7;
    `,
    HeaderWrapper: styled.div`
        width: 100%;
        height: 104px;

        display: flex;
        justify-content: center;
        align-items: center;

        border-bottom: 1px solid black;

        position: relative;
    `
}

export default S;