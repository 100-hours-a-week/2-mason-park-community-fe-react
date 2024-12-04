import styled from "styled-components";
import {IoIosArrowBack} from "react-icons/io";

const S = {
    Wrapper: styled.div`
        position: absolute;
        top: 100%;
        left: -100%;
        
        width: 115px;
        min-height: 35px;
        
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        background: white;
        box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 15px;
        z-index: 100;
    `,
    Box: styled.div`
        width: 100%;
        height: 35px;
        line-height: 35px;
        
        font-weight: 400;
        font-size: 12px;
        text-align: center;
        cursor: pointer;

        &:hover {
            background-color: #D9D9D9;
        }

        &:first-child:hover {
            border-top-left-radius: 15px;
            border-top-right-radius: 15px;
        }

        &:last-child:hover {
            border-bottom-left-radius: 15px;
            border-bottom-right-radius: 15px;
        }
    `
}

export default S;