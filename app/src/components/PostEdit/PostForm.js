import S from './PostForm.styled'
import FormButton from "../Button/FormButton";
import {useNavigate} from "react-router-dom";
import {error} from "../../utils/utils";
import HelperMessage from "../common/HelperMessage";
import FileInput from "../Input/FileInput";
import {useState} from "react";
import {createPostRequest, updatePostRequest} from "../../api/post";
import {createPreSignedUrl, uploadImageToS3} from "../../api/common";
import {useFormik} from "formik";
import * as Yup from "yup";

const PostForm = ({post_id, title, content}) => {
    const navigate = useNavigate();
    const [image, setImage] = useState(null);

    const handleImage = (e, setFilename) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB
        if (file.size > MAX_FILE_SIZE) {
            alert('이미지 파일 크기가 1MB를 초과합니다. 다른 파일을 선택해주세요.');
            return; // 파일 처리를 중단
        }

        setFilename(file.name);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async (e) => {
            try {
                const res = await createPreSignedUrl({
                    filename: file.name,
                    path: process.env.REACT_APP_S3_POST
                });

                if (res.status !== 201) return;

                const result = await uploadImageToS3(res.data.data.preSignedUrl, file);
                setImage(`${process.env.REACT_APP_CDN_URL}${res.data.data.key}`);
            } catch (e) {
                console.error(`${e.response.data.error} : ${e.response.data.message}`);
            }
        }
    }

    const uploadCancel = (e, setFilename) => {
        setFilename(prev => '');
        setImage(prev => '');
    }

    const formik = useFormik({
        initialValues: {
            title: title ? title: '',
            content: content ? content : ''
        },
        validationSchema: Yup.object({
            title: Yup.string()
                .required(error.TITLE_CONTENT_BLANK)
                .max(26, error.TITLE_EXCEED_MAX_LEN)
                .test(
                    'not-whitespace-only',
                    error.NOT_WHITE_SPACE_ONLY,
                    (value) => {
                        if (!value) return false; // value가 비어있으면 에러
                        return value.trim().length > 0; // 공백 제거 후 길이가 0보다 커야 함
                    }
                ),
            content: Yup.string()
                .required(error.CONTENT_BLANK)
                .max(1500, error.CONTENT_EXCEED_MAX_LEN)
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

                // 이미지가 존재할 경우 포함
                const data = {
                    ...values,
                    post_image: image
                };

                if (post_id) {
                    const res = await updatePostRequest(post_id, data);
                    if (res.status !== 200) return;

                    // 성공 시 상세 페이지로 이동
                    navigate(`/posts/${post_id}`)
                } else {
                    const res = await createPostRequest(data);
                    if (res.status !== 201) return;

                    // 성공 시 상세 페이지로 이동
                    navigate(`/posts/${res.data.data.post_id}`)
                }
            } catch (e) {
                console.error(`${e.response.data.error} : ${e.response.data.message}`);
            }
        }
    })

    return (
        <S.Wrapper>
            <S.TextInputWrapper>
                <S.TitleWrapper>
                    <S.TitleLabel>{"제목"}</S.TitleLabel>
                    <S.TitleInput
                        name={"title"}
                        placeholder={"제목을 입력해주세요."}
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        maxLength={26}
                    />
                </S.TitleWrapper>
                <S.TextCount>({formik.values.title.length} / 26)</S.TextCount>
            </S.TextInputWrapper>

            <S.TextAreaWrapper>
                <S.ContentWrapper>
                    <S.ContentLabel>{"내용"}</S.ContentLabel>
                    <S.ContentTextarea
                        name={"content"}
                        placeholder={"내용을 입력해주세요."}
                        value={formik.values.content}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        maxLength={1500}
                    />
                </S.ContentWrapper>
                <S.TextCount>({formik.values.content.length} / 1500)</S.TextCount>
                <HelperMessage touched={formik.touched.title || formik.touched.content}
                               error={formik.errors.title || formik.errors.content} />
            </S.TextAreaWrapper>
            <S.FileInputWrapper>
                <FileInput
                    title={"이미지"}
                    name={"postImage"}
                    onChange={handleImage}
                    uploadCancel={uploadCancel}
                />
            </S.FileInputWrapper>
            <FormButton title={post_id ? "수정하기" : "완료"}
                        disabled={!formik.isValid}
                        onClick={formik.handleSubmit}/>
        </S.Wrapper>
    )
}

export default PostForm;