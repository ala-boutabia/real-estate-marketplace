import { FaSearch } from "react-icons/fa"
import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header className="bg-slate-100 px-4 py-3 shadow-md">
      <div className="flex items-center justify-between max-w-6xl mx-auto gap-4">

        {/* Logo — now a clickable link */}
        <Link to="/" className="font-bold text-sm sm:text-xl md:text-2xl flex shrink-0">
          <span className="text-slate-500">Real</span>
          <span className="text-slate-700">Estate</span>
        </Link>

        {/* Search — ring appears on the whole box when focused */}
        <form className="flex items-center bg-white border border-slate-200 rounded-lg
                         transition-all focus-within:ring-2 focus-within:ring-slate-400
                         focus-within:border-transparent">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent px-3 py-2 outline-none w-24 sm:w-40 md:w-64
                       text-sm text-slate-700 placeholder:text-slate-400"
          />
          <button
            type="submit"
            aria-label="Search"
            className="pr-3 pl-1 text-slate-500 hover:text-slate-800 transition-colors"
          >
            <FaSearch />
          </button>
        </form>

        {/* Nav */}
        <nav>
          <ul className="flex items-center gap-1">
            <li className="hidden sm:block">
              <Link
                to="/about"
                className="text-sm text-slate-600 hover:text-slate-900 px-3 py-1.5
                           rounded-md hover:bg-slate-200 transition-colors"
              >
                About
              </Link>
            </li>
            <li className="hidden sm:block">
              <Link
                to="/profile"
                className="text-sm text-slate-600 hover:text-slate-900 px-3 py-1.5
                           rounded-md hover:bg-slate-200 transition-colors"
              >
                Profile
              </Link>
            </li>
            {/* Register stands out as a CTA */}
            <li>
              <Link
                to="/register"
                className="text-sm font-medium text-white bg-slate-700 px-4 py-1.5
                           rounded-lg hover:bg-slate-800 transition-colors"
              >
                Register
              </Link>
            </li>
          </ul>
        </nav>

      </div>
    </header>
  )
}

export default Header