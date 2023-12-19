import React, { useState,useEffect,useRef  } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import {RotatingLines} from 'react-loader-spinner';
const API_BASE_URL = process.env.REACT_APP_URL_API

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
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [url1, setUrl1] = useState('www');
  const [url2, setUrl2] = useState('www');


  const [product1, setProduct1] = useState(null);
  const [product2, setProduct2] = useState(null);
  useEffect(() => { 
   const storedUser = localStorage.getItem('user'); 
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);   
      setEmail(parsedUser.email)
    }   
   
  }, []);

  
  const fetchDataChoice =  () => {
    if (searchTerm.length > 5 && searchTerm !=undefined ) {
      setIsLoading(true); 
   const url = `${API_BASE_URL}/list_products_api_externa_new?search=${searchTerm}`;
  
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'      
    } 
  })
    .then(response => response.json())
    .then(data => {
      if (data.data) {        
        const resp = data?.data       
        setProduct1(resp)
        setResults(resp); 
        setNotFound(false); 
        setIsLoading(false);
    }
    })
    .catch(error => {
      // Handle any errors that occurred during the fetch request
      console.error(error);
      setProduct1(null) 
      setIsLoading(false);
    });
  }}

  const fetchDataChoice2 =  () => {
    if (searchTerm2.length > 5 && searchTerm2 !=undefined ) {
      setIsLoading2(true); 
   const url = `${API_BASE_URL}/list_products_api_externa_new?search=${searchTerm2}`;
  
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'      
    } 
  })
    .then(response => response.json())
    .then(data => {
      if (data.data) {        
        const resp = data?.data       
        setProduct2(resp)
        setResults2(resp); 
        setNotFound2(false);  
        setIsLoading2(false); 
         }
    })
    .catch(error => {
      // Handle any errors that occurred during the fetch request
      console.error(error);
      setProduct2(null)    
      setIsLoading2(false);    
    });
  }}
  const getImageName = (url,origin) => {
   // const urlParts = url.split('/');
   // const imageName = urlParts[urlParts.length - 1];
    const imageName = url;
    if(origin== '1'){
    setText1(imageName)
    }else{
      setText2(imageName)
    }
  };

const ImageDownloader = (imageUrl,origen) => {     
fetch(imageUrl)
.then(response => response.blob())
.then(blob => { 
  if(origen=='1'){
  setPhoto1(blob)
  const src = URL.createObjectURL(blob);
  setImage1(src);
}else{
  setPhoto2(blob)
  const src = URL.createObjectURL(blob);
  setImage2(src);
  }
})
.catch(error => {
  console.error('Error al descargar la imagen:', error);
});
}
  const handleImageChange1 = (e) => {
    setImage1(null);
    setPhoto1(null)
    const file = e.target.files[0];
    setPhoto1(file)
    setText1(file.name)
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage1(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
 
  };

  const handleImageChange2 = (e) => {
    setImage2(null);
    setPhoto2(null)
    const file = e.target.files[0];
    setPhoto2(file)
    setText2(file.name)
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
    formdata.append("name_choice1", searchTerm);
    formdata.append("name_choice2", searchTerm2); 
 
   formdata.append('photo2', photo2, text2);
    formdata.append("email", email);
    formdata.append('photo1', photo1, text1);

    formdata.append("ulr_choice1", url1);
    formdata.append("ulr_choice2", url2); 
    
    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    }; 

        if(image1 && image2){
        fetch(`${API_BASE_URL}/register_picks`, requestOptions)  
                .then(response => response.json())
                  .then(data => { 
                    if(!data.error && data.data){ 
                    const id_pick_create = data.data;
                    localStorage.setItem("id_pick_create",id_pick_create )              
                      toast.success('Created picks successfully', {
                        position: toast.POSITION.TOP_RIGHT,autoClose:3000
                    }); 
                    
                    setTimeout(() => {     
                      window.location.reload()           
                    },2000); 
                }   
            })  
             
        .catch(() => {
          // Manejar cualquier error de la solicitud           
          toast.error("An error has occurred upload");     
        });
        }
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [notFound, setNotFound] = useState(false);

  const [searchTerm2, setSearchTerm2] = useState('');
  const [results2, setResults2] = useState([]);
  const [notFound2, setNotFound2] = useState(false);
 
  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
 
   const filteredResults = results.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    ); 
 
const imagenProducto = filteredResults[0]?.imageUrl;
    if (filteredResults.length > 0) { 
      ImageDownloader(imagenProducto,'1')
      getImageName(imagenProducto,'1')
      setUrl1(filteredResults[0]?.detailPageURL)
    } else {
       setNotFound(true);
    }  
  };
 
  const handleSearch2 = (e) => {
    const searchTerm2 = e.target.value;
    setSearchTerm2(searchTerm2); 
    const filteredResults2 = results2.filter((item) =>
      item.title.toLowerCase().includes(searchTerm2.toLowerCase())
    ); 
    const imagenProducto2 = filteredResults2[0]?.imageUrl; 
    if (filteredResults2.length > 0) { 
      ImageDownloader(imagenProducto2,'2')
      getImageName(imagenProducto2,'2')
      setUrl2(filteredResults2[0]?.detailPageURL)
    } else {
      setNotFound2(true);
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
          {!isLoading && (
          <input className='font-family-SpaceGrotesk-Bold'         
            type="text"
            value={searchTerm} 
            onBlur={fetchDataChoice}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Type your choice..." />  )}
           {isLoading && (
                <div className="spinner">
                <RotatingLines
                  strokeColor="grey"
                  strokeWidth="3"
                  animationDuration="0.75"
                  width="40"
                  visible={true}
                />
                          </div>
                  )}
              
            {!notFound && searchTerm && !isLoading && ( 
           
              <select   className="form-control" onChange={handleSearch}> 
                  {results.map((item) => (
              <option data-tokens="ketchup mustard" value={item.title}>{item.title}</option>
              ))}
            </select> 
            )}
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
          {!isLoading2 && (
             <input className='font-family-SpaceGrotesk-Bold'
            type="text"
            value={searchTerm2}
            onBlur={fetchDataChoice2}
            onChange={(e) => setSearchTerm2(e.target.value)}
            placeholder="Type your choice..." />
            )}

{isLoading2 && (
                <div className="spinner">
                <RotatingLines
                  strokeColor="grey"
                  strokeWidth="3"
                  animationDuration="0.75"
                  width="40"
                  visible={true}
                />
                          </div>
                  )}

              {!notFound2 && searchTerm2 && !isLoading2 && ( 
           
           <select  className="form-control"   onChange={handleSearch2}> 
               {results2.map((item) => (
          <option data-tokens="ketchup mustard" value={item.title}>{item.title}</option>
           ))}
         </select> 
         )}
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
