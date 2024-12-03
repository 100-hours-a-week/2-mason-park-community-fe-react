import S from './PostForm.styled'
import FormButton from "../Button/FormButton";
import {useNavigate} from "react-router-dom";
import {error, validator} from "../../utils/utils";
import useForm from "../../hooks/useForm";
import HelperMessage from "../common/HelperMessage";
import {useAtom} from "jotai";
import {commonErrorAtom as errorAtom} from "../../store/atoms";
import TitleInput from "../Input/TitleInput";
import ContentInput from "../Input/ContentInput";
import FileInput from "../Input/FileInput";
import {useState} from "react";
import {createPost} from "../../api/post";

const PostForm = ({post_id, title, content}) => {
    const navigate = useNavigate();

    const [errors, setErrors] = useAtom(errorAtom);
    const [image, setImage] = useState(null);

    const handleImage = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setImage(file);
    }

    const { values, touched, disabled, handleChange, handleBlur, handleSubmit } = useForm({
        initialValues: {
            title: "",
            content: "",
        },
        validate: values => {

            // 제목 유효성 검사 : 입력
            if (!values.title) {
                setErrors((prev) => {
                    return {...prev, error: error.TITLE_CONTENT_BLANK}
                });
            }
            // 제목 유효성 검사 : 길이
            else if (!validator.postTitle(values.title)) {
                values.title = values.title.substring(0, 26);
                setErrors((prev) => {
                    return {...prev, error: error.TITLE_EXCEED_MAX_LEN }
                });
            }
            // 제목 유효성 검사 : 통과
            else {
                setErrors((prev) => {
                    return {...prev, error: error.BLANK }
                });
            }

            if (!values.title || !validator.postTitle(values.title)) return [values, errors];

            // 내용 유효성 검사 : 입력
            if (!values.content) {
                setErrors((prev) => {
                    return {...prev, error: error.TITLE_CONTENT_BLANK }
                });
            }
            // 내용 유효성 검사 : 길이
            else if (!validator.postContent(values.content)) {
                values.content = values.content.substring(0, 1500);
                setErrors((prev) => {
                    return {...prev, error: error.PASSWORD_INVALID }
                });
            }
            // 내용 유효성 검사 : 통과
            else {
                setErrors((prev) => {
                    return {...prev, error: error.BLANK }
                });
            }

            return [values, errors];
        },
        onSubmit: async values => {
            try {
                const formData = new FormData();

                // 이미지가 존재할 경우 포함
                if (image) {
                    formData.append("post_image", image);
                }

                // 게시글 제목, 내용
                formData.append('data', new Blob([JSON.stringify(values)], {
                    type: 'application/json'
                }))

                const res = await createPost(formData);

                if (res.status !== 201) return;

                // 성공 시 상세 페이지로 이동
                navigate(`/posts/${res.data.data.post_id}`)
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
            <S.TextInputWrapper>
                <TitleInput
                    title={"제목"}
                    name={"title"}
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            </S.TextInputWrapper>
            <S.TextAreaWrapper>
                <ContentInput
                    title={"내용"}
                    name={"content"}
                    value={values.content}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <HelperMessage touched={touched.title || touched.content} error={errors.error} />
            </S.TextAreaWrapper>
            <S.FileInputWrapper>
                <FileInput
                    title={"이미지"}
                    name={"postImage"}
                    onChange={handleImage}
                />
            </S.FileInputWrapper>
            <FormButton title={"완료"} disabled={disabled} onClick={handleSubmit}/>
        </S.Wrapper>
    )
}

export default PostForm;