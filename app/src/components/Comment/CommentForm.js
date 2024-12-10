import S from './CommentForm.styled'
import {error} from "../../utils/utils";
import useForm from "../../hooks/useForm";
import {useAtom} from "jotai";
import {changeAtom, commentAtom, commonErrorAtom as errorAtom} from "../../store/atoms";
import {createCommentRequest, updateCommentRequest} from "../../api/comment";
import {useParams} from "react-router-dom";
import CommentInput from "../Input/CommentInput";
import CommonButton from "../Button/CommonButton";
import {useEffect, useRef} from "react";

const CommentForm = () => {
    const params = useParams();
    const inputRef = useRef(null);
    const [errors, setErrors] = useAtom(errorAtom);
    const [comment, setComment] = useAtom(commentAtom);
    const [isChange, setIsChange] = useAtom(changeAtom);

    const { values, disabled, handleChange, handleBlur, handleSubmit } = useForm({
        initialValues: {
            content: "",
        },
        validate: values => {

            // 내용 유효성 검사 : 입력
            if (!values.content) {
                setErrors((prev) => {
                    return {...prev, error: error.COMMENT_CONTENT_BLANK}
                });
            } else {
                setErrors((prev) => {
                    return {...prev, error: error.BLANK}
                });
            }
            return [values, errors];
        },
        onSubmit: async values => {
            try {
                if (comment.comment_id) {
                    const res = await updateCommentRequest(params.post_id, comment.comment_id, values);
                    if (res.status !== 200) return;
                } else {
                    const res = await createCommentRequest(params.post_id,values);
                    if (res.status !== 201) return;
                }

                // 입력값 초기화
                inputRef.current.value = '';
                setComment(prev => ({ ...prev, comment_id: '', content: '' }));
                setIsChange(prev => true);
            } catch (e) {
                console.error(`${e.response.data.error} : ${e.response.data.message}`);
                setErrors((prev) => {
                    return {...prev, error: e.response.data.message }
                });
            }
        }
    })

    // 수정 버튼 눌렀을 때 입력 폼
    useEffect(() => {
        inputRef.current.value = comment.content;
        inputRef.current.scrollIntoView({
            block: 'center',
            inline: 'center'
        });
    }, [comment.content]);

    return (
        <S.Wrapper>
            <CommentInput
                name={"content"}
                onChange={handleChange}
                onBlur={handleBlur}
                ref={inputRef}
            />
            <CommonButton title={comment.comment_id ? "댓글 수정" : "댓글 등록"} disabled={disabled} handler={handleSubmit}/>
        </S.Wrapper>
    )
}

export default CommentForm;