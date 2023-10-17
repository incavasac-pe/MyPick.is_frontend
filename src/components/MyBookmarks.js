import React, { useState,useEffect } from 'react';
import MenuFlotante from './MenuFlotante';
import TableWithPagination from './TableWithPagination'; 
import { checkAuth }  from '../AuthMiddleware'; 
 
 
  const MyBookmarks = (props) => {
    const [login, setlogin] = useState('');
    const idCat = props.idCat; 

    useEffect(() => { 
      const isAuthenticated = checkAuth();
      setlogin(isAuthenticated)  
    }, []);
 
  
    return (
      <div className='container contenido'>
        <div className='row'>
          <div className='col-md-12 text-center'>
            <h1 className='text-white titulo font-family-SpaceGrotesk-Light'>My Bookmarks</h1>
            <p className='text-grey descripcion'>Showing all the picks you’ve saved so far.</p>
            {!login && (<p className='text-grey descripcion'> Sorry, to continue, you must login.</p>)}     
           
          </div>          
        </div>
       {login && (<TableWithPagination idCat={idCat}/>)}   
        <MenuFlotante />
      </div>
    );
  }
 

export default MyBookmarks;
