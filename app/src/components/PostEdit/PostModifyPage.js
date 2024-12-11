import S from './PostEditPage.styled';
import PostForm from "./PostForm";
import usePost from "../../hooks/usePost";
import {useAtom} from "jotai/index";
import {headerAtom} from "../../store/atoms";
import {useEffect} from "react";

const PostModifyPage = () => {
    const {post, loading} = usePost();
    const [_, setHeader] = useAtom(headerAtom);
    useEffect(() => {
        setHeader({
            back: 1,
            profile: true
        })
    }, [])
    return (
        <S.Wrapper>
            <>
                <S.Title>
                    게시글 수정
                </S.Title>

                {!loading && <PostForm {...post}/>}
            </>
        </S.Wrapper>
    );
}

export default PostModifyPage;