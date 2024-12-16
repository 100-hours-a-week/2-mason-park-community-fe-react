import styled from "styled-components";

const S = {
    Button: styled.div`
        width: 50px;
        height: 30px;
        line-height: 30px;
        margin: 5px;
        
        border-radius: 8px;
        background-color: #1ED760;
        color: black;
        
        font-size: 12px;
        font-weight: 700;
        text-align: center;
        
        align-self: flex-end;
        
        cursor: pointer;
        
        &:hover {
            background-color: #3BE477;
        }
    `
}

export default S;