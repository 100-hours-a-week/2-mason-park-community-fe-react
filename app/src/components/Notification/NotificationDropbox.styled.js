import styled from "styled-components";
import {IoIosArrowBack, IoIosNotifications} from "react-icons/io";
import {FaRegTrashCan} from "react-icons/fa6";

const S = {
    Wrapper: styled.div`
        position: absolute;
        top: 100%;
        left: -600%;
        
        width: 450px;
        min-height: 45px;
        
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        background: #212121;
        box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 15px;
        z-index: 100;
    `,
    Box: styled.div`
        width: 100%;
        height: 60px;
        line-height: 60px;
        
        font-weight: 400;
        font-size: 12px;
        text-align: center;
        cursor: pointer;
        &:hover {
            background-color: #121212;
            color: #1ED760;
        }

        &:first-child:hover {
            border-top-left-radius: 15px;
            border-top-right-radius: 15px;
        }

        &:last-child:hover {
            border-bottom-left-radius: 15px;
            border-bottom-right-radius: 15px;
        }
    `,
    Notification: styled(IoIosNotifications)`
        width: 35px;
        height: 35px;
        
        text-align: center;
        cursor: pointer;
    `,
    New: styled.div`
        position: absolute;
        width: 10px;
        height: 10px;
        background-color: #4cd964;
        border-radius: 50%;
        
        top: 55%;
        left: 60%;
    `
}

export default S;