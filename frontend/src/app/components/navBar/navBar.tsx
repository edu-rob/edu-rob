"use client";

import "./navBar.css";  
import Image from "next/image";

export default function NavBar() {
    return (
        <div className="NavBarWrapper">
            <div className="NavBar">
                <h1 className="NavBarTitleText">EduRob</h1>
                <img src="./logo.png" alt="" className="NavBarLogo" />
            </div>    
        </div>
    );
}