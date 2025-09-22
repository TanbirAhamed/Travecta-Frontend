const MiddleSection = () => {
  return (
    <div className="hero bg-base-200 py-12 px-4">
      <div className="text-center">
        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
          How It Works
        </h1>
        <p className="mt-3 text-base sm:text-lg md:text-xl">
          Get started with TripBuddy in just a few simple steps
        </p>

        {/* Steps Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Step 1 */}
          <div className="flex flex-col items-center max-w-xs mx-auto">
            <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-full bg-black text-white font-bold">
              <p className="text-xl sm:text-2xl">1</p>
            </div>
            <h1 className="text-lg sm:text-xl font-bold mt-3">Create a free account</h1>
            <p className="mt-3 text-sm sm:text-base">
              Sign up in seconds and start planning your next adventure
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center max-w-xs mx-auto">
            <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-full bg-black text-white font-bold">
              <p className="text-xl sm:text-2xl">2</p>
            </div>
            <h1 className="text-lg sm:text-xl font-bold mt-3">Discover & Plan</h1>
            <p className="mt-3 text-sm sm:text-base">
              Browse destinations, create your itinerary, and set your budget
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center max-w-xs mx-auto">
            <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-full bg-black text-white font-bold">
              <p className="text-xl sm:text-2xl">3</p>
            </div>
            <h1 className="text-lg sm:text-xl font-bold mt-3">Collaborate</h1>
            <p className="mt-3 text-sm sm:text-base">
              Invite friends, share plans, and make decisions together
            </p>
          </div>

          {/* Step 4 */}
          <div className="flex flex-col items-center max-w-xs mx-auto">
            <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-full bg-black text-white font-bold">
              <p className="text-xl sm:text-2xl">4</p>
            </div>
            <h1 className="text-lg sm:text-xl font-bold mt-3">Travel & Share</h1>
            <p className="mt-3 text-sm sm:text-base">
              Track expenses, capture memories, and share your adventure
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiddleSection;
