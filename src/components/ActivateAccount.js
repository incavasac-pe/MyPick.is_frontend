import React, {  useEffect} from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
const API_BASE_URL = process.env.REACT_APP_URL_API

const ActivateAccount = () => {  
  const location = useLocation();
  const navigate = useNavigate(); // Hook de navegación
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');

   
  useEffect(() => {
    fetch(`${API_BASE_URL}/activate_account?token=${token}`, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json'      
      }  
    })
    .then(response => response.json())
    .then(data => { 
      if(data.error){        
      //toast.error(data.msg);   
      } else {     
           // Lógica para iniciar sesión     
           if (data.data.token) {   
            toast.success('Account activated successfully.', {
              position: toast.POSITION.TOP_RIGHT,
              autoClose:4000        
          });
       
        localStorage.setItem('user', JSON.stringify({ name: data.data.user.full_name, email: data.data.user.email,token:data.data.token}));        
        setTimeout(() => {     
          navigate('/MyProfile'); // Redirigir al usuario a la página de perfil   
          },4000);  
       
          }  
       }
    })
       
  }, [navigate,token]); 
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
          <h3>Validating token</h3>     
          <ToastContainer  position="top-right"  autoClose={4000} closeOnClick theme="dark"/>   
          </div>         
        </div>
        </div>        
      </div>
    );
 
}

export default ActivateAccount;

