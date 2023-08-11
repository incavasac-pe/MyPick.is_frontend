import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false); // Estado de inicio de sesión
  const [user, setUser] = useState(null); // Información del usuario
  const navigate = useNavigate(); // Hook de navegación

  const handleLogin = () => {
    // Lógica para iniciar sesión
    navigate('/MyProfile'); // Redirigir al usuario a la página de perfil
    setLoggedIn(true);
    setUser({ name: 'Cary Wong', photo: require('../img/user.jpg'), email: 'example@gmail.com' });
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
    setLoggedIn(false);
    setUser(null);
    navigate('/');
  };

  const handleEditProfile = () => {
    // Lógica para editar perfil
    console.log('Editar perfil');
  };

  const handleRegister = () => {
    // Lógica para el registro de usuarios
    // console.log('Registro de usuario');
    navigate('/MyProfile'); // Redirigir al usuario a la página de perfil
  };


  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
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
                            <a className="dropdown-item" href="Javascript:void(0)" onClick={handleLogout}><i class="far fa-sign-out"></i> Log out</a>
                        </li>
                        </ul>
                    </div>
                </div>

              </div>
                
            ) : (
              // Mostrar botón de inicio de sesión si no ha iniciado sesión
              <button data-toggle="modal" data-target="#ModaLogin" className='btn-login font-family-SpaceGrotesk-Bold'>Sign In / Sign up</button>
            )}
          </li>
        </ul>
      </nav>

      <div class="modal fade" id="ModaLogin">
        <div class="modal-dialog modal-md">
          <div class="modal-content">        
            <div className="modal-body p-0">
            {mostrarCuadro1 && (
                <div className="cuadro">
                  <div className='box-cuadro-modal'>
                    <div className='row'>
                        <div className='col-md-12 position-relative'>
                            <h3 className='font-family-SpaceGrotesk-Bold text-white'>Sign in to your account</h3>
                            <button type="button" class="close cerrar-modal" data-dismiss="modal">&times;</button>
                        </div>
                        <div className='col-md-12'>
                            <p className='font-family-SpaceGrotesk-Medium'>
                                Sign in to your account to save, create and edit your picks
                            </p>
                        </div>
                    </div>
                    <form>
                        {/* Campos de inicio de sesión */}                       
                        <div className="form-group">
                            <label for="email">Email</label>
                            <input type="email" className="form-control" placeholder="Email Address" id="email" name="email"/>
                            <span className='icon far fa-envelope fa-lg'></span>
                        </div>
                        <div className="form-group">
                            <label for="password">Contraseña</label>
                            <input type={showPassword ? 'text' : 'password'} id="password" name='password' value={password} onChange={handlePasswordChange} placeholder='Password'/>
                            <span className='icon far fa-lock-alt fa-lg'></span>
                            <button type='button' className='icono' onClick={handleTogglePassword}>
                                {showPassword ? (
                                    <i className="fas fa-eye-slash"></i>
                                ) : (
                                    <i className="fas fa-eye"></i>
                                )}
                            </button>
                        </div>
                        <div className='form-group'>
                            <button onClick={() => mostrarCuadro('cuadro3')} type='button' className='btn-a font-family-SpaceGrotesk-Regular'>Forgot my password</button>
                        </div>
                        <button type="button" className="btn btn-login-modal font-family-SpaceGrotesk-Bold" onClick={handleLogin}>
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
                              <i class="fab fa-facebook-square mr-2"></i> Sign In with Facebook
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
                            <button onClick={() => mostrarCuadro('cuadro1')} className='btn-back'><i class="far fa-arrow-left"></i></button>
                              Get your free account
                          </h3>
                            <button type="button" class="close cerrar-modal" data-dismiss="modal">&times;</button>
                        </div>
                        <div className='col-md-12'>
                            <p className='text-gray font-family-SpaceGrotesk-Medium'>Create a new account to save, create and edit your picks</p>
                        </div>
                    </div>
                      <form className='mt-2'>
                        {/* Campos de registro */}
                        <div className="form-group">
                          <label>Nombre completo</label>
                          <input type="text" className="form-control" placeholder='Complete name' />
                          <span className='icon far fa-user fa-lg'></span>
                        </div>
                        <div className="form-group">
                          <label>Email</label>
                          <input type="email" className="form-control" placeholder='Email Address' />
                          <span className='icon far fa-envelope fa-lg'></span>
                        </div>
                        <div className="form-group">
                            <label for="password">Contraseña</label>
                            <input type={showPassword ? 'text' : 'password'} id="password" name='password' value={password} onChange={handlePasswordChange} placeholder='Password'/>
                            <span className='icon far fa-lock-alt fa-lg'></span>
                            <button type='button' className='icono' onClick={handleTogglePassword}>
                                {showPassword ? (
                                    <i className="fas fa-eye-slash"></i>
                                ) : (
                                    <i className="fas fa-eye"></i>
                                )}
                            </button>
                        </div>
                        <button type="button" className="btn btn-login-modal font-family-SpaceGrotesk-Bold" onClick={handleRegister}>Sign Up</button>
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
                              <i class="fab fa-facebook-square mr-2"></i> Continue with Facebook
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
                              <i class="far fa-arrow-left"></i>
                            </button>
                            Forgot my password
                          </h3>
                            <button type="button" class="close cerrar-modal" data-dismiss="modal">&times;</button>
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
    </div>
  );
};

export default LoginStatus;