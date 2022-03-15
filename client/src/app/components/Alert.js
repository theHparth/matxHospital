import { useDispatch, useSelector, shallowEqual } from 'react-redux'

const Alert = () => {
    const [alertType, alertText] = useSelector(
        (x) => [x.alertType, x.alertText],
        shallowEqual
    )
    return <div className={`alert alert-${alertType}`}>{alertText}</div>
}

export default Alert
