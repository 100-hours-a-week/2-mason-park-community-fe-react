import logo from './logo.svg';
import './App.css';
import GlobalStyles from "./styles/GlobalStyles";
import {Route, Routes} from "react-router-dom";
import MainLayout from "./components/Main/MainLayout";
import LoginPage from "./components/Login/LoginPage";
import RegisterPage from "./components/Register/RegisterPage";
import PostListPage from "./components/PostList/PostListPage";

function App() {
  return (
    <>
      <GlobalStyles />
      <Routes>
        <Route path={"/"} element={<MainLayout />}>

            {/* 로그인 페이지 */}
            <Route path={"/"} element={<LoginPage />} />
            <Route path={"/login"} element={<LoginPage />} />

            {/* 회원가입 페이지 */}
            <Route path={"/register"} element={<RegisterPage />} />

            {/* 게시글 목록 페이지 */}
            <Route path={"/posts"} element={<PostListPage />}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
