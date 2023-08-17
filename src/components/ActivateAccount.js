import React, { Component } from 'react';  

class ActivateAccount  extends Component  {
  render() {
    const { match } = this.props;
   // const token = match.params.token;
   console.log("asdasdsadsd",match)
    return (
      <div className="container contenido about">
        <div className='row'>
          <div className="col-md-12">
            <h1 className="font-family-SpaceGrotesk-Bold text-white">
              Activate Account
            </h1>
          </div>
        </div>
        <div className='border-p'>
        <div className="row">          
          <div className="col-md-6">      
            {/* Contenido de tu página */}
         {/*  <h2>Token recibido: {token}</h2>       */}
          </div>         
        </div>
        </div>        
      </div>
    );
  }
}

export default ActivateAccount;

