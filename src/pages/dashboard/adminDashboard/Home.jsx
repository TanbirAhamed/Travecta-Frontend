import { Outlet } from 'react-router'
import Tabs from './Tabs'

const Home = () => {
  return (
    <div>
        <div>
            <h1 className='text-4xl font-bold'>Admin Dashboard</h1>
            <p className='text-xl'>Manage trips, users, and platform content</p>
            <Tabs />
            <Outlet />
        </div>
    </div>
  )
}

export default Home