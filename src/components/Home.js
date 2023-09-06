import React, {useState, useEffect} from 'react';
import MenuFlotante from './MenuFlotante';
import Like from './like';
import Commets from './commets';
import CreatePick from './modal/CreatePick';
import AuthLogin from './modal/AuthLogin'; 
import ModalRedes from './modal/ModalRedes';
import { checkAuth }  from '../AuthMiddleware'; 

const Home = () => {

  const [currentStep, setcurrentStep] = useState(1);
  const [imagenActiva, setimagenActiva] = useState('');  
  const [textoActivo, settextoActivo] = useState('');  
  const [login, setlogin] = useState('');
  const [muestras, setMuestras] = useState(null);
  const [porciento, setPorcentaje] = useState(null); 
  const [id_pick, setPick] = useState(''); 

 
const  nextStep = () => { 
    const totalSteps = document.getElementsByClassName('step').length;
    if (currentStep < totalSteps) {
      setcurrentStep(  currentStep + 1 )    
    } 
  };
  
 const goToFirstStep = () => {
  fetchData()
  setcurrentStep(1)
   
  };
 
 const handleClickImagen = (id_choice,imagen, texto) => { 
 
      const storedUser = localStorage.getItem('user');
      let email = 'default@test.com';
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);     
        email = parsedUser.email 
      }
   
      fetch(`http://localhost:3100/select_picks`, {
        method: 'POST', 
        body: JSON.stringify({ id_pick: id_pick, id_choice: id_choice,email:email }),
        headers: {
          'Content-Type': 'application/json'      
        }  
      })
      .then(response => response.json())
      .then(data => { 
        if(!data.error && data.data){  
          setPorcentaje(data.data) 
          setimagenActiva(imagen)
          settextoActivo(texto)    
          setcurrentStep(2)   
        }
      })
      .catch(error => {  
      });
   
  };

  useEffect(() => { 
    const isAuthenticated = checkAuth();
    setlogin(isAuthenticated)    
    fetchData()
  }, []);

  const fetchData = async () => {
    
    setMuestras(null)    
    fetch(`http://localhost:3100/list_all_picks?limit=${1}`, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json'      
      }  
    })
    .then(response => response.json())
    .then(data => { 
      if(!data.error && data.data){   
        setMuestras(data.data)  
        setPick(data.data?.[0]?.id)     
      }
    })
    .catch(error => {        
    });
  };
    return (
      <div>        
        <div className='container'>
          <div className='contenido'>
            <div className='row'>
              <div className='col-md-8 m-auto'>
                <div id="stepWizard">
                  <div className={`step ${currentStep === 1 ? 'current' : ''}`} id="step1">
                    <div className='row'>
                      <div className='col-md-12 mb-4'>
                        <h1 className='text-center text-white titulo font-family-SpaceGrotesk-Light'>My Pick Is...</h1>
                      </div>
                    </div>
                    <div className='box-flex'>
                      <div className='columna'>
                        <div
                          className={`box-img ${imagenActiva === muestras?.[0]?.photo1_name ? 'activo' : ''}`}
                          onClick={() => handleClickImagen(muestras?.[0]?.id_choice1, muestras?.[0]?.photo1_name, muestras?.[0]?.choice1_name)}
                        >
                          <img src={`http://localhost:3100/see_photo?img=${muestras?.[0]?.photo1_name}`}  alt="ciudad"  />
                        </div>
                        <div className='nombre'>
                          <h3 className='text-white font-family-SpaceGrotesk-Bold'>{ muestras?.[0]?.choice1_name}</h3>
                        </div>
                      </div>
                      <div className='columna-refresh'>
                        <button onClick={goToFirstStep}>
                          <i className="fas fa-redo"></i>
                        </button>
                      </div>
                      <div className='columna'>
                        <div
                          className={`box-img ${imagenActiva === muestras?.[0]?.photo2_name ? 'activo' : ''}`}
                          onClick={() => handleClickImagen(muestras?.[0]?.id_choice2,  muestras?.[0]?.photo2_name, muestras?.[0]?.choice2_name)}
                        >
                          <img src={`http://localhost:3100/see_photo?img=${muestras?.[0]?.photo2_name}`} alt="ciudad" />
                        </div>
                        <div className='nombre'>
                          <h3 className='text-white font-family-SpaceGrotesk-Bold'>{ muestras?.[0]?.choice2_name}</h3>
                        </div>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-auto m-auto'>
                       {muestras && (<Like likes={muestras?.[0]?.likes} id_pick={id_pick}  /> )} 
                      </div>
                    </div>
                  </div>
                  <div className={`step ${currentStep === 2 ? 'current' : ''}`} id="step2"> 
                    <div className='row'>
                      <div className='col-md-12 mb-4'>
                        <h1 className='text-center text-white titulo font-family-SpaceGrotesk-Light'>My Pick Is...</h1>
                      </div>
                    </div>                 
                    <div className='box-flex'>
                      <div className='columna'>
                        <div className='box-img activo'>                      
                          {imagenActiva === muestras?.[0]?.photo1_name && (
                            <img src={`http://localhost:3100/see_photo?img=${muestras?.[0]?.photo1_name}`} alt="ciudad" onClick={nextStep}/>
                          )}
                          
                          {imagenActiva === muestras?.[0]?.photo2_name && (
                            <img src={`http://localhost:3100/see_photo?img=${muestras?.[0]?.photo2_name}`} alt="ciudad" onClick={nextStep} />
                          )}
                        
                        </div>
                        <div className='nombre'>
                          <h3 className='text-white font-family-SpaceGrotesk-Bold'>
                          I'm on team
                          <span className='text-morado'> {textoActivo} </span>
                          </h3>
                        </div>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-auto m-auto'>
                      {muestras && (<Like likes={muestras?.[0]?.likes} id_pick={id_pick}  /> )} 
                      </div>
                    </div>                   
                  </div>
                  {porciento && ( 
                  <div className={`step ${currentStep === 3 ? 'current' : ''}`} id="step3">
                    <div className='row'>
                      <div className='col-md-12 mb-4'>
                        <h1 className='text-center text-white titulo font-family-SpaceGrotesk-Light'>
                          What others picked and commented
                        </h1>
                      </div>
                    </div>
                    <div className='box-flex'>
                      <div className='columna' >
                        <div className='box-img'>
                           <div className='box-color bg-morado'>
                              {porciento.map((percen) => (
                                muestras?.[0]?.id_choice1 === percen.id_choice ? (
                                  <p  className='mb-0 font-family-SpaceGrotesk-Light text-white'> {percen.percentage_selected} %</p>
                                ) : null
                              ))}
                            </div>
                        </div>
                        <div className='nombre'>
                          <h3 className='text-white font-family-SpaceGrotesk-Bold'>{muestras?.[0]?.choice1_name}</h3>
                        </div>
                      </div>
                      <div className='columna-refresh'>
                        <button onClick={goToFirstStep}>
                          <i className="fas fa-redo"></i>
                        </button>
                      </div>
                      <div className='columna'>
                        <div className='box-img'>                         
                          <div className='box-color bg-gris'>
                              {porciento.map((percen2) => (
                                muestras?.[0]?.id_choice2 === percen2.id_choice ? (
                                  <p  className='mb-0 font-family-SpaceGrotesk-Light text-white'> {percen2.percentage_selected} %</p>
                                ) : null
                              ))}
                            </div>
                        </div>
                        <div className='nombre'>
                          <h3 className='text-white font-family-SpaceGrotesk-Bold'>{ muestras?.[0]?.choice2_name}</h3>
                        </div>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-auto m-auto'>
                      {muestras && (<Like likes={muestras?.[0]?.likes} id_pick={id_pick}  /> )} 
                      </div>
                    </div>
                    <div className='pc'>
                      <Commets />
                    </div>               
                  </div>
                      )}
                </div>
              </div>
            </div>
          </div>
          <MenuFlotante />
          <div class="modal fade" id="comentarios">
            <div class="modal-dialog modal-dialog-centered modal-md">
              <div class="modal-content">              
                <div class="modal-body p-0">
                  <div className='cuadro'>
                    <Commets />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="modal fade" id="creapick">
              <div class="modal-dialog modal-dialog-centered modal-md">
                <div class="modal-content">              
                  <div class="modal-body p-0">
                    <div className='cuadro'>
                      <div className='box-cuadro-modal'>     
                      {login ? (
                        <CreatePick  />
                      ) : ( 
                        < AuthLogin label={'Create My Pick'} />  )}  
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="modal fade" id="redes">
              <div class="modal-dialog modal-dialog-centered modal-md">
                <div class="modal-content">              
                  <div class="modal-body p-0">
                    <div className='cuadro'>
                      <div className='box-cuadro-modal'>
                        <ModalRedes />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {!login && (   <div class="modal fade" id="login">
              <div class="modal-dialog modal-dialog-centered modal-md">
                <div class="modal-content">              
                  <div class="modal-body p-0">
                    <div className='cuadro'>
                      <div className='box-cuadro-modal'>                                    
                        < AuthLogin  label={'Information'} />                       
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}  
        </div>        
      </div>
    );
  }
 

export default Home;