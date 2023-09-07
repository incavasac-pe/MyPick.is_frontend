import React, { useState,useEffect } from 'react';
import MenuFlotante from './MenuFlotante';
import TableMyPicks from './TableMyPicks'; 
import { checkAuth }  from '../AuthMiddleware'; 


const MyPicks = () => {
  const [login, setlogin] = useState('');

    useEffect(() => { 
      const isAuthenticated = checkAuth();
      setlogin(isAuthenticated)  
    }, []);
 
    return (
      <div className='container contenido'>    
        <div className='row'>
          <div className='col-md-12 text-center'>
            <h1 className='text-white titulo font-family-SpaceGrotesk-Light'>My Picks</h1>
            <p className='text-grey descripcion'>Showing all the picks you’ve created so far.</p>
            {!login && (<p className='text-grey descripcion'> To continue you must log in.</p>)}     
          </div>          
        </div>
        {login && (<TableMyPicks />)}   
        <MenuFlotante />
      </div>
    ); 
}

export default MyPicks;
