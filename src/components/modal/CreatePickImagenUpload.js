import React, { useState,useEffect,useRef  } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import sleep from '@react-corekit/sleep';

const CreatePickImagenUpload = (props) => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const fileInputRef = useRef(null);
  const fileInputRef2 = useRef(null);
  const [email, setEmail] = useState('');
  const [photo1, setPhoto1] = useState(null);
  const [photo2, setPhoto2] = useState(null);

  useEffect(() => { 
   const storedUser = localStorage.getItem('user'); 
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);   
      setEmail(parsedUser.email)
    } 
  }, []);

  const handleImageChange1 = (e) => {
    console.log("la imagen1",e.target.files[0])
    const file = e.target.files[0];
    setPhoto1(file)
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage1(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
 
  };

  const handleImageChange2 = (e) => {
     console.log("la imagen2",e.target.files[0])
    const file = e.target.files[0];
    setPhoto2(file)
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage2(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
 
  };

  const handleIconClick  = () => {
    fileInputRef.current.click();
  };

  const handleIconClick2 = () => {
    fileInputRef2.current.click();
  };

  const handleFileSubmit = () => {
  
    var formdata = new FormData();
    formdata.append("id_category", props.topics);
    formdata.append("name_choice1", text1);
    formdata.append("name_choice2", text2); 
    formdata.append("photo1", photo1);
    formdata.append("photo2", photo2); 
    formdata.append("email", email);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };
    console.log("formulariosssssssssss",formdata)

        if(image1 && image2){
        fetch(`http://localhost:3100/register_picks`, requestOptions) 
              .then(response => {            
                if (response.status===201){                   
                    toast.success('Created picks successfully', {
                      position: toast.POSITION.TOP_RIGHT
                  });
                  sleep(4000);
                  window.location.reload()
                } 
              })  
             
        .catch(() => {
          // Manejar cualquier error de la solicitud           
          toast.error("An error has occurred upload");     
        });
        }
  };


  return (
    <><div className='row'>
      {/* Primer cuadro */} 
      <ToastContainer position="top-right"  autoClose={3000} closeOnClick theme="dark"/>    
      <div className='col-md-6 mb-3'>
        <div className='boxUpload'>
          <input
            type="file"
            id="fileInput1"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleImageChange1} />
          <label style={{ display: 'block' }} className='uploadPick'>
            {image1 ? (
              <img src={image1} onClick={handleIconClick} alt="Pick" />
            ) : (
              <span><i class="fas fa-plus" onClick={handleIconClick}></i></span>
            )}
          </label>
          <input className='font-family-SpaceGrotesk-Bold'
            type="text"
            value={text1}
            onChange={(e) => setText1(e.target.value)}
            placeholder="Type your choice..." />
        </div>
      </div>

      {/* Segundo cuadro */}
      <div className='col-md-6 mb-3'>
        <div className='boxUpload'>
          <input
            type="file"
            id="fileInput2"
            ref={fileInputRef2}
            style={{ display: 'none' }}
            onChange={handleImageChange2} />
          <label style={{ display: 'block' }} className='uploadPick'>
            {image2 ? (
              <img src={image2} onClick={handleIconClick2} alt="Pick" />
            ) : (
              <span><i class="fas fa-plus" onClick={handleIconClick2}></i></span>
            )}
          </label>
          <input className='font-family-SpaceGrotesk-Bold'
            type="text"
            value={text2}
            onChange={(e) => setText2(e.target.value)}
            placeholder="Type your choice..." />
        </div>
      </div>
    </div><div>
        <div className='col-md-12'>
          <form>
            <div className='form-group'>
              <button type="button" onClick={handleFileSubmit}  className="btn btn-login-modal font-family-SpaceGrotesk-Bold">
                Publish My Picks
              </button>
            </div>
          </form>
        </div>
      </div></>
    
  );
};

export default CreatePickImagenUpload;
