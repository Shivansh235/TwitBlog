import  { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

const THEME_KEY = 'twitblog-theme';

function App() {
  const [loading, setLoading] = useState(true)
  const [theme, setTheme] = useState(() => localStorage.getItem(THEME_KEY) || 'light')
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [dispatch])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem(THEME_KEY, theme)
  }, [theme])
  
  return !loading ? (
    <div className='app-shell min-h-screen' data-theme={theme}>
      <Header theme={theme} setTheme={setTheme} />
      <main className='app-main'>
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : null
}

export default App