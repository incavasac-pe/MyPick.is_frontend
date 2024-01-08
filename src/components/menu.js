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
                <div className='col-4'>
                <button type="button" className='btnmenu' style={{ fontSize: '30px', cursor: 'pointer' }} onClick={openNav}>
                        <i className="fas fa-grip-lines text-white"></i>
                    </button>
                    <a href="/">
                        <img src={require('./img/logo.png')} alt="logo" className='logo-side' /> 
                    </a>  
                     <b className="text-white mr-4 font-family-SpaceGrotesk-Bold title-logo" >MyPick.Is</b>
                  
                </div>
                <div className='align-items-center col-4 d-flex justify-content-center p-movil'> 
                   
                    <Buscador onData={this.handleDataFromChild}/>
                </div>
                <div className='col-4 d-flex justify-content-center align-items-center'>
                    <LoginStatus />
                </div>
            </div>
            
        );
    }
}

export default Menu;
