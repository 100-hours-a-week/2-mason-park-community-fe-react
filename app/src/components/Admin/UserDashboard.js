import S from './UserDashboard.styled.js'
import {useCallback, useEffect, useRef, useState} from "react";
import {throttle} from "lodash";
import {adminGetUsersRequest} from "../../api/admin";
import UserItem from "./UserItem";

const UserDashboard = () => {
    const LIMIT = 5;
    const scrollRef = useRef(null);

    const [users, setUsers] = useState([]);
    const [offset, setOffset] = useState(0);
    const [isFetching, setIsFetching] = useState(false);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [isInit, setIsInit] = useState(true);

    // 유저 목록 데이터 조회
    const fetchData = useCallback(async () => {
        try {
            // 첫 조회는 즉시 조회
            setIsInit(false);

            const res = await adminGetUsersRequest(offset, LIMIT);

            const newUsers = res.data;

            // 기존 게시글 + 새 게시글
            setUsers(users.concat(newUsers.data));
            // 다음 오프셋
            setOffset((prev) => prev + LIMIT);
            // 불러올 데이터가 있는지 확인
            setHasNextPage(() => newUsers.offset + LIMIT < newUsers.total);
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
            if (!scrollRef.current) return;

            const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
            // 스크롤이 바닥에 도달했는지 확인
            if (scrollTop + clientHeight >= scrollHeight) {
                setIsFetching(true);
            }
        }, 300);
        // 초기화 게시글 가져오기
        setIsFetching(true);

        const scrollElement = scrollRef.current;

        if (scrollElement) {
            scrollElement.addEventListener('scroll', handleScrollWithThrottle);
        }

        return () => {
            if (scrollElement) {
                scrollElement.removeEventListener('scroll', handleScrollWithThrottle);
            }
        };
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

    return (
        <S.Wrapper>
            <S.Title>
                유저 목록
            </S.Title>
            <S.Container ref={scrollRef}>
                {users && users.map(user => (
                    <UserItem key={user.user_id} {...user} setUsers={setUsers}/>
                ))}
            </S.Container>
        </S.Wrapper>
    )
}

export default UserDashboard;