import styled from "styled-components";

const S = {
    Layout: styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        min-height: 100vh;
    `,
    HeaderWrapper: styled.div`
        height: 104px;

        display: flex;
        justify-content: center;
        align-items: center;
        
        background-color: #212121;
        border-radius: 12px;
        
        margin-bottom: 5px;
        
        position: relative;
    `
}

export default S;