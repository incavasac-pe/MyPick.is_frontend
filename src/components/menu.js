import React, { Component } from 'react';
import { openNav } from './Sidebar';
import Buscador from './modal/Buscador';
import LoginStatus from './user/LoginStatus';
 
class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
          searchTerm: '',      
        };        
      }
         
    handleDataFromChild = (data) => {  
        this.setState({ searchTerm: data.name }); 
        this.props.onMenuDataChange(data);
      };
    render() {
        const { searchTerm } = this.state;
        return (
            <div className="row">
                <div className='col-xl-4 col-6'>
                <button type="button" className='btnmenu' style={{ fontSize: '30px', cursor: 'pointer' }} onClick={openNav}>
                        <i className="fas fa-grip-lines text-white"></i>
                    </button>
                    <a href="/">
                        <img src={require('./img/logo.png')} alt="logo" className='logo-side' /> 
                    </a>  
                     <b className="text-white mr-4 font-family-SpaceGrotesk-Bold title-logo" >MyPick.Is</b>
                  
                </div>
                <div className='align-items-center col-1 col-xl-4 d-flex justify-content-center p-movil'>
                    <div className='movil' data-toggle="modal" data-target="#buscador">
                        <div className='text-center buscador_movil'><i className="fal fa-search"></i></div>
                    </div>
                    <div className='buscador pc' data-toggle="modal" data-target="#buscador">
                        <div className='align-items-start busca d-flex justify-content-between position-relative'>
                            <div className='text-left'><i className="fal fa-search"></i></div>
                            <p className='mb-0 text-center'> {searchTerm ?? 'Search Anything...'} </p>
                            <div className='text-right'><i className="fal fa-microphone"></i></div>
                        </div>
                    </div>                
                </div>
                <div className='col-xl-4 col-5 d-flex justify-content-center align-items-center'>
                    <LoginStatus />
                </div>
                <Buscador onData={this.handleDataFromChild}/>
            </div>
            
        );
    }
}

export default Menu;
