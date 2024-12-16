import styled from "styled-components";
import {FaUser} from "react-icons/fa";

const S = {
    Wrapper: styled.div`
        width: 35px;
        height: 35px;
        
        border: 1px solid black;
        border-radius: 50%;
        
        display: flex;
        justify-content: center;
        align-items: center;
        
        overflow: hidden;
        cursor: pointer;
    `,

    Image: styled.img`
        width: 100%;
        height: 100%;
        
        object-fit: cover;
    `,
    
    NoImage: styled(FaUser)`
        width: 100%;
        height: 100%;
    `
}

export default S;