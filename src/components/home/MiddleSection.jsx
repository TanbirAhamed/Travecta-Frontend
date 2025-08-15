

const MiddleSection = () => {
    return (
        <div className="hero bg-base-200 min-h-96">
            <div className="justify-items-center">
                <h1 className="text-5xl font-bold">How It Works</h1>
                <p className="mt-3">
                    Get started with TripBuddy in just a few simple steps
                </p>
                <div className="mt-15 flex items-start justify-center gap-10 text-center">
                    <div className="flex flex-col items-center max-w-xs">
                        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-black text-white font-bold">
                            <p className="text-2xl">1</p>
                        </div>
                        <h1 className="text-xl font-bold mt-3">Create a free account</h1>
                        <p className="mt-3">
                            Sign up in seconds and start planning your <b/> next adventure
                        </p>
                    </div>
                    <div className="flex flex-col items-center max-w-xs">
                        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-black text-white font-bold">
                            <p className="text-2xl">2</p>
                        </div>
                        <h1 className="text-xl font-bold mt-3">Discover & Plan</h1>
                        <p className="mt-3">
                            Browse destinations, create your <b/> itinerary, and set your budget
                        </p>
                    </div>
                    <div className="flex flex-col items-center max-w-xs">
                        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-black text-white font-bold">
                            <p className="text-2xl">3</p>
                        </div>
                        <h1 className="text-xl font-bold mt-3">Collaborate</h1>
                        <p className="mt-3">
                            Invite friends, share plans, <b/> and make decisions together
                        </p>
                    </div>
                    <div className="flex flex-col items-center max-w-xs">
                        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-black text-white font-bold">
                            <p className="text-2xl">4</p>
                        </div>
                        <h1 className="text-xl font-bold mt-3">Travel & Share</h1>
                        <p className="mt-3">
                            Track expenses, capture memories, <b/> and share your adventure
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MiddleSection