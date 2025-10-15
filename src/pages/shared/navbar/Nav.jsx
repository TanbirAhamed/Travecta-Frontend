import useAuth from '../../../hooks/useAuth';
import { Link, NavLink } from 'react-router';
import { GiAirplaneDeparture } from "react-icons/gi";
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useRole from '../../../hooks/useRole';

const Nav = () => {
    const { user, logOut } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { isAdmin } = useRole();

    const { data: noti = [] } = useQuery({
        queryKey: ["joinedTrips", user?.email],
        queryFn: async () => {
            if (!user?.email) return [];
            const res = await axiosSecure.get("/joinRequests", {
                params: { email: user.email },
            });
            return res.data ?? [];
        },
        enabled: !!user?.email,
        refetchInterval: 1000,
    });

    const pendingNoti = noti.filter((p) => p.status === "pending");

    const links = (
        <>
            <NavLink to='/exploretrips'>Explore Trips</NavLink>
            {
                isAdmin ? <NavLink to='/admindashboard'>Dashboard</NavLink> : <NavLink to='/userdashboard'>Dashboard</NavLink>
            }

        </>
    );

    return (
        <nav className="sticky top-0 z-50 bg-base-100 shadow-md">
            <div className="navbar max-w-[1536px] mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {links}
                        </ul>
                    </div>
                    <Link to='/' className="cursor-pointer text-2xl font-bold flex justify-items-center gap-2">
                        <GiAirplaneDeparture className="text-4xl" />Travecta
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-5">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end gap-5">
                    <button className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                            <span className="badge badge-xs indicator-item">{pendingNoti.length}</span>
                        </div>
                    </button>

                    {user?.email ? (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img src={user?.photoURL} alt="User Avatar" />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                <li>Profile</li>
                                <li className='cursor-pointer' onClick={logOut}>Logout</li>
                            </ul>
                        </div>
                    ) : (
                        <>
                            <NavLink to='/login' className="btn rounded-xl mr-1">Sign In</NavLink>
                            <NavLink to='/signup' className="btn bg-cyan-600 text-white rounded-xl hover:bg-cyan-700">Sign Up</NavLink>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Nav;
