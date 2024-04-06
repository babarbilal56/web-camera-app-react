import React from 'react';
import './MainLayout.css'; // Import your CSS file for styling
import Header from '../components/Header'
import Footer from '../components/Footer';
const MainLayout = ({ children }) => {


    return (
        <div className="main-layout">
            {/* <header className="header">Header</header> */}
            <Header className="header" />
            <main className="content">{children}</main>
            {/* <footer className="footer">Footer</footer> */}
        </div>
    );
};

export default MainLayout;