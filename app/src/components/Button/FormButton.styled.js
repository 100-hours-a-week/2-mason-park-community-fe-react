import styled from "styled-components";

const S = {
    Button: styled.div`
        width: 350px;
        height: 30px;
        line-height: 30px;
        margin: 10px 0;
        
        border-radius: 4px;
        background-color: ${(props) => props.disabled ? '#1ED760' : '#3BE477'};
        color: #121212;
        
        font-size: 14px;
        font-weight: 700;
        text-align: center;
        
        cursor: ${(props) => props.disabled ? 'default' : 'pointer'};
    `
}

export default S;