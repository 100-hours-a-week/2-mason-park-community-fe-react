import {createGlobalStyle} from "styled-components";

const GlobalStyles = createGlobalStyle`
    @font-face {
        font-family: 'GmarketSansMedium';
        src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff') format('woff');
        font-weight: normal;
        font-style: normal;
    }

    *, *::before, *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    
    html {
        font-size: 62.5%; /* 1rem을 10px로 변환 */
    }

    body {
        font-family: 'GmarketSansMedium', 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif;
        min-width: 320px;
        color: white;
        background-color: #121212;
    }
    
    button {
        background: none;
        color: inherit;
        border: none;
        cursor: pointer;
        outline: inherit;
    }
    
    a {
        color: inherit;
        text-decoration: none;
    }
    
    li {
        list-style: none;
    }
    
    input, textarea {
        border: 1px solid #B3B3B3;
        background-color: #535353;
        color: white;
    }
    
    input:focus {
        outline: none;
        border: 2px solid white;
    }
    
    
    span {
        white-space: pre-line;
    }
    
`;

export default GlobalStyles;
