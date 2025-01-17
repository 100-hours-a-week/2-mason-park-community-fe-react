import S from './CommentForm.styled'
import {error} from "../../utils/utils";
import {useAtom} from "jotai";
import {changeAtom, commentAtom} from "../../store/atoms";
import {createCommentRequest, updateCommentRequest} from "../../api/comment";
import {useParams} from "react-router-dom";
import CommonButton from "../Button/CommonButton";
import {useEffect, useRef} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import HelperMessage from "../common/HelperMessage";

const CommentForm = ({setPost}) => {
    const params = useParams();
    const inputRef = useRef(null);
    const [comment, setComment] = useAtom(commentAtom);
    const [isChange, setIsChange] = useAtom(changeAtom);

    const formik = useFormik({
        initialValues: {
            content: "",
        },
        validationSchema: Yup.object({
            content: Yup.string()
                .required(error.CONTENT_BLANK)
                .max(500, error.COMMENT_CONTENT_EXCEED_MAX_LEN)
                .test(
                    'not-whitespace-only',
                    error.NOT_WHITE_SPACE_ONLY,
                    (value) => {
                        if (!value) return false; // value가 비어있으면 에러
                        return value.trim().length > 0; // 공백 제거 후 길이가 0보다 커야 함
                    }
                )
        }),
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
                formik.values.content = '';
                setComment(prev => ({comment_id: '', content: ''}))
                setIsChange(prev => true);
            } catch (e) {
                console.error(`${e.response.data.error} : ${e.response.data.message}`);
            }
        }
    });

    // 수정 버튼 눌렀을 때 입력 폼
    useEffect(() => {
        inputRef.current.value = comment.content;
        formik.values.content = comment.content;
        inputRef.current.scrollIntoView({
            block: 'center',
            inline: 'center'
        });
    }, [comment]);

    return (
        <S.Wrapper>
            <S.CommentWrapper>
                <S.Textarea
                    placeholder={'댓글을 남겨주세요!'}
                    name={"content"}
                    value={formik.values.content}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    maxLength={500}
                    ref={inputRef}
                />
            </S.CommentWrapper>
            <S.Box>
                <HelperMessage touched={formik.touched.content} error={formik.errors.content}></HelperMessage>
                <S.TextCount>({formik.values.content.length} / 500)</S.TextCount>
            </S.Box>
            <CommonButton title={comment.comment_id ? "댓글 수정" : "댓글 등록"}
                          disabled={!formik.isValid}
                          handler={formik.handleSubmit}/>
        </S.Wrapper>
    )
}

export default CommentForm;