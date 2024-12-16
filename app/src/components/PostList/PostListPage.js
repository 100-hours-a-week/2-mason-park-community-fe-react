import S from './PostListPage.styled';
import CommonButton from "../Button/CommonButton";
import {useSetAtom} from "jotai/index";
import {headerAtom} from "../../store/atoms";
import {useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getPostsRequest} from "../../api/post";
import PostItem from "./PostItem";

const PostListPage = () => {
    const LIMIT = 5;
    const navigate = useNavigate();
    const setHeader = useSetAtom(headerAtom);
    const [posts, setPosts] = useState([]);
    const [offset, setOffset] = useState(0);
    const [isFetching, setIsFetching] = useState(false);
    const [hasNextPage, setHasNextPage] = useState(true);

    // 게시글 데이터 조회
    const fetchData = useCallback(async () => {
        try {
            const res = await getPostsRequest(offset, LIMIT);

            const newPosts = res.data;

            setPosts(posts.concat(newPosts.data));
            setOffset((prev) => prev + 5);
            setHasNextPage(() => newPosts.offset + LIMIT < newPosts.total);
            setIsFetching(false);
        } catch (e) {
            console.error(`${e.response.data.error} : ${e.response.data.message}`);
        }
    }, [offset]);

    // Scroll Event
    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop, offsetHeight } = document.documentElement;
            if (window.innerHeight + scrollTop >= offsetHeight) {
                setIsFetching(true);
            }
        }
        // 초기화 게시글 가져오기
        setIsFetching(true);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [])

    useEffect(() => {
        if (isFetching && hasNextPage) fetchData();
        else if (!hasNextPage) setIsFetching(false);
    }, [isFetching]);

    useEffect(() => {
        setHeader({
            back: 0,
            profile: true
        })
    }, [])
    return (
        <S.Wrapper>
            <S.Title>
                어서오세요, <br/>
                민수네 커뮤니티 입니다.
            </S.Title>
            <CommonButton title={"게시글 작성"} handler={() => navigate('/posts/write')}/>
            <S.PostContainer>
                {posts && posts.map(post => (
                    <PostItem key={post.post_id} {...post} />
                ))}
            </S.PostContainer>
        </S.Wrapper>
    );
}

export default PostListPage;