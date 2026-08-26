import {Container, Logo, LogoutBtn} from '../index'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'

const themes = [
  { id: 'light', label: 'Light' },
  { id: 'dark', label: 'Dark' },
  { id: 'midnight', label: 'Midnight' },
];

function Header({ theme, setTheme }) {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const handleNavClick = (slug) => {
    if (slug.startsWith('/#')) {
      navigate('/');
      setTimeout(() => {
        const anchor = document.getElementById('about');
        if (anchor) anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
      return;
    }
    navigate(slug);
  }

  const navItems = [
    {
      name: 'Home',
      slug: "/all-posts",
      active: true
    },
    {
      name: 'About Us',
      slug: '/#about',
      active: true,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: true,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
  ]

  return (
    <header className='sticky top-0 z-50 border-b border-slate-200/80 bg-white/70 backdrop-blur-xl dark-header'>
      <Container>
        <nav className='flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between'>
          <div className='flex items-center justify-center sm:justify-start'>
            <button onClick={() => navigate('/all-posts')} className='flex items-center gap-2 rounded-full p-1.5 transition hover:bg-[var(--surface-alt)]'>
              <Logo width='30px' className='brand-mark' />
              <span className='text-lg font-black tracking-tight text-[var(--text)]'>TwitBlog</span>
            </button>
          </div>

          <ul className='flex w-full flex-wrap items-center justify-center gap-2 sm:w-auto'>
            {navItems.map((item) => 
            item.active ? (
              <li key={item.name}>
                <button
                onClick={() => handleNavClick(item.slug)}
                className='inline-flex items-center justify-center rounded-full px-3 py-2 text-sm font-medium text-[var(--text)] transition hover:bg-[var(--surface-alt)] hover:text-[var(--text)] sm:px-4 md:px-5'
                >{item.name}</button>
              </li>
            ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>

          <div className='flex w-full items-center justify-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] p-1 shadow-sm sm:w-auto'>
            {themes.map((item) => (
              <button
                key={item.id}
                type='button'
                onClick={() => setTheme(item.id)}
                className={`flex-1 rounded-full px-2.5 py-1 text-xs font-medium transition sm:flex-none ${
                  theme === item.id
                    ? 'bg-[var(--primary)] text-[var(--on-primary)] shadow-sm'
                    : 'text-[var(--muted)] hover:bg-[var(--surface-alt)] hover:text-[var(--text)]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </nav>
      </Container>
    </header>
  )
}

export default Header