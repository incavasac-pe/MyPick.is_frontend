import React, { Component } from 'react';
import { openNav } from './Sidebar';
import Buscador from './modal/Buscador';
import LoginStatus from './user/LoginStatus';
 
class Menu extends Component {
    
    render() {
        return (
            <div className="row">
                <div className='col-xl-4 col-6'>
                    <a href="/">
                        <img src={require('./img/logo.png')} alt="logo" />
                    </a>
                    <button type="button" className='btnmenu' style={{ fontSize: '30px', cursor: 'pointer' }} onClick={openNav}>
                        <i className="fas fa-grip-lines text-white"></i>
                    </button>
                </div>
                <div className='align-items-center col-1 col-xl-4 d-flex justify-content-center p-movil'>
                    <div className='movil' data-toggle="modal" data-target="#buscador">
                        <div className='text-center buscador_movil'><i className="fal fa-search"></i></div>
                    </div>
                    <div className='buscador pc' data-toggle="modal" data-target="#buscador">
                        <div className='align-items-start busca d-flex justify-content-between position-relative'>
                            <div className='text-left'><i className="fal fa-search"></i></div>
                            <p className='mb-0 text-center'>Search Anything...</p>
                            <div className='text-right'><i className="fal fa-microphone"></i></div>
                        </div>
                    </div>                
                </div>
                <div className='col-xl-4 col-5 d-flex justify-content-center align-items-center'>
                    <LoginStatus />
                </div>
                <Buscador />
            </div>
            
        );
    }
}

export default Menu;
