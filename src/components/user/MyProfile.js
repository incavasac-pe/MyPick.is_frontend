import React, { useState, useEffect} from 'react';
import { useLocation,useNavigate  } from 'react-router-dom';
import PickHistory from './PickHistory';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyProfile = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Hook de navegación
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');  
  const [nick] = useState('');
  const [errors, setErrors] = useState({});
  
  useEffect(() => { 
    const body = document.body; 
    if (location.state && location.state.modalOpen) {
      body.classList.add('modal-open'); 
    } else {
      body.classList.remove('modal-open');    
    }
    removeModalBackdropClass();

    const storedUserPhotonNew = localStorage.getItem('photo');
    if (storedUserPhotonNew) {
      const parsedPhoto = JSON.parse(storedUserPhotonNew);     
      setSelectedFileNew(parsedPhoto.photo)
    }
    
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);     
      setName (parsedUser.name)
      setEmail(parsedUser.email)
    }else{
      navigate('/'); // Redirigir al usuario a la página de home
     }
  }, [location.state]);
 
  const removeModalBackdropClass = () => {
    const modalBackdrop = document.querySelector('.modal-backdrop');
    if (modalBackdrop) {
      modalBackdrop.classList.remove('modal-backdrop','fade', 'show');
    }
  };

  //change password 
  
  const handleSavePassword = (e) => {
    e.preventDefault();
    setIsEditing(false);
  
    //llamar al servicio de change password  
     
    setErrors({});
    const errors = {};
    
    if (!newPassword.trim()) errors.newPassword = 'Please enter your password'
    if (!newPasswordConfir.trim()) errors.newPasswordConfir = 'Please enter your confirm password'
    if(newPassword!== newPasswordConfir) errors.newPasswordConfir = 'Passwords do not match'
    
    if (Object.keys(errors).length === 0) {
        fetch('http://localhost:3100/change_password', {
          method: 'POST',
          body: JSON.stringify({ email: email, new_password: newPassword }),
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
            setPassword(newPassword);                
            toast.success(data.msg, {
              position: toast.POSITION.TOP_RIGHT
          });
           }
        })
        .catch(error => {
          // Manejar cualquier error de la solicitud           
          toast.error("An error has occurred");     
        });
    } else {
      setErrors(errors);  
    }
  };

  //change profile  
  const handleSave  = (e) => {
    e.preventDefault();
 
     setShowChangePassword(false);
    //llamar al servicio de change password 
  
    setErrors({});
    const errors = {};
    
    if (!name.trim()) errors.name = 'Please enter your name'  
  
    if (Object.keys(errors).length === 0) {
        fetch('http://localhost:3100/change_profile', {
          method: 'POST',
          body: JSON.stringify({ email: email, full_name: name }),
          headers: {
            'Content-Type': 'application/json'      
          }
        })
        .then(response => response.json())
        .then(data => { 
          if(data.error){        
             toast.error(data.msg);              
          } else {   
            const storedUser = localStorage.getItem('user');
            if (storedUser) {  
              localStorage.setItem('user', JSON.stringify({ name:name,email:email}));     
            }
                       
            setErrors({});                    
            toast.success(data.msg, {
              position: toast.POSITION.TOP_RIGHT
             });
             window.location.reload()
           }
        })
        .catch(error => {
          // Manejar cualquier error de la solicitud           
          toast.error("An error has occurred");     
        });
    } else { 
      setErrors(errors);
    }
  };
 
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfir, setNewPasswordConfirm] = useState('');

  const [editing, setEditing] = useState(false);
  const [password, setPassword] = useState('password123');
  
  const handleEdit = () => {
    setIsEditing(true);
  }; 
  const [selectedFileNew, setSelectedFileNew] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [defaultImage] = useState('user.jpg');

  const handleFileSelect = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
   
    setSelectedFile(file);
    var formdata = new FormData();
    formdata.append("file", file);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };
        if(file){
        fetch(`http://localhost:3100/change_photo?email=${email}`, requestOptions) 
              .then(response => {            
                if (response.status===200){
                    const storedUserPhoto = localStorage.getItem('photo');
                      if (storedUserPhoto) { 
                        localStorage.setItem('photo', JSON.stringify({ photo: `http://localhost:3100/see_photo?img=${file.name}`}));
                        setSelectedFileNew(`http://localhost:3100/see_photo?img=${file.name}`)
                      }
                    toast.success('Upload photo successfully', {
                      position: toast.POSITION.TOP_RIGHT
                  });
                }
              }) 
              window.location.reload()
        .catch(() => {
          // Manejar cualquier error de la solicitud           
          toast.error("An error has occurred upload");     
        });
        }
  };

  const handleButtonClick = () => {
    document.getElementById('fileInput').click();
  };
 
  const handleEditPassword = () => {
    setEditing(true);
    setShowChangePassword(true);
  };
 
  const handlePasswordCancel = (e) => {
    e.preventDefault();
    // Cancelar la edición de contraseña y restaurar los valores originales
    setIsEditing(false);
    setEditing(false);
    setShowChangePassword(false);
    setNewPassword('');
    setNewPasswordConfirm('');
  };

  return (
    <div className='container contenido'>
      <div className='row'>
        <div className='col-md-12 mb-4'>
          <h1 className='text-center text-white titulo font-family-SpaceGrotesk-Light'>My Profile</h1> 
          <div className='cuadro'></div>                
        </div>
        <div className='col-md-6 mb-4'>
            <div className='box-acordeon'>
              <h2 className="font-family-SpaceGrotesk-SemiBold text-white">
                Personal Information <button onClick={handleEdit} className='btn-editar'><i className="fas fa-pencil"></i> Edit</button>
              </h2>
              <div className='box-editar p-4'>
                {!isEditing ? (
                  <div className='text-white'>
                    <table className='table table-borderless text-white mb-0'>
                    <tbody>
                      <tr>
                        <td className='text-gris-claro font-family-Inter-SemiBold'>Name</td>
                        <td className='font-family-Inter-Medium'>
                          {name} <span className='text-gris-claro'>{nick.toUpperCase()}</span>
                        </td>
                      </tr>
                      <tr>
                        <td className='text-gris-claro font-family-Inter-SemiBold'>Email</td>
                        <td className='font-family-Inter-Medium font-family-Inter-Medium'>
                        {email}
                        </td>
                      </tr>
                      <tr>
                        <td className='text-gris-claro font-family-Inter-SemiBold'>Social Sign Up</td>
                        <td className='font-family-Inter-Medium font-family-Inter-Medium'>
                          <div className='social-sign font-family-SpaceGrotesk-Light'>                            
                            <p className='mb-0'><img src={require('../img/gmail.png')} alt='gmail' /> Sign In with Google</p>
                          </div>
                        </td>
                      </tr>
                      </tbody>
                    </table>          
                  </div>
                ) : (
                  <form>
                    <table className='table table-borderless text-white table-edit mb-0'>  
                    <tbody>
                      <tr>
                        <td className='text-gris-claro font-family-Inter-SemiBold'>
                          <label>Name:</label>
                        </td>
                        <td className='font-family-Inter-Medium'>
                          <input className={`form-control ${errors.name ? "is-invalid" : ""}`} type="text" value={name} onChange={(e) => setName(e.target.value)} />
                          {errors.name &&  <div className="invalid-feedback">{errors.name}</div>}      
                        </td>
                      </tr>
                      <tr>
                        <td className='text-gris-claro font-family-Inter-SemiBold'>
                          <label>Email:</label>
                        </td>
                        <td className='font-family-Inter-Medium'>
                          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled />
                        </td>
                      </tr>
                      <tr>                        
                        <td colSpan={2} align='right'>
                          <button onClick={handlePasswordCancel} className='btn-profile-edit mr-2'>Cancel</button>
                          <button onClick={handleSave} className='btn-profile-edit'>Save</button>
                        </td>
                      </tr>
                      </tbody>
                    </table>
                  </form>                  
                )}
              </div>
          </div>
        </div>
        <div className='col-md-6 mb-4'>
          <div className='box-acordeon'>
            <h2 className="font-family-SpaceGrotesk-SemiBold text-white">
              Profile Picture
            </h2>
            <div className='box-editar p-4'>
              <div className='row'>
                <div className='col-md-8 col-7'>
                  <p className='text-gris-claro'>
                    Upload a picture for your profile. Dimension:<br></br> 1:1. The available formats are: PNG, JPG.
                  </p>
                  <div className='position-relative'>
                    <input type="file" id="fileInput"  accept="image/*" style={{ display: 'none' }} onChange={handleFileSelect} />
                    <button onClick={handleButtonClick} className='btn-profile-edit mb-2'>Upload</button>
                    {selectedFile ? (
                      <p className='text-gris-claro mb-0'>{selectedFile.name}</p>
                    ) : (
                      <p className='text-gris-claro mb-0'>{defaultImage}</p>
                    )}
                  </div>
                </div>
                <div className='align-items-center col-5 col-md-4 d-flex justify-content-center'>
                  <div className='img-profile'>
                    {selectedFileNew ? (
                      <img src={selectedFileNew} alt="Vista previa" />
                    ) : (
                      <img src={defaultImage} alt="Imagen por defecto" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-md-12 mb-4'>
          <div className='box-acordeon'>
            <h2 className="font-family-SpaceGrotesk-SemiBold text-white">
              Password <button onClick={handleEditPassword} className='btn-editar'><i className="fas fa-pencil"></i> Edit</button>
            </h2>
            <ToastContainer position="top-right"  autoClose={2000} closeOnClick theme="dark"/>    
            <div className='box-editar p-4' style={{ minHeight: 'auto' }}>
              <p className='text-gris-claro'>
                  We recommend updating your password periodically to prevent unauthorized access to your account.
              </p>
            {!showChangePassword && ( 
              <div>
                <table className='table table-borderless text-white table-edit mb-0 w-auto'>
                <tbody>
                  <tr>
                    <td className='text-gris-claro'>Password</td>
                    <td className='text-white'>
                      ********
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            )}

            {showChangePassword && (
              <div className='w-100'>
                <form>
                  <div className='row'>
                    <div className='col-md-6'>
                      <table className='table table-borderless text-white table-edit mb-0'>
                      <tbody>
                        <tr>
                          <td className='text-gris-claro'>Previous Password</td>
                          <td className='text-white'>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} disabled/>
                          </td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className='col-md-6'>
                      <table className='table table-borderless text-white table-edit mb-0'>  
                      <tbody>
                        <tr>
                          <td className='text-gris-claro font-family-Inter-SemiBold'>
                            <label>New Password:</label>
                          </td>
                          <td className='font-family-Inter-Medium'>
                            <input className={`form-control ${errors.newPassword ? "is-invalid" : ""}`} type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                            {errors.newPassword &&  <div className="invalid-feedback">{errors.newPassword}</div>}      
                          </td>
                        </tr>
                        <tr>
                          <td className='text-gris-claro font-family-Inter-SemiBold'>
                            <label>Confirm Password:</label>
                          </td>
                          <td className='font-family-Inter-Medium'>
                            <input className={`form-control ${errors.newPasswordConfir ? "is-invalid" : ""}`}  type="password" value={newPasswordConfir} onChange={(e) => setNewPasswordConfirm(e.target.value)} />
                         <div className="invalid-feedback">{errors.newPasswordConfir}</div>   
                          </td>
                        </tr>
                        <tr>                        
                          <td colSpan={2} align='right'>
                            <button onClick={handlePasswordCancel} className='btn-profile-edit mr-2'>Cancel</button>
                            <button onClick={handleSavePassword} className='btn-profile-edit'>Save</button>
                          </td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </form>  
              </div>
            )}
            </div>
          </div>
        </div>
        <div className='col-md-12 mb-4'>
          <div className='box-acordeon'>
            <h2 className="font-family-SpaceGrotesk-SemiBold text-white mb-0">
              Picks History
            </h2>
            <div className='box-editar'>
              <PickHistory />
            </div>
          </div>
        </div>
      </div>      
    </div>
  );
};

export default MyProfile;
