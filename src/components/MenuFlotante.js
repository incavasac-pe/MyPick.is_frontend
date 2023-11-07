import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class MenuFlotante extends Component {
    render() {
        return (
            <nav className='menu d-none'>
                <ul className='pc menu-float'>
                    <li>
                        <NavLink exact to="/" activeclassname="active" className="nav-link-no-marker">
                            <i class="fas fa-home-lg-alt"></i>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/TrendingTopics" activeclassname="active" className="nav-link-no-marker"> 
                            <i class="fas fa-chart-line"></i>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/MyBookmarks" activeclassname="active" className="nav-link-no-marker">
                            <i class="far fa-bookmark"></i>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/MyPicks" activeclassname="active" className="nav-link-no-marker">
                            <i class="fas fa-box"></i>
                        </NavLink>
                    </li>
                </ul>
                <div className='movil menu-float-movil'>
                    <ul>
                        <li>
                            <NavLink exact to="/" activeclassname="active" className="nav-link-no-marker">
                                <i class="fas fa-home-lg-alt"></i>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/TrendingTopics" activeclassname="active" className="nav-link-no-marker"> 
                                <i class="fas fa-chart-line"></i>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/MyBookmarks" activeclassname="active" className="nav-link-no-marker">
                                <i class="far fa-bookmark"></i>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/MyPicks" activeclassname="active" className="nav-link-no-marker">
                                <i class="fas fa-box"></i>
                            </NavLink>
                        </li>
                    </ul>
                </div>
                
            </nav>
        );
    }
}

export default MenuFlotante;
