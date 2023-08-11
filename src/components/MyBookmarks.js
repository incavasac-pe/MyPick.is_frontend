import React, { Component } from 'react';
import MenuFlotante from './MenuFlotante';
import TableWithPagination from './TableWithPagination'; 

class MyBookmarks extends Component {
  render() {
    return (
      <div className='container contenido'>
        <div className='row'>
          <div className='col-md-12 text-center'>
            <h1 className='text-white titulo font-family-SpaceGrotesk-Light'>My Bookmarks</h1>
            <p className='text-grey descripcion'>Showing all the picks you’ve saved so far.</p>
          </div>          
        </div>
        <TableWithPagination />
        <MenuFlotante />
      </div>
    );
  }
}

export default MyBookmarks;
