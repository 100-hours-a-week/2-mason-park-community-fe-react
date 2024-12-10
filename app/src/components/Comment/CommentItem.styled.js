import styled from "styled-components";

const S = {
    Wrapper: styled.div`
        width: 550px;
        min-height: 75px;
        
        display: flex;
        flex-direction: column;
        
        padding: 10px;
        margin: 10px 0;
        border-radius: 8px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
        
    `,
    MetaContainer: styled.div`
        display: flex;
        align-items: center;
        margin: 10px 0;
    `,
    MetaTime: styled.span`
        font-size: 14px;
        margin-left : 15px;
    `,
    MetaButtonContainer: styled.div`
        display: flex;
        align-items: center;
        margin-left: auto;
    `,
    Content: styled.span`
        font-weight: 400;
        font-size: 15px;
        line-height: 21px;
    `
}

export default S;