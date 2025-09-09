import { GiAirplaneDeparture } from "react-icons/gi";
import { Link, NavLink } from "react-router";
import useAuth from "../../../hooks/useAuth";

function Navbar() {
  const { user, logOut } = useAuth();
  const links =
    <>
      <NavLink to='/exploretrips'>Explore Trips</NavLink>
      <NavLink to='/userdahboard'>Dashbord</NavLink>
    </>
  return (
    <div className="sticky top-0 z-50 bg-base-100 shadow-md">
      <div className="navbar max-w-[1536px] mx-auto ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              {links}
            </ul>
          </div>
          <Link to='/' className="cursor-pointer text-2xl font-bold flex justify-items-center gap-2"><GiAirplaneDeparture className="text-4xl" />Travecta</Link>
        </div>
        <div className="navbar-end gap-4 font-semibold">
          {links}
          {user?.email ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    src={user?.photoURL }
                    alt="User Avatar"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                <li>
                  <a className="justify-between">
                    Profile
                  </a>
                </li>
                <li><a>Settings</a></li>
                <li>
                  <Link onClick={logOut}>Logout</Link>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <NavLink to='/login'>Sign In</NavLink>
              <NavLink to='/signup' className="btn bg-cyan-600 text-white rounded-xl">Sign Up</NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar