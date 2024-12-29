import {useEffect, useState} from "react";

const useFetch = (fetchFunc, args) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const result = await fetchFunc(args);
                setData(result);
            } catch (e) {
                setError(e);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [args, fetchFunc]);

    return { data, isLoading, error };
}

export default useFetch;