import React, { useState,useEffect } from 'react';
import { useNavigate,useLocation  } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import sleep from '@react-corekit/sleep';
import FacebookLogin from 'react-facebook-login';
import { GoogleOAuthProvider ,GoogleLogin} from '@react-oauth/google'; 
import jwt_decode from "jwt-decode";
const API_BASE_URL = 'https://mypick.is/api';

const LoginStatus = () => { 
  const location = useLocation(); 
  const [loggedIn, setLoggedIn] = useState(false); // Estado de inicio de sesión 
  const [user, setUser] = useState(null); // Información del usuario
  const [errors, setErrors] = useState({});
  const [errors_re, setErrors_re] = useState({});
  const [showModal, setShowModal] = useState(false);
  
  const navigate = useNavigate(); // Hook de navegación
  
  useEffect(() => {   
      const storedUser = localStorage.getItem('user');
      const storedUserPhoto = localStorage.getItem('photo');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);     
      const parsedUserPhoto = JSON.parse(storedUserPhoto);
    
      setName (parsedUser.name)
      setEmail(parsedUser.email)
      setLoggedIn(true); 
        setUser({ name: parsedUser.name, photo: parsedUserPhoto?.photo ?? '', email: parsedUser.email });
    }
   
  }, [location.state]);
 
  const handleLogin = (e) => {
    e.preventDefault();
    //llamar al servicio de login 
    setErrors({});
    const errors = {};
    if (!email.trim()) {
      errors.email = 'Please enter your email';       
    } else if (!isValidEmail(email)) {
      errors.email = 'Please enter a valid email';       
    }
    if (!password.trim()) errors.password = 'Please enter your password'

    if (Object.keys(errors).length === 0) {
        fetch(`${API_BASE_URL}/login`, {
          method: 'POST',
          body: JSON.stringify({ email: email, password: password }),
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
            setErrors({});
            setEmail('');
            setPassword('');             
            setShowModal(false);
               if (data.data.token) {             
                 setLoggedIn(true); 
                 setUser({ name: data.data.user.full_name, photo: `${API_BASE_URL}/see_photo?img=${data.data.user.photo}` , email: data.data.user.email,token:data.data.token});                 
                 localStorage.setItem('user', JSON.stringify({ name: data.data.user.full_name,  email: data.data.user.email,token:data.data.token,nick:data.data.user.username}));
                 if(data.data.user.photo!=null)   localStorage.setItem('photo', JSON.stringify({ photo: `${API_BASE_URL}/see_photo?img=${data.data.user.photo}`}));
                 sleep(4000);
                 window.location.reload()
                }  
           }
        })
        .catch(error => {
          // Manejar cualquier error de la solicitud           
          toast.error("An error has occurred");
          console.error('Error:', error);
        });
    } else {
      // Form is invalid, update the state with the errors
      setErrors(errors);
    }
  };

  const handleButtonClick = () => {
    setShowModal(true);
  };
 
  const [mostrarCuadro1, setMostrarCuadro1] = useState(true);
  const [mostrarCuadro2, setMostrarCuadro2] = useState(false);
  const [mostrarCuadro3, setMostrarCuadro3] = useState(false);

  const mostrarCuadro = (cuadro) => {   
    if (cuadro === 'cuadro1') {
      setMostrarCuadro1(true);
      setMostrarCuadro2(false);
      setMostrarCuadro3(false);
    } else if (cuadro === 'cuadro2') {
      setMostrarCuadro1(false);
      setMostrarCuadro2(true);
      setMostrarCuadro3(false);
    } else if (cuadro === 'cuadro3') {
        setMostrarCuadro1(false);
        setMostrarCuadro2(false);
        setMostrarCuadro3(true);         
    }
  };

  const handleLogout = () => {
    // Lógica para cerrar sesión
    localStorage.removeItem('user');
     localStorage.removeItem('photo');
     localStorage.removeItem('searchTerm');
     localStorage.removeItem('idCat');
     localStorage.removeItem('liked');
    setLoggedIn(false);
    setUser(null);
    navigate('/');
  };

  const handleEditProfile = () => {
    // Lógica para editar perfil
    navigate('/MyProfile');
    console.log('Editar perfil');
  };
   
  const handleRegister = (e) => {
    e.preventDefault();
    //llamar al servicio de login
  
    setErrors({});
    const errors_re = {};
    if (!email.trim()) {
      errors_re.email = 'Please enter your email';       
    } else if (!isValidEmail(email)) {
      errors_re.email = 'Please enter a valid email';       
    }
    if (!password.trim()) errors_re.password = 'Please enter your password'
    if (!full_name.trim()) errors_re.full_name = 'Please enter your full name'
 
    if (Object.keys(errors_re).length === 0) {
        fetch(`${API_BASE_URL}/register`, {
          method: 'POST',
          body: JSON.stringify({ full_name: full_name, email: email, password: password, origin:'mipick' }),
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
            setErrors({});
            setName('');
            setEmail('');
            setPassword('');             
            setShowModal(false);
               if (data.data.token) {             
                 setLoggedIn(true); 
                 setUser({ name: data.data.user.full_name,  email: data.data.user.email,token:data.data.token});
                 localStorage.setItem('user', JSON.stringify({ name: data.data.user.full_name, photo: require('../img/user.jpg'), email: data.data.user.email,token:data.data.token}));
                 localStorage.setItem('photo', JSON.stringify({ photo: `${API_BASE_URL}/see_photo?img=${data.data.user.photo}`}));
               
                }  
           }
        })
        .catch(error => {
          // Manejar cualquier error de la solicitud           
          toast.error("An error has occurred");
          console.error('Error:', error);
        });
    } else {
      // Form is invalid, update the state with the errors
      setErrors_re(errors_re);
    }
  };
   
  const [email_forgot, setEmailForgot] = useState('');
  const handleForgotPassword = (e) => {
    e.preventDefault(); 
    setErrors({});
    const errors_re = {};
    if (!email_forgot.trim()) {
      errors_re.email_forgot = 'Please enter your email';       
    } else if (!isValidEmail(email_forgot)) {
      errors_re.email_forgot = 'Please enter a valid email';       
    }
    if (Object.keys(errors_re).length === 0) {
      fetch(`${API_BASE_URL}/link_password`, {
        method: 'POST',
        body: JSON.stringify({ email: email_forgot }),
        headers: {
          'Content-Type': 'application/json'      
        }
      })
      .then(response => response.json())
      .then(data => {  
        if(data.error){        
            toast.error(data.msg);
        } else {     
          toast.success(data.msg, {
            position: toast.POSITION.TOP_RIGHT
        });
          setErrors_re({});
          setEmailForgot(''); 
          setShowModal(false);
        //   navigate('/');      
         }
      }).catch(() => {
        // Manejar cualquier error de la solicitud           
        toast.error("An error has occurred"); 
      });
  } else {
      // Form is invalid, update the state with the errors
      setErrors_re(errors_re);
    }
  }

  const [full_name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
    
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return emailRegex.test(email);
  };

  /*Facebook*/ 

  const responseFacebook = (response) => {     
    if(response.error) {
      setLoggedIn(false); 
    } else  {
      if(response.accessToken ){
      setLoggedIn(true);
      
      setUser({ facebook:true, name: response.name, 
        photo: response.picture.data.url , email: response.email,token:response.accessToken});                 
      localStorage.setItem('user', JSON.stringify({ name: response.name,  email: response.email,token:response.accessToken,nick:response.graphDomain}));
      localStorage.setItem('photo', JSON.stringify({ photo:response.picture.data.url}));
     
      fetch(`${API_BASE_URL}/register`,   {
        method: 'POST', 
        body: JSON.stringify({ full_name: response.name, email:  response.email,password:'qwerty',origin:response.graphDomain }),
        headers: {
          'Content-Type': 'application/json'      
        }  
      })  
      .then(response => {            
        if (response.status===201 || response.status===401){ 
          sleep(2000);
          window.location.reload()   
        }
      }) 
    
.catch(() => {
  // Manejar cualquier error de la solicitud           
  toast.error("An error has occurred upload");     
});
}
}
 
  }

  
  /*Google*/
  
  const responseGoogle = (response) => {    
    var decoded = jwt_decode(response);
    if (decoded.email) {
     setLoggedIn(true);
     
     setUser({ google:true, name: decoded.name, 
       photo:decoded.picture , email: decoded.email,token:response});                 
     localStorage.setItem('user', JSON.stringify({ name: decoded.name,  email: decoded.email,token:response,nick:decoded.given_name}));
     localStorage.setItem('photo', JSON.stringify({ photo: decoded.picture}));
    
     fetch(`${API_BASE_URL}/register`,   {
       method: 'POST', 
       body: JSON.stringify({ full_name: decoded.name, email:  decoded.email,password:'qwerty',origin:'google' }),
       headers: {
         'Content-Type': 'application/json'      
       }  
     })  
     .then(response => {            
       if (response.status===201 || response.status===401){ 
         sleep(2000);
         window.location.reload()   
       }
     }) 
   
.catch(() => {
 // Manejar cualquier error de la solicitud           
 toast.error("An error has occurred upload");     
});
     
   } else {
     setLoggedIn(false); 
   } 
 }
  return (
    <div>
      <nav className='text-right'>
        <ul>
          <li>
            {loggedIn ? (
              // Mostrar nombre y foto del usuario si ha iniciado sesión
              <div className="user-profile">                       
                <div className="d-inline-block dropdown">
                    <button type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" className="dropdown-toggle"> 
                        <span className='text-white mr-4 font-family-SpaceGrotesk-Bold'>{user.name}</span>              
                         <img src={user.photo} alt="User" /> 
                    </button>
                    <div tabIndex={-1} role="menu" aria-hidden="true" className="dropdown-menu dropdown-menu-right" x-placement="bottom-end">
                        <ul className="nav flex-column">
                        <li className="nav-item">
                            <a className="dropdown-item" href="Javascript:void(0)">{user.email}</a>
                        </li>
                        <li className="nav-item">
                            <a className="dropdown-item" href="Javascript:void(0)" onClick={handleEditProfile}>My profile</a>
                        </li>
                        <li className="nav-item">
                            <a className="dropdown-item" href="Javascript:void(0)" onClick={handleLogout}><i className="far fa-sign-out"></i> Log out</a>
                        </li>
                        </ul>
                    </div>
                </div>
              </div>
                
            ) : (
              // Mostrar botón de inicio de sesión si no ha iniciado sesión
              <button data-toggle="modal" data-target="#ModaLogin"  onClick={handleButtonClick}  className='btn-login font-family-SpaceGrotesk-Bold'>Sign In / Sign up</button>
            )}
          </li>
        </ul>
      </nav>

      {showModal && (  <div className="modal fade" id="ModaLogin" >
        <div className="modal-dialog modal-md">
          <div className="modal-content">        
            <div className="modal-body p-0">
            {mostrarCuadro1 && (
                <div className="cuadro">
                  <div className='box-cuadro-modal'>
                    <div className='row'>
                        <div className='col-md-12 position-relative'>
                            <h3 className='font-family-SpaceGrotesk-Bold text-white'>Sign in to your account</h3>
                            <button type="button" className="close cerrar-modal" data-dismiss="modal">&times;</button>
                        </div>
                        <div className='col-md-12'>
                            <p className='font-family-SpaceGrotesk-Medium'>
                                Sign in to your account to save, create and edit your picks
                            </p>
                             <ToastContainer position="top-center" autoClose={2000} closeOnClick theme="dark"/>                         
                        </div>
                    </div>
                    <form onSubmit={handleLogin}>
                        {/* Campos de inicio de sesión */}                       
                        <div className="form-group">
                       
                            <label >Email</label>
                            <input type="email"  
                             className={`form-control ${errors.email ? "is-invalid" : ""}`} placeholder="Email Address" id="email" name="email" value={email}  onChange={(e) => setEmail(e.target.value)}/>
                            <span className='icon far fa-envelope fa-lg'></span>
                            {errors.email &&  <div className="invalid-feedback">{errors.email}</div>}                           
                        </div>
                        <div className="form-group">
                            <label >Contraseña</label>
                            <input type={showPassword ? 'text' : 'password'} id="password"
                              className={`form-control ${errors.password ? "is-invalid" : ""}`} name='password' value={password}  onChange={(e) => setPassword(e.target.value)} placeholder='Password'/>
                              <span className='icon far fa-lock-alt fa-lg'></span>
                            {errors.password &&  <div className="invalid-feedback">{errors.password}</div>} 
                            <button type='button' className='icono' onClick={handleTogglePassword}>
                                {showPassword  ? (
                                    <i className="fas fa-eye-slash"></i>
                                ) : (
                                    <i className="fas fa-eye"></i>
                                )}
                            </button>
                        </div>
                        <div className='form-group'>
                            <button onClick={() => mostrarCuadro('cuadro3')} type='button' className='btn-a font-family-SpaceGrotesk-Regular'>Forgot my password</button>
                        </div>
                        <button type="submit" className="btn btn-login-modal font-family-SpaceGrotesk-Bold">
                          Sign In
                        </button>                        
                    </form>
                    <div className='row'>
                        <div className='col-md-12 mt-4 mb-3 text-center'>
                            <h4 className='text-gris-claro title-or d-inline-block'>O R</h4>
                        </div>
                  
                          <GoogleOAuthProvider clientId="951089599558-ss3is472v1vb57vd3e9gmqt5aeq6ag89.apps.googleusercontent.com">
                          <GoogleLogin                      
                          text='signin_with'  
                          locale="en"
                            onSuccess={credentialResponse => {
                              responseGoogle(credentialResponse.credential)
                        
                            }}
                            onError={() => {
                              console.log('Login Failed');
                            }}
                          />;
                            
                            </GoogleOAuthProvider>;
                        
                   
                       {/*  {!loggedIn &&
                        <FacebookLogin
                          appId="172576561281270"
                          autoLoad={false}
                          fields="name,email,picture"                    
                          callback={responseFacebook}
                          textButton=" Sign In with Facebook"                       
                          icon="fa-facebook-square mr-2"
                          cssClass="btn-redes font-family-SpaceGrotesk-Bold" />
                       
                      } */}
                     
                    </div>
                    </div>
                    <div className='cuadro-footer-modal font-family-SpaceGrotesk-Light'>
                      Don’t Have An Account? 
                      <button onClick={() => mostrarCuadro('cuadro2')} className='font-family-SpaceGrotesk-Bold'>Sign Up</button>   
                    </div>                 
                </div>
            )}

            {mostrarCuadro2 && (
                <div className="cuadro">
                  <div className='box-cuadro-modal'>
                    <div className='row'>
                        <div className='col-md-12 position-relative'>
                          <h3 className='font-family-SpaceGrotesk-Bold text-white'>
                            <button onClick={() => mostrarCuadro('cuadro1')} className='btn-back'><i className="far fa-arrow-left"></i></button>
                              Get your free account
                          </h3>
                            <button type="button" className="close cerrar-modal" data-dismiss="modal">&times;</button>
                        </div>
                        <div className='col-md-12'>
                            <p className='text-gray font-family-SpaceGrotesk-Medium'>Create a new account to save, create and edit your picks</p>
                            <ToastContainer position="top-center" autoClose={2000} closeOnClick theme="dark"/>  
                        </div>
                    </div>
                      <form className='mt-2' onSubmit={handleRegister}>
                        {/* Campos de registro */}
                        <div className="form-group">
                          <label>Nombre completo</label>
                          <input type="text"  placeholder='Complete name'  
                          className={`form-control ${errors_re.full_name ? "is-invalid" : ""}`}  id="full_name" name="full_name" value={full_name}  onChange={(e) => setName(e.target.value)} />
                          <span className='icon far fa-user fa-lg'></span>
                          {errors_re.full_name &&  <div className="invalid-feedback">{errors_re.full_name}</div>} 
                        </div>
                        <div className="form-group">
                          <label>Email</label>
                          <input type="email" placeholder='Email Address'
                              className={`form-control ${errors_re.email ? "is-invalid" : ""}`}  id="email" name="email" value={email}  onChange={(e) => setEmail(e.target.value)} />
                          <span className='icon far fa-envelope fa-lg'></span>
                          {errors_re.email &&  <div className="invalid-feedback">{errors_re.email}</div>} 
                        </div>
                        <div className="form-group">
                            <label >Contraseña</label>
                            <input type={showPassword ? 'text' : 'password'} id="password" name='password'
                              className={`form-control ${errors_re.password ? "is-invalid" : ""}`}   onChange={(e) => setPassword(e.target.value)} value={password} placeholder='Password'/>
                            <span className='icon far fa-lock-alt fa-lg'></span>
                            {errors_re.password &&  <div className="invalid-feedback">{errors_re.password}</div>} 
                            <button type='button' className='icono' onClick={handleTogglePassword}>
                                {showPassword ? (
                                    <i className="fas fa-eye-slash"></i>
                                ) : (
                                    <i className="fas fa-eye"></i>
                                )}
                            </button>
                        </div>
                        <button type="submit" className="btn btn-login-modal font-family-SpaceGrotesk-Bold" >Sign Up</button>
                      </form> 
                      <div className='row'>
                        <div className='col-md-12 mt-4 mb-3 text-center'>
                            <h4 className='text-gris-claro title-or d-inline-block'>O R</h4>
                        </div>
               
                      <GoogleOAuthProvider clientId="951089599558-ss3is472v1vb57vd3e9gmqt5aeq6ag89.apps.googleusercontent.com">
                        <GoogleLogin                          
                          text='signup_with'  
                          locale="en"
                          onSuccess={credentialResponse => {
                            responseGoogle(credentialResponse.credential)
                      
                          }}
                          onError={() => {
                            console.log('Login Failed');
                          }}
                        />;
                          
                          </GoogleOAuthProvider>;
                    
                  {/*         {!loggedIn &&
                        <FacebookLogin
                          appId="172576561281270"
                          autoLoad={false}
                          fields="name,email,picture"                    
                          callback={responseFacebook}
                          textButton=" Continue with Facebook"                       
                          icon="fa-facebook-square mr-2"
                          cssClass="btn-redes font-family-SpaceGrotesk-Bold" />  
                       
                      } */}
                   
                    </div> 
                  </div>     
                  <div className='cuadro-footer-modal font-family-SpaceGrotesk-Light'>
                      Already Have An Account, 
                      <button onClick={() => mostrarCuadro('cuadro1')} className='font-family-SpaceGrotesk-Bold'>Sign In</button>   
                  </div>
                </div>
            )}

            {mostrarCuadro3 && (
                <div className="cuadro">
                  <div className='box-cuadro-modal'>
                    <div className='row'>
                      <div className='col-md-12 position-relative'>
                          <h3 className='font-family-SpaceGrotesk-Bold text-white'>
                            <button onClick={() => mostrarCuadro('cuadro1')} className='btn-back'>
                              <i className="far fa-arrow-left"></i>
                            </button>
                            Forgot my password
                          </h3>
                            <button type="button" className="close cerrar-modal" data-dismiss="modal">&times;</button>
                      </div>
                      <div className='col-md-12'>
                        <p className='font-family-SpaceGrotesk-Medium'>
                          Enter your email address and we will send you a link to create a new password.
                        </p>
                        <ToastContainer position="top-right"  autoClose={4000} closeOnClick theme="dark"/>    
                      </div>
                      <div className='col-md-12'>
                        <form className='mt-4' onSubmit={handleForgotPassword}>
                          <div className="form-group">
                              <label>Email</label>                            
                              <input type="email" placeholder='Email Address'
                              className={`form-control ${errors_re.email_forgot ? "is-invalid" : ""}`}  id="email_forgot" name="email_forgot" value={email_forgot}  onChange={(e) => setEmailForgot(e.target.value)} />
                          <span className='icon far fa-envelope fa-lg'></span>
                          {errors_re.email_forgot &&  <div className="invalid-feedback">{errors_re.email_forgot}</div>} 
                          </div>
                          <button type="submit" className="btn btn-login-modal font-family-SpaceGrotesk-Bold mt-4">Send</button>
                        </form>
                      </div>
                    </div>
                  </div>                
                </div>
            )}
            
            </div>
          </div>
        </div>
      </div>
         )}
    </div>
  );
};

export default LoginStatus;