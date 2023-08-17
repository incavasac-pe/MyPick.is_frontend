import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginStatus = () => {
  
  const [loggedIn, setLoggedIn] = useState(false); // Estado de inicio de sesión
  const [user, setUser] = useState(null); // Información del usuario
  const [errors, setErrors] = useState({});
  const [errors_re, setErrors_re] = useState({});
  const [showModal, setShowModal] = useState(false);
  
  const navigate = useNavigate(); // Hook de navegación

  const handleLogin = (e) => {
    e.preventDefault();
    //llamar al servicio de login
    console.log('Email:', email);
    console.log('Password:', password);
    setErrors({});
    const errors = {};
    if (!email.trim()) {
      errors.email = 'Please enter your email';       
    } else if (!isValidEmail(email)) {
      errors.email = 'Please enter a valid email';       
    }
    if (!password.trim()) errors.password = 'Please enter your password'

    if (Object.keys(errors).length === 0) {
        fetch('http://localhost:3100/login', {
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
                 setUser({ name: data.data.user.full_name, photo: require('../img/user.jpg'), email: data.data.user.email,token:data.data.token});
                 localStorage.setItem('user', JSON.stringify({ name: data.data.user.full_name, photo: require('../img/user.jpg'), email: data.data.user.email,token:data.data.token}));
                 navigate('/MyProfile'); // Redirigir al usuario a la página de perfil
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
    setLoggedIn(false);
    setUser(null);
    navigate('/');
  };

  const handleEditProfile = () => {
    // Lógica para editar perfil
    console.log('Editar perfil');
  };

  const handleRegisterold = () => {
    // Lógica para el registro de usuarios
    // console.log('Registro de usuario');
    navigate('/MyProfile'); // Redirigir al usuario a la página de perfil
  };
  
  const handleRegister = (e) => {
    e.preventDefault();
    //llamar al servicio de login
    console.log('Nombres Registro:', full_name);
    console.log('Password:', password);
    console.log('Email:', email);
  
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
        fetch('http://localhost:3100/register', {
          method: 'POST',
          body: JSON.stringify({ full_name: full_name, email: email, password: password }),
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
                 setUser({ name: data.data.user.full_name, photo: require('../img/user.jpg'), email: data.data.user.email,token:data.data.token});
                 localStorage.setItem('user', JSON.stringify({ name: data.data.user.full_name, photo: require('../img/user.jpg'), email: data.data.user.email,token:data.data.token}));
                //navigate('/MyProfile'); // Redirigir al usuario a la página de perfil
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
                        <div className='col-md-6'>
                            <button className='btn-redes font-family-SpaceGrotesk-Bold' type='button'>
                              <img src={require('../img/gmail.png')} alt='gmail' className='mr-2' />
                              Sign In with Google
                            </button>
                        </div>
                        <div className='col-md-6'>
                            <button className='btn-redes font-family-SpaceGrotesk-Bold' type='button'>
                              <i className="fab fa-facebook-square mr-2"></i> Sign In with Facebook
                            </button>
                        </div>
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
                        <div className='col-md-6'>
                            <button className='btn-redes font-family-SpaceGrotesk-Bold' type='button'>
                              <img src={require('../img/gmail.png')} alt='gmail' className='mr-2' />
                              Continue with Google
                            </button>
                        </div>
                        <div className='col-md-6'>
                            <button className='btn-redes font-family-SpaceGrotesk-Bold' type='button'>
                              <i className="fab fa-facebook-square mr-2"></i> Continue with Facebook
                            </button>
                        </div>
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
                      </div>
                      <div className='col-md-12'>
                        <form className='mt-4'>
                          <div className="form-group">
                              <label>Email</label>
                              <input type="email" className="form-control" placeholder='Email Address' />
                              <span className='icon far fa-envelope fa-lg'></span>
                          </div>
                          <button type="button" className="btn btn-login-modal font-family-SpaceGrotesk-Bold mt-4">Send</button>
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