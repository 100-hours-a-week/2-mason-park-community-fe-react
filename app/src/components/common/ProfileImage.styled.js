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
        
        cursor: pointer;
    `,

    Image: styled.img`
        width: 80%;
        height: 80%;
        
        object-fit: contain;
    `,
    
    NoImage: styled(FaUser)`
        width: 70%;
        height: 70%;
    `
}

export default S;