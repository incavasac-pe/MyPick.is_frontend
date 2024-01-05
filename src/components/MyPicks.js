import React, { useState,useEffect } from 'react';
import MenuFlotante from './MenuFlotante';
import TableMyPicks from './TableMyPicks'; 
import { checkAuth }  from '../AuthMiddleware';
import LoginStatus from "./user/LoginStatus";


const MyPicks = (props) => {
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
            <h1 className='text-white titulo font-family-SpaceGrotesk-Light'>My Picks</h1> 
            <p className='text-grey descripcion'>All the picks you've created so far!</p>
            {!login && (<p className='text-grey descripcion'>
              Sorry, to continue, you must Login:
            </p>)}
            <p className='claseabrir text-center'>
              <LoginStatus/>
            </p>
          </div>          
        </div>
        {login && (<TableMyPicks idCat={idCat} />)}   
        <MenuFlotante />
      </div>
    ); 
}

export default MyPicks;
