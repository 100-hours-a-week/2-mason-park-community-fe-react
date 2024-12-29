import styled from "styled-components";

const S = {
    Wrapper: styled.div`
        position: absolute;
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        background: #ffffffb7;
        z-index: 999;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    `,
    Text: styled.div`
        text-align: center;
    `
}

export default S;