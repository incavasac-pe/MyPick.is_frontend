import React, { useEffect ,useState} from 'react';
import { useNavigate  } from 'react-router-dom';
 
const Buscador = (props) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
  
    // Verificar si el navegador es compatible con la API Web Speech
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();

      // Configurar el reconocimiento de voz
      recognition.lang = 'es-ES'; // Establecer el idioma a español
      recognition.continuous = false; // Detener el reconocimiento después de la primera frase

      // Evento que se ejecuta cuando se detecta la voz del usuario
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        handleVoiceSearch(transcript);
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
  }, []);
 
    const handleInputChange = (event) => {
      const searchTermV = event.target.value; 
      setSearchTerm(searchTermV) 
    };

    const handleSearchChange = () => {       
      const data =  { searchTerm}  
      props.onData(data);
      navigate('/SearchResults'); // Redirigir al usuario a la página de perfil   
    };

    const handleVoiceSearch = (transcript) => { 
      setSearchTerm(transcript)  
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        handleSearchChange();
      }
    };

    return (
        <div className="form-group w-100 pc">
          <div className='buscador'>
            <div className='align-items-start busca d-flex justify-content-between position-relative'>
              <div className='text-left'>
                <button id="voiceButton" className="btn btn-search">
                  <i className="fal fa-microphone"></i>
                </button>
              </div> 
              <input type="text" className="form-control input-search" placeholder="Search Anything..."    onKeyDown={handleKeyDown}  value={searchTerm} onChange={handleInputChange} />

              <div className='text-right'>
                <button type="button" className="btn btn-cleaner" onClick={handleSearchChange} >
                  <i className="fal fa-search"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
   
    );
  }
 

export default Buscador;
