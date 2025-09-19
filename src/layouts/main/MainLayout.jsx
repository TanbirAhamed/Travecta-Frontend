import React from 'react';
import Navbar from '../../pages/shared/navbar/Navbar';
import Footer from '../../pages/shared/footer/Footer';
import { Outlet } from 'react-router';
import Nav from '../../pages/shared/navbar/Nav';

const MainLayout = () => {
    return (
        <div>
            <Nav />
            <div className='min-h-screen'>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;