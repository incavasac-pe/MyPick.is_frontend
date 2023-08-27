import React, { useState,useEffect } from 'react'; 
import MenuFlotante from './MenuFlotante';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  
  const TrendingTopics = () => { 
  
/*     this.state = {
      activeTab: 'Top Trending',
    };  */   
    const [activeTab, setActiveTab] = useState('Top Trending');
    const [categories, setCategories] = useState([]);

    useEffect(() => { 
    fetch(`http://localhost:3100/list_category?limit=${5}`, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json'      
      }  
    })
    .then(response => response.json())
    .then(data => { 
      if(data.error){        
         toast.error(data.msg);     
      } else {              
           if (data.data) {   
            setCategories(data.data);
            console.log("89898989898989898",data.data)
          }  
       }
    })
    .catch(error => {
      // Manejar cualquier error de la solicitud           
      toast.error("An error has occurred");  
     // navigate('/'); // Redirigir al usuario a la página de home  
    });    
  }, []); 

  const changeTab = (tabName) => {  
    console.log("changTab*****",tabName)
  /*   this.setState({ activeTab: tabName });  */
    setActiveTab(tabName)  
  };  

 
 
    return (
      <div className='trending contenido mb-5'>
        
        <div className="container">
        <div className='row'>
          <div className='col-md-12 text-center'>
            <h1 className='text-white titulo font-family-SpaceGrotesk-Light'>Trending Topics</h1>
            <ToastContainer position="top-right"  autoClose={2000} closeOnClick theme="dark"/>    
            <p className='text-gris descripcion'>Showing what’s eveyone’s picking at this moment!</p>
          </div>          
        </div>
        <ul className="nav nav-tabs">
        <li className="nav-item">
            <Link
              to="#"
              className={`nav-link ${activeTab === 'Top Trending' ? 'active' : ''}`}
              onClick={() => changeTab('Top Trending')}
            >
              Top Trending
            </Link>
          </li>
        {categories.map(category => (
          <>          
         <li className="nav-item"  key={category.id}>
              <Link
                to="#"
                className={`nav-link ${activeTab === category.name ? 'active' : ''}`}
                onClick={() => changeTab(category.name)}
              >
                Places  {category.name}
              </Link>
            </li>
              {/*<li className="nav-item">
              <Link
                to="#"
                className={`nav-link ${activeTab === 'Food' ? 'active' : ''}`}
                onClick={() => this.changeTab('Food')}
              >
                Food
              </Link>
            </li><li className="nav-item pc">
              <Link
                to="#"
                className={`nav-link ${activeTab === 'Soccer' ? 'active' : ''}`}
                onClick={() => this.changeTab('Soccer')}
              >
                Soccer
              </Link>
            </li><li className="nav-item pc">
              <Link
                to="#"
                className={`nav-link ${activeTab === 'Watches' ? 'active' : ''}`}
                onClick={() => this.changeTab('Watches')}
              >
                Watches
              </Link>
            </li><li className="nav-item pc">
              <Link
                to="#"
                className={`nav-link ${activeTab === 'Flowers' ? 'active' : ''}`}
                onClick={() => this.changeTab('Flowers')}
              >
                Flowers
              </Link>
            </li> */}
           </>
            ))}
             <li className="nav-item">
              <Link
                to="#"
                className={`nav-link ${activeTab === 'More' ? 'active' : ''}`}
               onClick={() => changeTab('More')}
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
          <div className={`tab-pane ${activeTab === 'Places' ? 'active' : ''}`} id="places">
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
          </div>
          <div className={`tab-pane ${activeTab === 'More' ? 'active' : ''}`} id="more">
            Contenido de More
          </div>
        </div>
      </div>
      <MenuFlotante />
      </div>
    );
          }
  
export default TrendingTopics;

