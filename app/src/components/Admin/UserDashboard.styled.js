import styled from "styled-components";

const S = {
    Wrapper: styled.div`
        width: 90%;
        height: 400px;
        
        border-radius: 12px;
        background-color: #212121;
        
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-items: center;
        
        margin: 10px;
        padding: 20px;
    `,
    Title: styled.div`
        width: 100%;
        border-top-left-radius: 12px;
        border-top-right-radius: 12px;
        
        text-align: left;
        font-size: 32px;
        font-weight: 700;
        
        background-color: #1ED760;
        padding: 0 10px;
    `,
    Container: styled.div`
        width: 100%;
        
        display: flex;
        flex-direction: column;
        align-items: center;
        
        overflow-y: scroll;
    `
}

export default S;