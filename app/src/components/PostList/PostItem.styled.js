import styled from "styled-components";

const S = {
    Wrapper: styled.div`
        width: 590px;
        height: 170px;

        display: flex;
        flex-direction: column;
        justify-content: space-evenly;

        background-color: white;
        border-radius: 16px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.05);
        cursor: pointer;

        margin: 10px 0;
        padding: 10px 20px;
    `,
    Title: styled.h2`
        font-weight: 700;
        font-size: 20px;
    `,
    MetaContainer: styled.div`
        width: 100%;
        display: flex;
        border-bottom: 1px solid #D9D9D9;
    `,
    MetaItem: styled.span`
        margin-right: 10px;
        font-size: 14px;
    `,
    MetaTime: styled.span`
        margin-left: auto;
        font-size: 14px;
    `,
    ProfileContainer: styled.div`
        width: 100%;
        display: flex;
        align-items: center;
    `,
    ProfileNickname: styled.span`
        margin-left: 10px;
        font-size: 14px;
    `
}

export default S;