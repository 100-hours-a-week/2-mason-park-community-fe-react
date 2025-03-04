import {useCallback, useEffect, useState} from "react";

const useForm = ({ initialValues, validate, onSubmit}) => {
    const [values, setValues] = useState(initialValues);
    const [touched, setTouched] = useState({});
    const [disabled, setDisabled] = useState(true);

    // 필드 입력값 추출
    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    }

    // blur check
    const handleBlur = (e) => {
        setTouched({
            ...touched,
            [e.target.name]: true,
        })
    }

    // 폼 제출 전 처리
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (disabled) return;

        // 모든 필드에 방문표시
        setTouched(
            Object.keys(values).reduce((touched, field) => {
                touched[field] = true;
                return touched
            }, {})
        )

        const [filterValues, filterErrors] = await validate(values)

        let isError = false;
        Object.values(filterErrors).some(v => {
            if (v) {
                isError = true;
            }
        })
        if (isError) return;

        const submitValues = await onSubmit(filterValues);

        setValues({
            ...submitValues
        });
    }


    // 포커스 아웃될 때 검증 함수를 실행하는 함수를 정의
    const runValidator = useCallback(async () => {

        // 폼을 전부 다 입력한 경우
        if (Object.values(values).every(v => v)) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
        const [filterValues, _] = await validate(values)

        setValues({
            ...filterValues
        });
    }, [touched])

    useEffect(() => {

        const run = async () => {
            await runValidator();
        }
        run();

    }, [runValidator])

    return {
        values,
        touched,
        disabled,
        handleChange,
        handleBlur,
        handleSubmit,
    }
}

export default useForm;