import React, { useEffect } from 'react';
import MenuFlotante from './MenuFlotante';
import TableWithPagination from './TableWithPagination'; 
import { checkAuth } from '../AuthMiddleware'; 
import {useNavigate} from "react-router-dom"


const MyBookmarks = () => {
  const navigate = useNavigate();
 
  useEffect(() => {
    // Update the document title using the browser API
    if (!checkAuth()) {
      // Si el usuario no está autenticado, redirigirlo a la página de inicio de sesión
      navigate('/')  
    }  
  });
 

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
 

export default MyBookmarks
 