import { GiAirplaneDeparture } from "react-icons/gi";

function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow-md">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li><a>Item 1</a></li>
            <li>
              <a>Parent</a>
              <ul className="p-2">
                <li><a>Submenu 1</a></li>
                <li><a>Submenu 2</a></li>
              </ul>
            </li>
            <li><a>Item 3</a></li>
          </ul>
        </div>
        <a className="cursor-pointer text-2xl font-bold flex justify-items-center gap-2"><GiAirplaneDeparture className="text-4xl"/>TripBuddy</a>
      </div>
      <div className="navbar-end gap-4 font-semibold">
        <a className="cursor-pointer mr-3">Explore Trips</a>
        <a className="cursor-pointer">Sign In</a>
        <a className="btn bg-cyan-600 text-white rounded-xl">Sign Up</a>
      </div>
    </div>
  )
}

export default Navbar