import React, { Component } from 'react';


class Buscador extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '', // Almacena el término de búsqueda
    /*   muestras: [
        { id: 1, texto: 'League', picks: '22.5K Picks', imagen1: require('../img/paris.jpg'), imagen2: require('../img/washinton.jpg') },
        { id: 2, texto: 'Soccer', picks: '10.5K Picks', imagen1: require('../img/washinton.jpg'), imagen2: require('../img/paris.jpg') },
        { id: 3, texto: 'Food', picks: '8.5K Picks', imagen1: require('../img/paris.jpg'), imagen2: require('../img/washinton.jpg') },
        { id: 4, texto: 'Places', picks: '7.5K Picks', imagen1: require('../img/washinton.jpg'), imagen2: require('../img/paris.jpg') },
        { id: 5, texto: 'Whatches', picks: '6.5K Picks', imagen1: require('../img/paris.jpg'), imagen2: require('../img/washinton.jpg') },
        { id: 6, texto: 'Flowers', picks: '5.5K Picks', imagen1: require('../img/washinton.jpg'), imagen2: require('../img/paris.jpg') },
      ], */
      resultados: [], // Resultados de búsqueda
    };
    
  }

  componentDidMount() {
    // Verificar si el navegador es compatible con la API Web Speech
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();

      // Configurar el reconocimiento de voz
      recognition.lang = 'es-ES'; // Establecer el idioma a español
      recognition.continuous = false; // Detener el reconocimiento después de la primera frase

      // Evento que se ejecuta cuando se detecta la voz del usuario
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        this.handleVoiceSearch(transcript);
      };

      // Evento que se ejecuta cuando se produce un error en el reconocimiento de voz
      recognition.onerror = (event) => {
        console.log('Error en el reconocimiento de voz', event.error);
      };

      // Agregar evento para iniciar la búsqueda por voz
      const voiceButton = document.getElementById('voiceButton');
      voiceButton.addEventListener('click', () => {
        recognition.start();
      });
     
  
    } else {
      console.log('El navegador no es compatible con la API Web Speech');
    }
  }

  handleInputChange = (event) => {
    const searchTerm = event.target.value;
    const { muestras } = this.state;

    // Filtrar las muestras que coinciden con el término de búsqueda
    const resultados = muestras.filter((muestra) =>
      muestra.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    this.setState({ searchTerm, resultados });
  };

  handleVoiceSearch = (transcript) => {
    
    const { muestras } = this.state;

    // Filtrar las muestras que coinciden con el término de búsqueda por voz
    const resultados = muestras.filter((muestra) =>
      muestra.name.toLowerCase().includes(transcript.toLowerCase())
    );

    this.setState({ searchTerm: transcript, resultados });
  };

  handleClearSearch = () => {
    this.setState({ searchTerm: '', resultados: [] });
  };

  renderMuestras = () => {
    const { resultados, muestras } = this.state;
     if(!muestras){
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
              this.setState({ muestras: data.data }); // Actualizar el estado con los valores de data.data 
            }  
        }
      })  .catch(error => {
        // Manejar el error en caso de que ocurra
        console.error('Error:', error);
      });
    }
 
    const muestrasMostradas = resultados.length > 0 ? resultados : muestras ;
   
    console.log("muestrasMostradas",muestrasMostradas)
 
    if (!muestrasMostradas || muestrasMostradas.length === 0) {
      return <p>No se encontraron resultados.</p>;
    }
    return (
      <table className="table table-busqueda table-borderless">
        <thead>
          <tr>
            <th colSpan={2} className='table-titulo'>Top Topics</th>
          </tr>
        </thead>
        <tbody>
          {muestrasMostradas.map((muestra) => (
            <tr key={muestra.id}>
              {/* <td className='text-white'>
                <img src={muestra.imagen} alt={muestra.texto} className='img-busqueda' /> 
                <span className='ml-3 modal-titulo'>{muestra.texto}</span>
              </td> */}
              <td><span className='modal-titulo text-white'>{muestra.name}</span></td>
              <td align='right' className='text-morado'>
                <div className='align-items-center d-flex justify-content-end mt-2'>
                    <span className='mr-3 modal-picks'>{muestra.picks}</span>
                    <img src= {muestra.imagen1} alt={muestra.name}  className='img-busqueda-small'/>
                    <img src= {muestra.imagen2} alt={muestra.name} className='img-busqueda-small sobrepuesta pc'/>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  render() {
    const { searchTerm, resultados } = this.state;
    const showClearButton = searchTerm !== '' || resultados.length > 0;

    return (
      <div className="modal fade" id="buscador">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-body">
              <button type="button" className="close cerrar" data-dismiss="modal">
              <i className="far fa-times"></i>
              </button>
              <div className="row">
                <div className="col-md-12 p-0">
                  <div className="form-group">
                    <div className='buscador'>
                      <div className='align-items-start busca d-flex justify-content-between position-relative'>
                        <div className='text-left'>
                          <button id="voiceButton" className="btn btn-search">
                            <i className="fal fa-microphone"></i>
                          </button>
                        </div>
                        <input type="text" className="form-control input-search" placeholder="Search Anything..." value={searchTerm} onChange={this.handleInputChange} />
                        <div className='text-right'>
                          {showClearButton && (
                            <button type="button" className="btn btn-cleaner" onClick={this.handleClearSearch}>
                              <i className="far fa-times"></i>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='box-resultados'>{this.renderMuestras()}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Buscador;