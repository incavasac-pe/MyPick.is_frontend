import React, { Component } from 'react';
import MenuFlotante from './MenuFlotante';
import Like from './like';
import Commets from './commets';
import CreatePick from './modal/CreatePick';
import AuthLogin from './modal/AuthLogin';
import ModalComments from './modal/ModalComments';
import ModalRedes from './modal/ModalRedes';
import { checkAuth }  from '../AuthMiddleware'; 

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 1,
      imagenActiva: '',
      textoActivo: '',
      login:null,
    };
  }

  showStep = (stepNumber) => {
    const steps = document.getElementsByClassName('step');
    for (let i = 0; i < steps.length; i++) {
      steps[i].classList.remove('current');
    }
    steps[stepNumber - 1].classList.add('current');
  };

  nextStep = () => {
    const { currentStep } = this.state;
    const totalSteps = document.getElementsByClassName('step').length;
    if (currentStep < totalSteps) {
      this.setState({ currentStep: currentStep + 1 });
    }
  };

  previousStep = () => {
    const { currentStep } = this.state;
    if (currentStep > 1) {
      this.setState({ currentStep: currentStep - 1 });
    }
  };

  goToFirstStep = () => {
    this.setState({ currentStep: 1 });
  };

  handleClickImagen = (imagen, texto) => {
    this.setState({ imagenActiva: imagen, textoActivo: texto });
  };

  componentDidMount() {
    this.showStep(this.state.currentStep);
  }

  render() {
    const { currentStep, imagenActiva, textoActivo,login } = this.state;
  const isAuthenticated = checkAuth();
    this.setState({ login: isAuthenticated })  
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
                          className={`box-img ${imagenActiva === 'washinton' ? 'activo' : ''}`}
                          onClick={() => this.handleClickImagen('washinton', 'Washington DC, USA')}
                        >
                          <img src={require('./img/washinton.jpg')} alt="ciudad" onClick={this.nextStep}/>
                        </div>
                        <div className='nombre'>
                          <h3 className='text-white font-family-SpaceGrotesk-Bold'>Washington DC, USA</h3>
                        </div>
                      </div>
                      <div className='columna-refresh'>
                        <button onClick={this.goToFirstStep}>
                          <i className="fas fa-redo"></i>
                        </button>
                      </div>
                      <div className='columna'>
                        <div
                          className={`box-img ${imagenActiva === 'paris' ? 'activo' : ''}`}
                          onClick={() => this.handleClickImagen('paris', 'Paris, France')}
                        >
                          <img src={require('./img/paris.jpg')} alt="ciudad" onClick={this.nextStep}/>
                        </div>
                        <div className='nombre'>
                          <h3 className='text-white font-family-SpaceGrotesk-Bold'>Paris, France</h3>
                        </div>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-auto m-auto'>
                        <Like />
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
                          {imagenActiva === 'washinton' && (
                            <img src={require('./img/washinton.jpg')} alt="ciudad" onClick={this.nextStep}/>
                          )}
                          
                          {imagenActiva === 'paris' && (
                            <img src={require('./img/paris.jpg')} alt="ciudad" onClick={this.nextStep} />
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
                        <Like />
                      </div>
                    </div>
                    {/* <button onClick={this.previousStep}>Anterior</button>
                    <button onClick={this.nextStep}>Siguiente</button> */}
                  </div>
                  <div className={`step ${currentStep === 3 ? 'current' : ''}`} id="step3">
                    <div className='row'>
                      <div className='col-md-12 mb-4'>
                        <h1 className='text-center text-white titulo font-family-SpaceGrotesk-Light'>
                          What others picked and commented
                        </h1>
                      </div>
                    </div>
                    <div className='box-flex'>
                      <div className='columna'>
                        <div className='box-img'>
                           <div className='box-color bg-morado'>
                              <p className='mb-0 font-family-SpaceGrotesk-Light text-white'>75%</p>
                           </div>
                        </div>
                        <div className='nombre'>
                          <h3 className='text-white font-family-SpaceGrotesk-Bold'>Washington DC, USA</h3>
                        </div>
                      </div>
                      <div className='columna-refresh'>
                        <button onClick={this.goToFirstStep}>
                          <i className="fas fa-redo"></i>
                        </button>
                      </div>
                      <div className='columna'>
                        <div className='box-img'>
                          <div className='box-color bg-gris'>
                            <p className='mb-0 font-family-SpaceGrotesk-Light text-white'>25%</p>
                          </div>
                        </div>
                        <div className='nombre'>
                          <h3 className='text-white font-family-SpaceGrotesk-Bold'>Paris, France</h3>
                        </div>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-auto m-auto'>
                        <Like />
                      </div>
                    </div>
                    <div className='pc'>
                      <Commets />
                    </div>
                    {/* <button onClick={this.previousStep}>Anterior</button>
                    <button onClick={this.goToFirstStep}>Actualizar</button> */}
                  </div>
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
                        < AuthLogin />  )}  
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

        </div>        
      </div>
    );
  }
}

export default Home;
