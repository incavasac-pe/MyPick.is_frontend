import React, { Component } from 'react';
import MenuFlotante from './MenuFlotante';
import { Link } from 'react-router-dom';

class TrendingTopics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'Top Trending',
      muestras: [],
    };
  }

  changeTab = (tabName) => {
    this.setState({ activeTab: tabName });
  };

  render() {
    const { activeTab,muestras } = this.state;
    if( muestras.length === 0){
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
      }).catch(error => {
        // Manejar el error en caso de que ocurra
        console.error('Error:', error);
      });
    }
    if (muestras.length === 0) {
      return <p>No se encontraron resultados.</p>;   
    }
    return (
      <div className='trending contenido mb-5'>
        
        <div className="container">
        <div className='row'>
          <div className='col-md-12 text-center'>
            <h1 className='text-white titulo font-family-SpaceGrotesk-Light'>Trending Topics</h1>
             <p className='text-gris descripcion'>Showing what’s eveyone’s picking at this moment!</p>
          </div>          
        </div>
        <ul className="nav nav-tabs">
        <li className="nav-item" key={'0'}>
            <Link
              to="#"
              className={`nav-link ${activeTab === 'Top Trending' ? 'active' : ''}`}               
              onClick={() => this.changeTab('Top Trending')}
            >
              Top Trending
            </Link>
          </li>
        {muestras.map(category => (
          <>          
         <li className="nav-item"  key={category.id}>
              <Link
                to="#"
                className={`nav-link ${activeTab === category.name ? 'active' : ''}`} 
                onClick={() => this.changeTab(category.name)}
              >
              {category.name}
              </Link>
            </li>            
           </>
            ))}
             <li className="nav-item">
              <Link
                to="#"
                className={`nav-link ${activeTab === 'More' ? 'active' : ''}`}
               onClick={() => this.changeTab('More')}
              >
                More...
              </Link>
            </li>
        </ul>

        <div className="tab-content">
          <div className={`tab-pane ${activeTab === 'Top Trending' ? 'active' : ''}`} id="top-trending">
            <div className='row'>
              
              <div className='col-md-4 mb-3'>
                 <div className='box-tabs'>
                      <h6 className='font-family-SpaceMono-BoldItalic'>
                        <span className='d-block'>#1</span> 
                        TRENDING
                      </h6>
                      <div className='box-tabs-img'>
                        <img src={require('./img/washinton.jpg')} alt='icon' />
                      </div>
                      <h2 className='font-family-SpaceGrotesk-Bold'>Soccer</h2>
                      {/* <p className='text-grey font-family-SpaceGrotesk-Medium'>Soccer</p> */}
                      <div className='box-tabs-footer'>                        
                        <div>
                          <span className='text-morado font-family-SpaceGrotesk-Bold stats'>32K Picks</span>
                        </div>
                        <div className='box-equipos'>
                          <img src={require('./img/washinton.jpg')} alt='icon' />
                          <img src={require('./img/paris.jpg')} alt='icon'  className='sobrepuesta'/>
                        </div>
                      </div>                      
                 </div>
              </div>
              <div className='col-md-4 mb-3'>
                 <div className='box-tabs'>
                      <h6 className='font-family-SpaceMono-BoldItalic'>
                        <span className='d-block'>#1</span> 
                        Champions League
                      </h6>
                      <div className='box-tabs-img'>
                        <img src={require('./img/washinton.jpg')} alt='icon' />
                      </div>
                      <h2 className='font-family-SpaceGrotesk-Bold'>Soccer</h2>
                      {/* <p className='text-grey font-family-SpaceGrotesk-Medium'>Soccer</p> */}
                      <div className='box-tabs-footer'>                        
                        <div>
                          <span className='text-morado font-family-SpaceGrotesk-Bold stats'>32K Picks</span>
                        </div>
                        <div className='box-equipos'>
                          <img src={require('./img/washinton.jpg')} alt='icon' />
                          <img src={require('./img/paris.jpg')} alt='icon'  className='sobrepuesta'/>
                        </div>
                      </div>                      
                 </div>
              </div>
              <div className='col-md-4 mb-3'>
                 <div className='box-tabs'>
                      <h6 className='font-family-SpaceMono-BoldItalic'>
                        <span className='d-block'>#1</span> 
                        Flowers
                      </h6>
                      <div className='box-tabs-img'>
                        <img src={require('./img/washinton.jpg')} alt='icon' />
                      </div>
                      <h2 className='font-family-SpaceGrotesk-Bold'>Soccer</h2>
                      {/* <p className='text-grey font-family-SpaceGrotesk-Medium'>Soccer</p> */}
                      <div className='box-tabs-footer'>                        
                        <div>
                          <span className='text-morado font-family-SpaceGrotesk-Bold stats'>32K Picks</span>
                        </div>
                        <div className='box-equipos'>
                          <img src={require('./img/washinton.jpg')} alt='icon' />
                          <img src={require('./img/paris.jpg')} alt='icon'  className='sobrepuesta'/>
                        </div>
                      </div>                      
                 </div>
              </div>
            </div>
          </div>
        {muestras.map(category => (
          <>  
          <div className={`tab-pane ${activeTab === category.name  ? 'active' : ''}`} id="top-trending">
          Contenido de aaaaaaaaaa {category.name}
            <div className='row'>
              
              <div className='col-md-4 mb-3'>
                 <div className='box-tabs'>
                      <h6 className='font-family-SpaceMono-BoldItalic'>
                        <span className='d-block'>#1</span> 
                        TRENDING
                      </h6>
                      <div className='box-tabs-img'>
                        <img src={require('./img/washinton.jpg')} alt='icon' />
                      </div>
                      <h2 className='font-family-SpaceGrotesk-Bold'>Soccer</h2>
                      {/* <p className='text-grey font-family-SpaceGrotesk-Medium'>Soccer</p> */}
                      <div className='box-tabs-footer'>                        
                        <div>
                          <span className='text-morado font-family-SpaceGrotesk-Bold stats'>32K Picks</span>
                        </div>
                        <div className='box-equipos'>
                          <img src={require('./img/washinton.jpg')} alt='icon' />
                          <img src={require('./img/paris.jpg')} alt='icon'  className='sobrepuesta'/>
                        </div>
                      </div>                      
                 </div>
              </div>
              <div className='col-md-4 mb-3'>
                 <div className='box-tabs'>
                      <h6 className='font-family-SpaceMono-BoldItalic'>
                        <span className='d-block'>#1</span> 
                        Champions League
                      </h6>
                      <div className='box-tabs-img'>
                        <img src={require('./img/washinton.jpg')} alt='icon' />
                      </div>
                      <h2 className='font-family-SpaceGrotesk-Bold'>Soccer</h2>
                      {/* <p className='text-grey font-family-SpaceGrotesk-Medium'>Soccer</p> */}
                      <div className='box-tabs-footer'>                        
                        <div>
                          <span className='text-morado font-family-SpaceGrotesk-Bold stats'>32K Picks</span>
                        </div>
                        <div className='box-equipos'>
                          <img src={require('./img/washinton.jpg')} alt='icon' />
                          <img src={require('./img/paris.jpg')} alt='icon'  className='sobrepuesta'/>
                        </div>
                      </div>                      
                 </div>
              </div>
              <div className='col-md-4 mb-3'>
                 <div className='box-tabs'>
                      <h6 className='font-family-SpaceMono-BoldItalic'>
                        <span className='d-block'>#1</span> 
                        Flowers
                      </h6>
                      <div className='box-tabs-img'>
                        <img src={require('./img/washinton.jpg')} alt='icon' />
                      </div>
                      <h2 className='font-family-SpaceGrotesk-Bold'>Soccer</h2>
                      {/* <p className='text-grey font-family-SpaceGrotesk-Medium'>Soccer</p> */}
                      <div className='box-tabs-footer'>                        
                        <div>
                          <span className='text-morado font-family-SpaceGrotesk-Bold stats'>32K Picks</span>
                        </div>
                        <div className='box-equipos'>
                          <img src={require('./img/washinton.jpg')} alt='icon' />
                          <img src={require('./img/paris.jpg')} alt='icon'  className='sobrepuesta'/>
                        </div>
                      </div>                      
                 </div>
              </div>
            </div>
          </div>
          </> ))}
          {/* <div className={`tab-pane ${activeTab === 'Places' ? 'active' : ''}`} id="places">
            Contenido de Places
          </div>
          <div className={`tab-pane ${activeTab === 'Food' ? 'active' : ''}`} id="food">
            Contenido de Food
          </div>
          <div className={`tab-pane ${activeTab === 'Soccer' ? 'active' : ''}`} id="soccer">
            Contenido de Soccer
          </div>
          <div className={`tab-pane ${activeTab === 'Watches' ? 'active' : ''}`} id="watches">
            Contenido de Watches
          </div>
          <div className={`tab-pane ${activeTab === 'Flowers' ? 'active' : ''}`} id="flowers">
            Contenido de Flowers
          </div> */}
          <div className={`tab-pane ${activeTab === 'More' ? 'active' : ''}`} id="more">
            Contenido de More
          </div>
        </div>
      </div>
      <MenuFlotante />
      </div>
    );
   }
  } 
export default TrendingTopics;