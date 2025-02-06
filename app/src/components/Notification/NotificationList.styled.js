import styled from "styled-components";
import {MdKeyboardDoubleArrowLeft} from "react-icons/md";

const S = {
    EmptyBox: styled.div`
        width: 100%;
        height: 60px;
        line-height: 60px;

        font-weight: 400;
        font-size: 12px;
        text-align: center;
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
    `,
    NotificationWrapper: styled.div`
        position: fixed;
        left: 0; /* 우측 정렬 */
        top: 50%; /* 화면 중앙 정렬 */
        transform: translateY(-50%); /* 정확한 중앙 정렬 */
        
        width: 450px;
        height: 640px;
        
        display: flex;
        flex-direction: column;
        
        padding: 10px 20px;
        
        border-top-right-radius: 24px;
        border-bottom-right-radius: 24px;

        box-shadow: 0 5px 15px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.05);
        background-color: #212121;
        
        border-right: 1px solid #4cd964;
        border-top: 1px solid #4cd964;
        border-bottom: 1px solid #4cd964;
    `,
    DoubleArrowLeftWrapper: styled.div`
        width: 100%;
        
        display: flex;
        justify-content: end;
        
        padding: 5px 0;

        :hover {
            color: #4cd964;
        }
    `,

    DoubleArrowLeft: styled(MdKeyboardDoubleArrowLeft)`
        width: 25px;
        height: 25px;
        
        cursor: pointer;
    `,
    NotificationTitle: styled.div`
        padding: 5px 0;
        border-bottom: 1px solid #4cd964;
        
        font-size: 24px;
        font-weight: 700;
    `,
    NotificationContainer: styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        
        min-height: 180px;
        
        overflow-y: scroll;
    `
}

export default S;