import React, { Component } from 'react';
import MenuFlotante from './MenuFlotante';
import TableMyPicks from './TableMyPicks'; 

class MyPicks extends Component {
  render() {
    return (
      <div className='container contenido'>    
        <div className='row'>
          <div className='col-md-12 text-center'>
            <h1 className='text-white titulo font-family-SpaceGrotesk-Light'>My Picks</h1>
            <p className='text-grey descripcion'>Showing all the picks you’ve created so far.</p>
          </div>          
        </div>
        <TableMyPicks />
        <MenuFlotante />
      </div>
    );
  }
}

export default MyPicks;
