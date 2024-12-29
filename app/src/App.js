import './App.css';
import GlobalStyles from "./styles/GlobalStyles";
import {Route, Routes} from "react-router-dom";
import MainLayout from "./components/Main/MainLayout";
import LoginPage from "./components/Login/LoginPage";
import RegisterPage from "./components/Register/RegisterPage";
import PostListPage from "./components/PostList/PostListPage";
import PostEditPage from "./components/PostEdit/PostEditPage";
import UserSettingPage from "./components/User/UserSettingPage";
import UserSettingForm from "./components/User/UserSettingForm";
import UserPasswordForm from "./components/User/UserPasswordForm";
import Modal from "./components/Modal/Modal";
import useModal from "./hooks/useModal";
import PostDetailPage from "./components/PostDetail/PostDetailPage";
import PostModifyPage from "./components/PostEdit/PostModifyPage";
import AuthRoute from "./routes/AuthRoute";
import React from "react";

function App() {
    const {modal} = useModal();
    return (
        <>
          <GlobalStyles />
            {modal.isOpen && <Modal/>}
          <Routes>
            <Route path={"/"} element={<MainLayout />}>

                {/* 로그인 페이지 */}
                <Route path={"login"} element={<LoginPage />} />

                {/* 회원가입 페이지 */}
                <Route path={"register"} element={<RegisterPage />} />


                <Route path={"users"} element={<UserSettingPage />}>
                    {/* 회원정보수정 페이지 */}
                    <Route path={"setting"} element={
                        <AuthRoute redirectUrl={'/login'}>
                            <UserSettingForm/>
                        </AuthRoute>
                    } />
                    <Route path={"password"} element={
                        <AuthRoute redirectUrl={'/login'}>
                            <UserPasswordForm/>
                        </AuthRoute>
                    } />
                </Route>

                {/* 게시글 목록 페이지 */}
                <Route path={""} element={<PostListPage />}/>

                {/* 게시글 상세 페이지 */}
                <Route path={"posts/:post_id"} element={<PostDetailPage />}/>

                {/* 게시글 작성 페이지 */}
                <Route path={"posts/write"} element={
                    <AuthRoute redirectUrl={'/login'}>
                        <PostEditPage />
                    </AuthRoute>
                }/>

                {/* 게시글 수정 페이지 */}
                <Route path={"posts/:post_id/modify"} element={
                    <AuthRoute redirectUrl={'/login'}>
                        <PostModifyPage />
                    </AuthRoute>
                }/>
            </Route>
          </Routes>
        </>
  );
}

export default App;
