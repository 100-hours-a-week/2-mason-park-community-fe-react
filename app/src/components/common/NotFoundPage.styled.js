import styled from "styled-components";

const S = {
    Wrapper: styled.div`
        width: 600px;
        min-height: calc(100vh - 104px);
        padding-top: 100px;
        
        display: flex;
        flex-direction: column;
        align-items: center;

        background-color: #212121;
        border-radius: 12px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    `,
    Error: styled.div`
        font-size: 64px;
        font-weight: bold;
        color: #1ED760;
    `,
}

export default S;