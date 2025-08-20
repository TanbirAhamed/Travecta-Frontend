

const HeroSection = () => {
    return (
        <div className="hero bg-green-50 min-h-96">
            <div className="hero-content text-center">
                <div className="max-w-md justify-items-center">
                    <h1 className="text-6xl font-bold">Plan Amazing Trips
                        Together</h1>
                    <p className="py-6">
                        Connect with fellow travelers, discover incredible destinations, and create unforgettable memories. Join group trips or organize your own adventures with Travecta.
                    </p>
                    <div className="flex gap-3 items-center">
                        <button className="btn bg-cyan-600 rounded-2xl text-white text-xl px-5">Explore Trips</button>
                        <button className="btn bg-base-200 hover:bg-orange-500 hover:text-white rounded-2xl text-xl px-5">Start Planning</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection