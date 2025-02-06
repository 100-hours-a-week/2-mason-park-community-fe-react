import styled from "styled-components";
import {FaCheck} from "react-icons/fa";

const S = {
    Wrapper: styled.div`
        width: 100%;
        height: 100%;

        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 10px;
    `,
    Message: styled.div`
        width: 230px;
        word-break: normal;
        overflow-wrap: break-word;
        line-height: 20px;
        text-align: start;
    `,
    Time: styled.div`
        width: 70px;
        height: 100%;
    `,
    Check: styled(FaCheck)`
        cursor: pointer;
        color: #4cd964;
        
        width: 15px;
        height: 15px;
    `,
}

export default S;