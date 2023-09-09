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
    if(searchTerm){
      fetchDataChoice();
    }
   
  }, []);

  
  const fetchDataChoice =  () => {
    if (searchTerm.length > 5 && searchTerm !=undefined) {
    console.log("se busca el producto en amazon",searchTerm)
    const apiKey = 'YXV0aDB8NjRmYTJlMWFlZGExYWI1MDBmODA0NDU1fGZhM2E0YTIxODE';
  const url = `https://api.app.outscraper.com/amazon/products?query=https://www.amazon.com/s?k=${searchTerm}&limit=1&async=false`;
  
  fetch(url, {
    method: 'GET',
    headers: {
      'X-API-KEY': apiKey
    }
  })
    .then(response => response.json())
    .then(data => {
      if (data.data) {  
      const nombreProducto = data.data[0][0].name;
      const precioProducto = data.data[0][0].price;
      const imagenProducto = data.data[0][0].image_1;
      console.log("el nombre del productos es",nombreProducto);
      console.log("el precio del productos es",precioProducto);
      console.log("la imagen  del productos es",imagenProducto);
      // Handle the response data here
      console.log(data.data[0][0]);
      if(imagenProducto!= undefined && nombreProducto!=undefined){
        const truncatedString = nombreProducto.substring(0, 30)
        setSearchTerm(truncatedString)
        ImageDownloader(imagenProducto)
        getImageName(imagenProducto)
      }
    }
    })
    .catch(error => {
      // Handle any errors that occurred during the fetch request
      console.error(error);
    });
  }}

  const getImageName = (url) => {
    const urlParts = url.split('/');
    const imageName = urlParts[urlParts.length - 1];
    setText1(imageName)
  };

  const ImageDownloader = (imageUrl) => {
     
fetch(imageUrl)
.then(response => response.blob())
.then(blob => { 
  setPhoto1(blob)
  const src = URL.createObjectURL(blob);
  setImage1(src);
})
.catch(error => {
  console.error('Error al descargar la imagen:', error);
});
}
  const handleImageChange1 = (e) => {
    setImage1(null);
    setPhoto1(null)
    console.log("la imagen1",e.target.files[0])
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
    formdata.append("name_choice1", searchTerm);
    formdata.append("name_choice2", searchTerm2); 
   // formdata.append("photo1", photo1);
    formdata.append("photo2", photo2); 
    formdata.append("email", email);
    formdata.append('photo1', photo1, text1);
    
    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    }; 

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

  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [notFound, setNotFound] = useState(false);

  const [searchTerm2, setSearchTerm2] = useState('');
  const [results2, setResults2] = useState([]);
  const [notFound2, setNotFound2] = useState(false);
  const data = [
    {id:"1", name:"Ron"},
    {id:"2", name:"Agua"},
    {id:"3", name:"Café"},
    {id:"4", name:"Agua San mateo"},
    {id:"5", name:"Agua San luis"},
  ]
  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    console.log("busca en la api ",searchTerm)
    // Aquí puedes realizar la lógica de búsqueda con los datos que tengas disponibles. 
   // fetchDataChoice(searchTerm)
    // Supongamos que tienes una lista de elementos llamada "data" que contiene objetos con una propiedad "name":
    const filteredResults = data.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filteredResults.length > 0) {
      setResults(filteredResults);
      setNotFound(false);
    } else {
      setResults([]);
      setNotFound(true);
    }
  };
 
  const handleSearch2 = (e) => {
    const searchTerm2 = e.target.value;
    setSearchTerm2(searchTerm2);
    console.log("busca en la api ",searchTerm2)
    // Aquí puedes realizar la lógica de búsqueda con los datos que tengas disponibles. 

    // Supongamos que tienes una lista de elementos llamada "data" que contiene objetos con una propiedad "name":
    const filteredResults = data.filter((item) =>
      item.name.toLowerCase().includes(searchTerm2.toLowerCase())
    );

    if (filteredResults.length > 0) {
      setResults2(filteredResults);
      setNotFound2(false);
    } else {
      setResults2([]);
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
          <input className='font-family-SpaceGrotesk-Bold'
            type="text"
            value={searchTerm}
           onBlur={fetchDataChoice}
            onChange={handleSearch} 
            placeholder="Type your choice..." />
            
            {!notFound && searchTerm && ( 
           
              <select   className="form-control" onChange={handleSearch}> 
                  {results.map((item) => (
              <option data-tokens="ketchup mustard" value={item.name}>{item.name}</option>
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
          <input className='font-family-SpaceGrotesk-Bold'
            type="text"
            value={searchTerm2}
            onChange={handleSearch2} 
            placeholder="Type your choice..." />
              
              {!notFound2 && searchTerm2 && ( 
           
           <select  className="form-control"   onChange={handleSearch2}> 
               {results2.map((item) => (
           <option data-tokens="ketchup mustard" value={item.name}>{item.name}</option>
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
