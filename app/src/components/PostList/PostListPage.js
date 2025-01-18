import S from './PostListPage.styled';
import CommonButton from "../Button/CommonButton";
import {useSetAtom} from "jotai/index";
import {headerAtom} from "../../store/atoms";
import {useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getPostsRequest} from "../../api/post";
import PostItem from "./PostItem";
import {throttle} from "lodash";
import Spinner from "../../assets/spinner.gif";

const PostListPage = () => {
    const LIMIT = 5;
    const navigate = useNavigate();
    const setHeader = useSetAtom(headerAtom);
    const [posts, setPosts] = useState([]);
    const [offset, setOffset] = useState(0);
    const [isFetching, setIsFetching] = useState(false);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [isInit, setIsInit] = useState(true);
    // 게시글 데이터 조회
    const fetchData = useCallback(async () => {
        try {
            // 첫 조회는 즉시 조회
            setIsInit(false);

            const res = await getPostsRequest(offset, LIMIT);

            const newPosts = res.data;

            // 기존 게시글 + 새 게시글
            setPosts(posts.concat(newPosts.data));
            // 다음 오프셋
            setOffset((prev) => prev + LIMIT);
            // 불러올 데이터가 있는지 확인
            setHasNextPage(() => newPosts.offset + LIMIT < newPosts.total);
            // 데이터 조회 끝
            setIsFetching(false);
        } catch (e) {
            console.error(`${e.response.data.error} : ${e.response.data.message}`);
        }
    }, [offset]);

    // Scroll Event
    useEffect(() => {
        // 일정 주기 마다 최대 한 번씩 실행
        const handleScrollWithThrottle = throttle(() => {
            const { scrollTop, offsetHeight } = document.documentElement;

            // 스크롤이 바닥에 도달했는지 확인
            if (window.innerHeight + scrollTop >= offsetHeight) {
                setIsFetching(true);
            }
        }, 300);
        // 초기화 게시글 가져오기
        setIsFetching(true);

        window.addEventListener("scroll", handleScrollWithThrottle);
        return () => window.removeEventListener("scroll", handleScrollWithThrottle);
    }, [])

    useEffect(() => {
        let timer;
        if (isInit && isFetching && hasNextPage) {
            fetchData();
        } else if (isFetching && hasNextPage) {
            timer = setTimeout(() => {
                fetchData();
            }, 500)
        } else if (!hasNextPage) {
            setIsFetching(false);
        }

        return () => clearTimeout(timer);
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
            {isFetching && <img src={Spinner} alt="로딩중" width="5%"/>}
        </S.Wrapper>
    );
}

export default PostListPage;