import styled from "styled-components";
import {FaRegTrashCan} from "react-icons/fa6";

const S = {
    Wrapper: styled.div`
        width: 100%;
        height: 70px;

        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #212121;
        border-radius: 16px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.05);

        margin: 10px 0;
        padding: 10px 20px;
    `,
    UserContainer: styled.div`
        display: flex;
        align-items: center;
    `,
    Title: styled.h2`
        font-weight: 700;
        font-size: 20px;
    `,
    No: styled.span`
        margin: 0 10px;
        font-size: 14px;
    `,
    Nickname: styled.span`
        min-width: 150px;
        margin-left: 10px;
        font-size: 14px;
    `,
    Text: styled.span`
        min-width: 200px;
        margin-left: 10px;
        font-size: 14px;
    `,
    ControlBox: styled.div`
        
    `,
    TrashCan: styled(FaRegTrashCan)`
        cursor: pointer;
        color: #4cd964;
        
        width: 25px;
        height: 25px;
    `
}

export default S;