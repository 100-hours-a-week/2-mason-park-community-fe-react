import styled from "styled-components";

const S = {
    Wrapper: styled.div`
        position: fixed;
        display: flex;
        justify-content: center;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 999;
    `,
    Box: styled.div`
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        
        width: 400px;
        height: 240px;
        padding: 30px;

        background-color: #212121;
        border-radius: 12px;

        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;

        z-index: 1000;
    `,
    Title: styled.p`
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        text-align: center;
    `,
    Content: styled.p`
        font-weight: 400;
        font-size: 20px;
        line-height: 24px;
    `,
    ButtonWrapper: styled.div`
        width: 290px;
        
        display: flex;
        justify-content: space-evenly;
    `,
    CancelButton: styled.div`
        width: 130px;
        height: 45px;
        
        border-radius: 12px;
        background-color: #1ED760;
        color: black;
        
        font-size: 20px;
        text-align: center;
        line-height: 45px;
        
        cursor: pointer;
    `,
    ConfirmButton: styled.div`
        width: 130px;
        height: 45px;

        border-radius: 12px;
        background-color: #1ED760;
        color: black;

        font-size: 20px;
        text-align: center;
        line-height: 45px;

        cursor: pointer;
    `
}

export default S;