import styled from "styled-components";

const S = {
    Wrapper: styled.div`
        width: 600px;
        min-height: calc(100vh - 104px);
        
        display: flex;
        flex-direction: column;
        align-items: center;

        background-color: white;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    `,
    CommentContainer: styled.div`
        width: 100%;
        
        display: flex;
        flex-direction: column;
        align-items: center;
        
        margin: 10px;
    `
}

export default S;