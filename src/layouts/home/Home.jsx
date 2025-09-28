import HeroSection from './HeroSection'
import { FaUserGroup, FaLocationDot, FaDollarSign, FaCameraRetro } from "react-icons/fa6";
import MiddleSection from './MiddleSection';
import FeaturedTrips from './FeaturedTrips';

function Home() {
  return (
    <div>
      <HeroSection />
      <div className="items-center justify-items-center mt-12">
        {/* Heading Section */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-center">
          Everything You Need for Amazing Trips
        </h1>
        <p className="mt-3 text-base sm:text-lg md:text-xl max-w-2xl text-center mx-auto">
          From planning to memories, Travecta has all the tools to make your adventures seamless and enjoyable.
        </p>

        {/* Features Section */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center mb-16">
          {/* 1. Travel Buddies */}
          <div className="flex flex-col items-center max-w-xs mx-auto">
            <div className="p-4 rounded-full bg-cyan-100">
              <FaUserGroup className="text-2xl sm:text-3xl text-cyan-700" />
            </div>
            <h1 className="text-lg sm:text-xl font-bold mt-3">Find Travel Buddies</h1>
            <p className="mt-3 text-sm sm:text-base">
              Connect with like-minded travelers <br /> and make new friends
            </p>
          </div>

          {/* 2. Discover Destinations */}
          <div className="flex flex-col items-center max-w-xs mx-auto">
            <div className="p-4 rounded-full bg-emerald-100">
              <FaLocationDot className="text-2xl sm:text-3xl text-emerald-700" />
            </div>
            <h1 className="text-lg sm:text-xl font-bold mt-3">Discover Destinations</h1>
            <p className="mt-3 text-sm sm:text-base">
              Explore amazing places and hidden <br /> gems around the world
            </p>
          </div>

          {/* 3. Track Budgets */}
          <div className="flex flex-col items-center max-w-xs mx-auto">
            <div className="p-4 rounded-full bg-orange-100">
              <FaDollarSign className="text-2xl sm:text-3xl text-orange-700" />
            </div>
            <h1 className="text-lg sm:text-xl font-bold mt-3">Track Budgets and Expenses</h1>
            <p className="mt-3 text-sm sm:text-base">
              Keep track of expenses, split costs <br /> with friends, and never go over budget again.
            </p>
          </div>

          {/* 4. Capture Memories */}
          <div className="flex flex-col items-center max-w-xs mx-auto">
            <div className="p-4 rounded-full bg-red-100">
              <FaCameraRetro className="text-2xl sm:text-3xl text-red-700" />
            </div>
            <h1 className="text-lg sm:text-xl font-bold mt-3">Capture Memories</h1>
            <p className="mt-3 text-sm sm:text-base">
              Upload and organize your travel photos <br /> to create beautiful trip albums and share your experiences.
            </p>
          </div>
        </div>

        {/* Other Sections */}
        <MiddleSection />
      </div>
      <FeaturedTrips />
    </div>
  )
}

export default Home
