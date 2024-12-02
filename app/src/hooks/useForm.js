import {useCallback, useEffect, useState} from "react";

const useForm = ({ initialValues, validate, onSubmit}) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [disabled, setDisabled] = useState(true);

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    }

    const handleBlur = (e) => {
        setTouched({
            ...touched,
            [e.target.name]: true,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // 모든 필드에 방문표시
        setTouched(
            Object.keys(values).reduce((touched, field) => {
                touched[field] = true;
                return touched
            }, {})
        )

        const errors = validate(values)
        setErrors(errors)
        if (Object.values(errors).some(v => v)) {
            return;
        }

        onSubmit(values)
    }


    // 입력 값에 따라 검증 함수를 실행하는 함수를 정의
    const runValidator = useCallback(() => {

        // 폼을 전부 다 입력한 경우
        if (Object.values(values).every(v => v)) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }

        return validate(values)
    }, [values])

    useEffect(() => {
        const errors = runValidator();
        setErrors(errors);
    }, [runValidator])

    return {
        values,
        errors,
        touched,
        disabled,
        handleChange,
        handleBlur,
        handleSubmit,
    }
}

export default useForm;