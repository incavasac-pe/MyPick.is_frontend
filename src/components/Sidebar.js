import React from 'react';
import { NavLink } from 'react-router-dom';
import twitter from './img/logo-white.png'

const Sidebar = () => {
  const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
  };
  const redirectPage = () => {
   
  };
  const handleLinkClick = () => {
    closeNav();
  };

  return (
    <div className="sidebar" id="mySidenav">
      <div className="position-relative">
       
        <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>
          &times;
        </a>
        <a href='/'>  <img src={require('./img/logo.png')} alt="logo" onClick={redirectPage}   className='logo-side'/></a>
       
         <b className="text-white mr-4 font-family-SpaceGrotesk-Bold title-logo" >MyPick.Is</b>
      </div>
      <ul>
        <li>
          <NavLink
            exact
            to="/About"
            activeClassName="active"
            onClick={handleLinkClick}
          >
           About Us
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/FAQs"
            activeClassName="active"
            onClick={handleLinkClick}
          >
            FAQs
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Contact"
            activeClassName="active"
            onClick={handleLinkClick}
          >
            Contact
          </NavLink>
        </li>
      </ul>
      <div className='nav_redes mb-0'>
          <h6 className='text-white font-family-SpaceGrotesk-Light'>Follow us</h6>
          <div className='align-items-center d-flex justify-content-start list-redes mb-0 p-0'>
            <a href='https://www.facebook.com/MyPick.Is/'><i class="fab fa-facebook"></i></a>           
            <a href='#'><i class="fab fa-instagram"></i></a>
            <a href='https://twitter.com/mypick_is'> <img className="logo-twitter" src={twitter} width={"17px"} ></img></a>
          </div>
      </div>
    </div>
  );
};

export function openNav() {
  document.getElementById("mySidenav").style.width = "280px";
}

export default Sidebar;
