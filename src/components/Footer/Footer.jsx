
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-200">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="mb-4 inline-flex items-center">
              <Logo width="90px" />
            </div>
            <p className="max-w-md text-sm text-slate-300">
              A modern blog experience built for fast reading, elegant writing, and cleaner publishing flows.
            </p>
            <p className="mt-6 text-sm text-slate-400">&copy; 2023. All Rights Reserved by DevUI.</p>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Company</h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li><Link to="/" className="transition hover:text-white">Features</Link></li>
              <li><Link to="/" className="transition hover:text-white">Pricing</Link></li>
              <li><Link to="/" className="transition hover:text-white">Affiliate Program</Link></li>
              <li><Link to="/" className="transition hover:text-white">Press Kit</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Support</h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li><Link to="/" className="transition hover:text-white">Account</Link></li>
              <li><Link to="/" className="transition hover:text-white">Help</Link></li>
              <li><Link to="/" className="transition hover:text-white">Contact Us</Link></li>
              <li><Link to="/" className="transition hover:text-white">Customer Support</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Legals</h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li><Link to="/" className="transition hover:text-white">Terms &amp; Conditions</Link></li>
              <li><Link to="/" className="transition hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/" className="transition hover:text-white">Licensing</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer


