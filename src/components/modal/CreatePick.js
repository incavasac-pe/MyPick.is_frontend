import React, { useState ,useEffect} from 'react';
import CreatePickImagenUpload from './CreatePickImagenUpload';
 
const CreatePick = () => {

  const [showBox1, setShowBox1] = useState(true);
  const [showBox2, setShowBox2] = useState(false);
  const [muestras, setMuestras] = useState([]);
  const [selectedOptionTopic, setSelectedOption] = useState('');
 

  useEffect(() => {
     fetch(`http://localhost:3100/list_category?limit=${100}`, {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json'      
        }  
      })
      .then(response => response.json())
      .then(data => { 
        if(data.error){        
          // toast.error(data.msg);     
        } else {              
            if (data.data) {    
              setMuestras(data.data)             
            }  
        }
      }).catch(error => {
        // Manejar el error en caso de que ocurra
        console.error('Error:', error);
      });    
  }, []); 

  
  const fetchDataChoice = async (search) => {
    console.log("se busca el producto",search)
    const apiKey = 'YXV0aDB8NjRmYTJlMWFlZGExYWI1MDBmODA0NDU1fGZhM2E0YTIxODE';
  const url = `https://api.app.outscraper.com/amazon/products?query=https://www.amazon.com/s?k=${search}&limit=1&async=false`;
  
  fetch(url, {
    method: 'GET',
    headers: {
      'X-API-KEY': apiKey
    }
  })
    .then(response => response.json())
    .then(data => {
      const nombreProducto = data[0][0].name;
      const precioProducto = data[0][0].price;
      const imagenProducto = data[0][0].image_1;
      console.log("el nombre del productos es",nombreProducto);
      console.log("el precio del productos es",precioProducto);
      console.log("la imagen  del productos es",imagenProducto);
      // Handle the response data here
      console.log(data);
    })
    .catch(error => {
      // Handle any errors that occurred during the fetch request
      console.error(error);
    });
  }


  const handleShowBox2 = () => {
    setShowBox1(false);
    setShowBox2(true);
  };

  const handleShowBox1 = () => {
    setShowBox1(true);
    setShowBox2(false);
  };
  const handleSelectChange = (event) => { 
    setSelectedOption(event.target.value);
  };
  return (
    <div>
      {showBox1 && (
        <div>
          <div className="row">
            <div className="col-md-12 position-relative">
              <h3 className="font-family-SpaceGrotesk-Bold text-white text-left">
                Create your own pick
              </h3>
              <button type="button" class="close cerrar-modal" data-dismiss="modal">&times;</button>
            </div>
            <div className="col-md-12 text-left">
              <p className="font-family-SpaceGrotesk-Medium">
                Craft your very own picks and share it with your friends!
              </p>
              <form>                
                <div className="align-items-center d-flex form-group justify-content-center select-topic mb-5">
                  <label>Select Topic</label>
                  <span className="icon fas fa-magic fa-lg"></span>    
                   <select className="form-control" id="topic" name="topic" value={selectedOptionTopic} onChange={handleSelectChange}>
                  {muestras.map((opcion, index) => (
                    <option key={index} value={opcion.id}>{opcion.name}</option>
                  ))}
                </select>              
                
                </div>
                <button type="button" className="btn btn-login-modal font-family-SpaceGrotesk-Bold"  onClick={handleShowBox2}>
                  Next
                </button>
              </form>
            </div>
          </div>        
        </div>
      )}

      {showBox2 && (
        <div className='row'>
            <div className='col-md-12 position-relative'>
                <h3 className='font-family-SpaceGrotesk-Bold text-white text-left'>
                <button onClick={handleShowBox1} className='btn-back'><i class="far fa-arrow-left"></i></button>
                    Add your choices
                </h3>
                <button type="button" class="close cerrar-modal" data-dismiss="modal">&times;</button>
            </div>
            <div className='col-md-12'>
                <p className="font-family-SpaceGrotesk-Medium text-left">
                    Craft your very own picks and share it with your friends!
                </p>
            </div>

            <div className='col-md-12'><CreatePickImagenUpload topics={selectedOptionTopic}/></div>
               
        </div>
      )}
    </div>
  );
};

export default CreatePick;
