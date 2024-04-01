import React from 'react'
import './Header.css'; // Import CSS file for styling

export default function Header() {
    return (
        <header class="header">
            <div class="container">
                <div class="row-wrap">
                    <div class="logo-wrap">
                        <span class="logo">LOGO</span>
                    </div>
                    <div class="nav-wrap">
                        <ul class="nav-list">
                            <li class="active"><a href="#">About-us</a></li>
                            <li><a href="#">Contact-us</a></li>
                            <li class="with-submenu">
                                <a href="#">Blog</a>
                                <div class="submenu">
                                    <ul class="submenu-inner">
                                        <li><a href="#">Link1</a></li>
                                        <li><a href="#">Link2</a></li>
                                        <li><a href="#">Link3</a></li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="hamburger">
                        <span class="line"></span>
                        <span class="line"></span>
                        <span class="line"></span>
                    </div>
                </div>
            </div>
        </header>

    );

}
