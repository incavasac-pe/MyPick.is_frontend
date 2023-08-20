import React, { useState, useEffect} from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
const ResetPassword = () => { 
   
  const location = useLocation();
  const navigate = useNavigate(); // Hook de navegación
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfir, setNewPasswordConfirm] = useState('');

  useEffect(() => {
    fetch(`http://localhost:3100/reset_password?token=${token}`, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json'      
      }  
    })
    .then(response => response.json())
    .then(data => { 
      if(data.error){        
         toast.error(data.msg);     
      } else {     
           // Lógica para iniciar sesión     
           if (data.data.token) {   
            localStorage.setItem('user', JSON.stringify({ name: data.data.user.full_name, email: data.data.user.email,token:data.data.token}));
            setShowModal(true)
          }  
       }
    })
    .catch(error => {
      // Manejar cualquier error de la solicitud           
      toast.error("An error has occurred");  
     // navigate('/'); // Redirigir al usuario a la página de home  
    });    
  }, [navigate,token]); 

    return (
      <div className="container contenido about col-md-4 mb-3">       
        <div className='border-p'>      
        <div>
          <div className="row">
            <div className="col-md-12 position-relative">
              <h3 className="font-family-SpaceGrotesk-Bold text-white text-center">
                Create new password
              </h3>               
            </div>
            <div className="col-md-12 text-center">
              <p className="font-family-SpaceGrotesk-Medium">
                Create a new password with which you will Sign in to your account from now on.
              </p>
              <form>                
                <div className="align-items-center d-flex form-group justify-content-center select-topic mb-5">
                            
                  <input placeholder='New password' className={`form-control ${errors.newPassword ? "is-invalid" : ""}`} type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                  {errors.newPassword &&  <div className="invalid-feedback">{errors.newPassword}</div>}      
                </div>
                <div className="align-items-center d-flex form-group justify-content-center select-topic mb-5">
                            
                  <input placeholder='Confirm password' className={`form-control ${errors.newPasswordConfir ? "is-invalid" : ""}`} type="password" value={newPasswordConfir} onChange={(e) => setNewPasswordConfirm(e.target.value)} />
                  {errors.newPasswordConfir &&  <div className="invalid-feedback">{errors.newPasswordConfir}</div>}      
                </div>
                <button type="button" className="btn btn-login-modal font-family-SpaceGrotesk-Bold"  >
                  Continue
                </button>
              </form>
            </div>
          </div>        
        
     
    
    </div>
        </div>        
      </div>
    );
 
}

export default ResetPassword;

