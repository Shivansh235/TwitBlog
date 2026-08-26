function Logo({ width = '32px', className = '' }) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={width}
      height={width}
      className={className}
      aria-label="TwitBlog icon"
      role="img"
    >
      <defs>
        <linearGradient id="twitblog-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      <rect x="6" y="8" width="52" height="40" rx="14" fill="url(#twitblog-gradient)" opacity="0.18" />
      <path d="M18 22.5c0-5.2 4.3-9.5 9.5-9.5h11.6c5.2 0 9.5 4.3 9.5 9.5v11.2c0 5.2-4.3 9.5-9.5 9.5H27.5c-5.2 0-9.5-4.3-9.5-9.5V22.5Zm9.8 7.1h13.6M27.8 30.2h16.2M27.8 35.8h10.2" stroke="url(#twitblog-gradient)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <circle cx="42.5" cy="24.1" r="3.1" fill="#22c55e" />
      <path d="M47 45.2l8.5 5.7-3.2-8.4 7.2-6.1h-9.1L47 27.5l-2.4 9.9H35.5l7.2 6.1-3.1 8.4L47 45.2Z" fill="url(#twitblog-gradient)" opacity="0.9"/>
    </svg>
  )
}

export default Logo