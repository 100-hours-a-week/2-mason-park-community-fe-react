import S from './CommentForm.styled'
import {error} from "../../utils/utils";
import useForm from "../../hooks/useForm";
import {useAtom} from "jotai";
import {commonErrorAtom as errorAtom} from "../../store/atoms";
import {createCommentRequest} from "../../api/comment";
import {useParams} from "react-router-dom";
import CommentInput from "../Input/CommentInput";
import CommonButton from "../Button/CommonButton";
import {useRef} from "react";

const CommentForm = () => {
    const params = useParams();
    const inputRef = useRef(null);
    const [errors, setErrors] = useAtom(errorAtom);

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
                const res = await createCommentRequest(params.post_id,values);
                console.log(res);
                if (res.status !== 201) return;
                // 입력값 초기화
                inputRef.current.value = '';
            } catch (e) {
                console.error(`${e.response.data.error} : ${e.response.data.message}`);
                setErrors((prev) => {
                    return {...prev, error: e.response.data.message }
                });
            }
        }
    })

    return (
        <S.Wrapper>
            <CommentInput
                name={"content"}
                value={values.content}
                onChange={handleChange}
                onBlur={handleBlur}
                ref={inputRef}
            />
            <CommonButton title={"댓글 등록"} disabled={disabled} handler={handleSubmit}/>
        </S.Wrapper>
    )
}

export default CommentForm;