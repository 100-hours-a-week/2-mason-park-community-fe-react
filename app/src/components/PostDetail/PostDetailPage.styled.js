import styled from "styled-components";

const S = {
    Wrapper: styled.div`
        width: 600px;
        padding: 10px 0;
        
        display: flex;
        flex-direction: column;
        align-items: center;

        background-color: #212121;
        border-radius: 12px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    `,
    CommentContainer: styled.div`
        width: 100%;
        
        display: flex;
        flex-direction: column;
        align-items: center;
        
        background-color: #121212;
        
        margin: 10px;
    `
}

export default S;