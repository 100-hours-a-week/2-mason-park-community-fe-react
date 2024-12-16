import styled from "styled-components";

const S = {
    Button: styled.div`
        width: 140px;
        height: 40px;
        line-height: 40px;
        margin: 10px;
        
        border-radius: 16px;
        background-color: ${(props) => props.disabled ? '#1ED760' : '#3BE477'};
        color: black;
        
        font-size: 14px;
        font-weight: 700;
        text-align: center;
        
        align-self: flex-end;
        cursor: ${(props) => props.disabled ? 'default' : 'pointer'};
    `
}

export default S;