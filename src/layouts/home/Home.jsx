import HeroSection from './HeroSection'
import { FaUserGroup, FaLocationDot, FaDollarSign, FaCameraRetro } from "react-icons/fa6";
import MiddleSection from './MiddleSection';
import FeaturedTrips from './FeaturedTrips';

function Home() {
  return (
    <div className=''>
      <HeroSection />
      <div className='items-center justify-items-center mt-16'>
        <h1 className='text-5xl font-semibold'>Everything You Need for Amazing Trips</h1>
        <p className='mt-3 text-xl w-1/2 text-center'>From planning to memories, Travecta has all the tools to make your adventures seamless and enjoyable.</p>
        <div className="mt-16 flex items-start justify-center gap-10 text-center mb-16">
          <div className="flex flex-col items-center max-w-xs">
            <div className="p-4 rounded-full bg-cyan-100">
              <FaUserGroup className="text-3xl text-cyan-700" />
            </div>
            <h1 className="text-xl font-bold mt-3">Find Travel Buddies</h1>
            <p className="mt-3">
              Connect with like-minded travelers <br /> and make new friends
            </p>
          </div>
          <div className="flex flex-col items-center max-w-xs">
            <div className="p-4 rounded-full bg-emerald-100">
              <FaLocationDot className="text-3xl text-emerald-700" />
            </div>
            <h1 className="text-xl font-bold mt-3">Discover Destinations</h1>
            <p className="mt-3">
              Explore amazing places and hidden <br /> gems around the world
            </p>
          </div>
          <div className="flex flex-col items-center max-w-xs">
            <div className="p-4 rounded-full bg-orange-100">
              <FaDollarSign className="text-3xl text-orange-700" />
            </div>
            <h1 className="text-xl font-bold mt-3">Track Budgets and Expenses</h1>
            <p className="mt-3">
              Keep track of expenses, split costs <br /> with friends, and never go over budget again.
            </p>
          </div>
          <div className="flex flex-col items-center max-w-xs">
            <div className="p-4 rounded-full bg-red-100">
              <FaCameraRetro className="text-3xl text-red-700" />
            </div>
            <h1 className="text-xl font-bold mt-3">Capture Memories</h1>
            <p className="mt-3">
              Upload and organize your travel photos <br /> to create beautiful trip albums and share your experiences.
            </p>
          </div>
        </div>
        <MiddleSection />
        <FeaturedTrips />
      </div>
    </div>
  )
}

export default Home