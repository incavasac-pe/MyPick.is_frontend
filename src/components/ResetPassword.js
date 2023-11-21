import React, { useState, useEffect} from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
const API_BASE_URL = process.env.REACT_APP_URL_API

const ResetPassword = () => {    
  const location = useLocation();
  const navigate = useNavigate(); // Hook de navegación
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token'); 
  const [errors, setErrors] = useState({});
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfir, setNewPasswordConfirm] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => { 
    fetch(`${API_BASE_URL}/reset_password?token=${token}`, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json'      
      }  
    })
    .then(response => response.json())
    .then(data => { 
   
      if(data.error){        
         toast.error(data.msg);   
         setTimeout(() => {     
                navigate('/')               
          },3000);   
      
      } else {     
           // Lógica para iniciar sesión     
           if (data.data.email) {   
            setEmail(data.data.email)  
            toast.success(data.msg, {
              position: toast.POSITION.TOP_RIGHT
           });         
          }  
       }
    })
    .catch(async error => { 
      // Manejar cualquier error de la solicitud           
      toast.error("An error has occurred",error);    
       setTimeout(() => {     
         navigate('/')               
        },3000);   
          
   
    });    
  }, [navigate,token]); 

  
  const handleChange = (e) => {
    e.preventDefault();
    //llamar al servicio de login 
    setErrors({});
    const errors = {};
    if(!email)  errors.email= 'Please enter your password';       
    if (!newPassword.trim()) {
      errors.newPassword = 'Please enter your password';       
    }  
    if (!newPasswordConfir.trim()) {
      errors.newPasswordConfir = 'Please enter your password confirm';  
    }   

    if(newPassword!==newPasswordConfir)  errors.newPassword = 'Passwords do not match';       
   
    if (Object.keys(errors).length === 0) {
      fetch(`${API_BASE_URL}/change_password`, {
        method: 'POST',
        body: JSON.stringify({ email: email, new_password: newPassword }),
        headers: {
          'Content-Type': 'application/json'      
        }
      })
      .then(response => response.json())
      .then(async data => { 
        if(data.error){        
           toast.error(data.msg);              
        } else {     
             // Lógica para iniciar sesión      
          setErrors({}); 
          setNewPassword('');          
          setNewPasswordConfirm('');         
          toast.success(data.msg, {
            position: toast.POSITION.TOP_RIGHT
         });
       
         setTimeout(() => {     
              navigate('/')               
        },3000);   
          
         }
      })
      .catch(() => {
        // Manejar cualquier error de la solicitud           
        toast.error("An error has occurred");     
      });
  } else {
    setErrors(errors);  
  } 
  };


  const [showPassword, setShowPassword] = useState(false);  
  const [showPasswordConfir, setShowPasswordConfir] = useState(false);
 
  const handleTogglePasswordConfirm = () => {
    setShowPasswordConfir(!showPasswordConfir);
  };
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

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
              <ToastContainer position="top-center" autoClose={2000} closeOnClick theme="dark"/>                      
              <form  onSubmit={handleChange}>                
                <div className="align-items-center d-flex form-group justify-content-center select-topic mb-5">                            
                  <input placeholder='New password' className={`form-control ${errors.newPassword ? "is-invalid" : ""}`} type={showPassword ? 'text' : 'password'} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                  {errors.newPassword &&  <div className="invalid-feedback">{errors.newPassword}</div>}      
          
                            {showPassword ? (
                                <i className="fas fa-eye-slash"  onClick={handleTogglePassword}></i>
                            ) : (
                                <i className="fas fa-eye"  onClick={handleTogglePassword}></i>
                            )}
                            
                </div>
               <div className="align-items-center d-flex form-group justify-content-center select-topic mb-5">
                            
                  <input placeholder='Confirm password' className={`form-control ${errors.newPasswordConfir ? "is-invalid" : ""}`}  type={showPasswordConfir ? 'text' : 'password'}value={newPasswordConfir} onChange={(e) => setNewPasswordConfirm(e.target.value)} />
                  {errors.newPasswordConfir &&  <div className="invalid-feedback">{errors.newPasswordConfir}</div>}  
                  
                  {showPasswordConfir ? (
                            <i className="fas fa-eye-slash"  onClick={handleTogglePasswordConfirm}></i>
                        ) : (
                            <i className="fas fa-eye"  onClick={handleTogglePasswordConfirm}></i>
                        )}    
                </div>  
                <button type="submit" disabled={email==='' ? true:false} className="btn btn-login-modal font-family-SpaceGrotesk-Bold"  >
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

