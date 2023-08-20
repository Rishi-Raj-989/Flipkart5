import React, { useEffect, useState } from "react";
import "./Header.css";
import cart from "../../images/cart.png";
import searchIcon from "../../images/search.png";

import { NavLink } from 'react-router-dom'
// import cart from '../images/cart.png'
import { useRegistrationStatus } from '../user-registration-status';

const Header = () => {
    const isRegistered = useRegistrationStatus();
    console.log("isRegistered",isRegistered);

 

  
  return (
    <div className="header">    
    
        <NavLink to = '/' style={{display:'flex'}}>
      <div className="first">
        <img src="//img1a.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_4ee2f9.png" alt="Flipkart" />
        <div className="first1">
          <span style={{ fontSize: "11px",paddingRight: "2px", color: "white", fontStyle: "italic",}}>Explore</span>
          <span style={{color: "#F9E107", fontSize: "11px", fontStyle: "italic", }}>Plus </span><span>
            <img width="10"className="logo" src="//img1a.flixcart.com/www/linchpin/fk-cp-zion/img/plus_b13a8b.png"alt=""/></span>
        </div>
      </div>
        <div className="second">
            <input type="text" placeholder="Search for products,brands and more" />
            <a style={{cursor:"pointer"}}>
            <img src ={searchIcon} alt ="search" style={{height: "30px"}}/>
            </a>
        </div>

    </NavLink>
    
      
        
          
        {  isRegistered === "Not" && (
                
                    <NavLink to="/register" style={{"margin-right" : "70px"}}>
                    <div className="third">
                         <button>Register</button>
                    </div>    
                    </NavLink>
                
            )
          }
          {  isRegistered === "Member" && (
            <div className="member">
                
                  <NavLink to="/member-dashboard" style={{"margin-top" : "10px"}}>
                  <div className="fourth">
                    <p style={{ color: "white", fontWeight: "600" }}>DashBoard</p>
                </div>
                  </NavLink>
                    <NavLink to="/cart">
                    <div  className="fifth">
                        <img src={cart} alt="" />
                        
                    </div>
                    </NavLink>
                

            </div>
            )}
          {  isRegistered === "Partner" && (
               
                    <NavLink to="/partner-dashboard" style={{"margin-right" : "70px"}}>
                    <div className="fourth">
                        <p style={{ color: "white", fontWeight: "600" }}>DashBoard</p>
                    </div>
                    </NavLink>
                
            )
          }
          
    </div>

  );
};

export default Header;