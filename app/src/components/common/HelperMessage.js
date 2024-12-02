import SC from './common.styled'

const HelperMessage = ({touched, error}) => {
    return (<>
        { touched && error && <SC.Helper>{error}</SC.Helper> }
    </>)
}

export default HelperMessage;