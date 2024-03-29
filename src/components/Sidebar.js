import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
  };

  const handleLinkClick = () => {
    closeNav();
  };

  return (
    <div className="sidebar" id="mySidenav">
      <div className="position-relative">
        <img src={require('./img/logo.png')} alt="logo" />
        <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>
          &times;
        </a>
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
            <a href='#'><i class="fab fa-facebook"></i></a>           
            <a href='#'><i class="fab fa-instagram"></i></a>
            <a href='#'><i class="fab fa-twitter"></i></a>
          </div>
      </div>
    </div>
  );
};

export function openNav() {
  document.getElementById("mySidenav").style.width = "280px";
}

export default Sidebar;
