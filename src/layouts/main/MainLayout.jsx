import React from 'react';
import Navbar from '../../pages/shared/navbar/Navbar';
import Footer from '../../pages/shared/footer/Footer';
import { Outlet } from 'react-router';

const MainLayout = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default MainLayout;