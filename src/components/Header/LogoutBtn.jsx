import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
  return (
    <button
      className='inline-flex items-center rounded-full px-5 py-2 text-sm font-medium text-[var(--text)] transition-colors duration-200 hover:bg-[var(--surface-alt)] hover:text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40'
      onClick={logoutHandler}
    >
      Logout
    </button>
  )
}

export default LogoutBtn