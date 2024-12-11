import S from './PostEditPage.styled';
import PostForm from "./PostForm";
import {useEffect} from "react";
import {headerAtom} from "../../store/atoms";
import {useAtom} from "jotai";

const PostEditPage = () => {
    const [_, setHeader] = useAtom(headerAtom);
    useEffect(() => {
        setHeader({
            back: 2,
            profile: true
        })
    }, [])
    return (
        <S.Wrapper>
            <S.Title>
                게시글 작성
            </S.Title>

            <PostForm/>
        </S.Wrapper>
    );
}

export default PostEditPage;