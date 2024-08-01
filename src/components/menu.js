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
      console.log("data---------",data) 
        this.setState({ searchTerm: data.name }); 
        this.props.onMenuDataChange(data);
        
      };
    render() {
        const { searchTerm } = this.state;
        const handleButtonClick = (eventName) => {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
              event: eventName,
              event_category: 'User',
              event_action: 'Click',
              event_label: eventName
            });
          };
        return (
            <div className="row">
                <div className='col-3'>
                <button type="button" className='btnmenu' style={{ fontSize: '30px', cursor: 'pointer' }} onClick={() => {openNav(); handleButtonClick('Menu');}}>
                        <i className="fas fa-grip-lines text-white"></i>
                    </button>
                    <a href="/" onClick={() =>  handleButtonClick('Home')}>
                        <img src={require('./img/logo.png')} alt="logo" className='logo-side' /> 
                    </a>  
                     <b className="text-white mr-4 font-family-SpaceGrotesk-Bold title-logo" >MyPick.Is</b>
                  
                </div>
                <div className='p-movil'> 
                   
                    <Buscador onData={this.handleDataFromChild}/>
                </div>
                <div className='col-4 d-flex justify-content-center align-items-center'>
                    <LoginStatus event="signup" />
                </div>
            </div>
            
        );
    }
}

export default Menu;
