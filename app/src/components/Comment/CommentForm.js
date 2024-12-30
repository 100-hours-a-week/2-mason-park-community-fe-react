import S from './CommentForm.styled'
import {error, validator} from "../../utils/utils";
import useForm from "../../hooks/useForm";
import {useAtom} from "jotai";
import {changeAtom, commentAtom, commonErrorAtom as errorAtom} from "../../store/atoms";
import {createCommentRequest, updateCommentRequest} from "../../api/comment";
import {useParams} from "react-router-dom";
import CommentInput from "../Input/CommentInput";
import CommonButton from "../Button/CommonButton";
import {useEffect, useRef} from "react";

const CommentForm = ({setPost}) => {
    const params = useParams();
    const inputRef = useRef(null);
    const [errors, setErrors] = useAtom(errorAtom);
    const [comment, setComment] = useAtom(commentAtom);
    const [isChange, setIsChange] = useAtom(changeAtom);

    const { values, touched, disabled, handleChange, handleBlur, handleSubmit } = useForm({
        initialValues: {
            content: "",
        },
        validate: values => {

            // 내용 유효성 검사 : 입력
            if (!values.content) {
                setErrors((prev) => {
                    return {...prev, error: error.CONTENT_BLANK}
                });
            } else if (validator.whiteSpace(values.content)) {
                setErrors((prev) => {
                    return {...prev, error: error.CONTENT_BLANK}
                })
            } else if (!validator.commentContent(values.content)) {
                inputRef.current.value = values.content.substring(0, 500);
                values.content = values.content.substring(0, 500);
                setErrors((prev) => {
                    return {...prev, error: error.COMMENT_CONTENT_EXCEED_MAX_LEN}
                })
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
                    setPost(prev => ({...prev, comment_count: prev.comment_count + 1}))
                }

                // 입력값 초기화
                values.content = '';
                setComment(prev => ({comment_id: '', content: ''}))
                setIsChange(prev => true);
                return values;
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
        values.content = comment.content;
        inputRef.current.scrollIntoView({
            block: 'center',
            inline: 'center'
        });
    }, [comment.content]);

    return (
        <S.Wrapper>
            <CommentInput
                name={"content"}
                value={values.content}
                onChange={handleChange}
                onBlur={handleBlur}
                ref={inputRef}
            />
            <S.TextCount>({values.content?.length} / 500)</S.TextCount>
            <CommonButton title={comment.comment_id ? "댓글 수정" : "댓글 등록"} disabled={disabled} handler={handleSubmit}/>
        </S.Wrapper>
    )
}

export default CommentForm;