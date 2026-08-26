import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Protected({ children, authentication = true }) {
    const navigate = useNavigate()
    const authStatus = useSelector((state) => state.auth.status)
    const isAuthenticated = authStatus === true
    const isAllowed = authentication ? isAuthenticated : !isAuthenticated

    useEffect(() => {
        if (authentication && !isAuthenticated) {
            navigate('/login')
        } else if (!authentication && isAuthenticated) {
            navigate('/')
        }
    }, [authentication, isAuthenticated, navigate])

    return isAllowed ? <>{children}</> : null
}
