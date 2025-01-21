import {useEffect, useState} from "react";
import {useAtomValue} from "jotai";
import {userAtom} from "../store/atoms";
import {Navigate} from "react-router-dom";
import Loading from "../components/common/Loading";

const AdminRoute = ({children, redirectUrl}) => {
    const [success, setSuccess] = useState(null);
    const me = useAtomValue(userAtom);

    useEffect(() => {
        if (me.is_authenticated && me.role === 'ADMIN') {
            setSuccess(true);
        } else if (success === null) {
            setSuccess(false);
        }
    }, [me])

    if (success === null) {
        return <Loading/>
    }

    return success ? <>{children}</> : <Navigate to={redirectUrl} />;

}

export default AdminRoute;