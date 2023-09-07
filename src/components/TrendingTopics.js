import React, { Component } from 'react';
import MenuFlotante from './MenuFlotante';
import { Link } from 'react-router-dom';

class TrendingTopics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'Top Trending',     
      muestras: [],
      top3: [],
      top_category: [],
    };
  }

  changeTab = (tabName,id) => {
    this.setState({ activeTab: tabName }); 
    if(id!==''){
      this.fetchDataTopCategory(id)
    }
  };

  fetchDataTop3 = () => { 
      fetch(`http://localhost:3100/list_trendingTopics`, {
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
              this.setState({ top3: data.data }); // Actualizar el estado con los valores de data.data 
              
            }  
        }
      }).catch(error => {
        // Manejar el error en caso de que ocurra
        console.error('Error:', error);
      });   
}
 
fetchDataTopCategory = (id) => {
  console.log("buscar el top de la cateorua",id)
      fetch(`http://localhost:3100/list_trendingTopics_category?id_category=${id}`, {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json'      
        }  
      })
      .then(response => response.json())
      .then(data => { 
        if(data.error){        
          this.setState({ top_category:[] });  
        } else {              
            if (data.data) {    
              this.setState({ top_category: data.data }); // Actualizar el estado con los valores de data.data 
              
            }  
        }
      }).catch(error => {
        // Manejar el error en caso de que ocurra
        console.error('Error:', error);
      });   
}

  render() {
    const { activeTab,muestras,top3,top_category } = this.state;
 
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
              this.fetchDataTop3()
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
              onClick={() => this.changeTab('Top Trending','')}
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
                onClick={() => this.changeTab(category.name,category.id)}
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
            {top3.map(top => (
              <div className='col-md-4 mb-3'>
                 <div className='box-tabs'>
                      <h6 className='font-family-SpaceMono-BoldItalic'>
                        <span className='d-block'>#1</span> 
                       {top.category_name}
                      </h6>
                      <div className='box-tabs-img'>
                      <img src={`http://localhost:3100/see_photo?img=${top.photo1_name}`} alt='icon' />
                      </div>
                      <h2 className='font-family-SpaceGrotesk-Bold'>{top.trending_choice}</h2>
                      {/* <p className='text-grey font-family-SpaceGrotesk-Medium'>Soccer</p> */}
                      <div className='box-tabs-footer'>                        
                        <div>
                          <span className='text-morado font-family-SpaceGrotesk-Bold stats'>{top.pick_ranking } Picks</span>
                        </div>
                        <div className='box-equipos'>
                        <img src={`http://localhost:3100/see_photo?img=${top.photo1_name}`} alt='icon' />
                        <img src={`http://localhost:3100/see_photo?img=${top.photo2_name}`} alt='icon'  className='sobrepuesta'/>
                        </div>
                      </div>                      
                 </div>
              </div>
              ))}
           
            </div>
          </div>
        {muestras.map(category => (
          <>  
          <div className={`tab-pane ${activeTab === category.name  ? 'active' : ''}`} id="top-trending">         
            <div className='row'>
            {top_category.map(top_by_cat => (
              <div className='col-md-4 mb-3'>
                 <div className='box-tabs'>
                      <h6 className='font-family-SpaceMono-BoldItalic'>
                        <span className='d-block'>#1</span> 
                        {top_by_cat.category_name}
                      </h6>
                      <div className='box-tabs-img'>
                      <img src={`http://localhost:3100/see_photo?img=${top_by_cat.photo1_name}`} alt='icon' />
                      </div>
                      <h2 className='font-family-SpaceGrotesk-Bold'>{top_by_cat.trending_choice}</h2>          
                      <div className='box-tabs-footer'>                        
                        <div>
                          <span className='text-morado font-family-SpaceGrotesk-Bold stats'>{top_by_cat.pick_ranking }Picks</span>
                        </div>
                        <div className='box-equipos'>
                        <img src={`http://localhost:3100/see_photo?img=${top_by_cat.photo1_name}`} alt='icon' />
                        <img src={`http://localhost:3100/see_photo?img=${top_by_cat.photo2_name}`} alt='icon'  className='sobrepuesta'/>
                        </div>
                      </div>                      
                 </div>
              </div>
                 ))} 
           
            </div>
          </div>
          </> ))}
         
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