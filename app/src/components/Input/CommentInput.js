import S from './CommentInput.styled'
import {forwardRef} from "react";

const ContentInput = forwardRef (({name, value, onChange, onBlur}, ref) => {

    return (
        <S.Wrapper>
            <S.Textarea
                name={name}
                placeholder={'댓글을 남겨주세요!'}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                ref={ref}
            />
        </S.Wrapper>
    )
})

export default ContentInput;
