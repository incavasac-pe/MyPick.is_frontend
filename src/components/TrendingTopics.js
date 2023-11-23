import React, { Component } from 'react';
import MenuFlotante from './MenuFlotante';
import { Link } from 'react-router-dom'; 
const API_BASE_URL = process.env.REACT_APP_URL_API

class TrendingTopics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'Top Trending',     
      muestras: [],
      top3: [],
      top_category: [],
      idCat:''
    };    
  }
  
  componentDidMount() {
    this.setState({ idCat: this.props.idCat });  
    if(this.props.name !='' ){
      this.setState({ activeTab: this.props.name }); 
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.idCat !== prevProps.idCat) {
      this.setState({ idCat: this.props.idCat }); 
      this.changeTab(this.props.name,this.props.idCat)
    }
  }

  changeTab = (tabName,id) => {  
    this.setState({ activeTab: tabName }); 
    if(id!==''){
      this.fetchDataTopCategory(id)
    }
  };
  
  fetchDataTop3 = () => { 
      fetch( `${API_BASE_URL}/list_trendingTopics`, {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json'      
        }  
      })
      .then(response => response.json())
      .then(data => {                    
            if (data.data) {    
              this.setState({ top3: data.data }); // Actualizar el estado con los valores de data.data               
            }   
      }) 
}
 
fetchDataTopCategory = (id) => {  
      fetch(`${API_BASE_URL}/list_trendingTopics_category?id_category=${id}`, {
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
              this.changeTab(data.data[0]?.category_name,'')          
            }  
        }
      })  
}

  render() {
    const { activeTab,muestras,top3,top_category } = this.state; 
 
    if( muestras.length === 0){
      fetch(`${API_BASE_URL}/list_category_with_trendingTopics`, {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json'       
        }  
      })
      .then(response => response.json())
      .then(data => {                     
            if (data.data) {  
              this.setState({ muestras: data.data }); // Actualizar el estado con los valores de data.data 
              this.fetchDataTop3();
              this.changeTab('Top Trending','')
            }    
      }) 
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
         <li className="nav-item"  key={category.id_category}>
              <Link
                to="#"
                className={`nav-link ${activeTab === category.category_name ? 'active' : ''}`} 
                onClick={() => this.changeTab(category.category_name,category.id_category)}
              >
              {category.category_name}
              </Link>
            </li>            
           </>
            ))}       
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
                      <img src={`${API_BASE_URL}/see_photo?img=${encodeURIComponent(top.photo1_name)}`} alt='icon' />
                      </div>
                      <h2 className='font-family-SpaceGrotesk-Bold'>{top.trending_choice}</h2> 
                      <div className='box-tabs-footer'>                        
                        <div>
                          <span className='text-morado font-family-SpaceGrotesk-Bold stats'>{top.pick_ranking } Picks</span>
                        </div>
                        <div className='box-equipos'>
                        <img src={`${API_BASE_URL}/see_photo?img=${encodeURIComponent(top.photo1_name)}`} alt='icon' />
                        <img src={`${API_BASE_URL}/see_photo?img=${encodeURIComponent(top.photo2_name)}`} alt='icon'  className='sobrepuesta'/>
                        </div>
                      </div>                      
                 </div>
              </div>
              ))}
           
            </div>
          </div>
        {muestras.map(category => (
          <>  
          <div className={`tab-pane ${activeTab === category.category_name  ? 'active' : ''}`} id="top-trending">         
            <div className='row'>
            {top_category.map(top_by_cat => (
              <div className='col-md-4 mb-3'>
                 <div className='box-tabs'>
                      <h6 className='font-family-SpaceMono-BoldItalic'>
                        <span className='d-block'>#1</span> 
                        {top_by_cat.category_name}
                      </h6>
                      <div className='box-tabs-img'>
                      <img src={`${API_BASE_URL}/see_photo?img=${encodeURIComponent(top_by_cat.photo1_name)}`} alt='icon' />
                      </div>
                      <h2 className='font-family-SpaceGrotesk-Bold'>{top_by_cat.trending_choice}</h2>          
                      <div className='box-tabs-footer'>                        
                        <div>
                          <span className='text-morado font-family-SpaceGrotesk-Bold stats'>{top_by_cat.pick_ranking } Picks</span>
                        </div>
                        <div className='box-equipos'>
                        <img src={`${API_BASE_URL}/see_photo?img=${encodeURIComponent(top_by_cat.photo1_name)}`} alt='icon' />
                        <img src={`${API_BASE_URL}/see_photo?img=${encodeURIComponent(top_by_cat.photo2_name)}`} alt='icon'  className='sobrepuesta'/>
                        </div>
                      </div>                      
                 </div>
              </div>
                 ))} 
           
            </div>
          </div>
          </> ))} 
        </div>
      </div>
      <MenuFlotante />
      </div>
    );
   }
  }

export default TrendingTopics;