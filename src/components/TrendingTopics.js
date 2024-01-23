import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuFlotante from './MenuFlotante';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const API_BASE_URL = process.env.REACT_APP_URL_API;

const TrendingTopics = (props) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Top Trending');
  const [muestras, setMuestras] = useState([]);
  const [top3, setTop3] = useState([]);
  const [topCategory, setTopCategory] = useState([]);
  const [idCat, setIdCat] = useState('');

  useEffect(() => {
    setIdCat(props.idCat);
    if (props.name !== '') {
      setActiveTab(props.name);
    }
  }, [props.idCat, props.name]);

  useEffect(() => {
 /*   if (props.idCat !== prevProps.idCat) {
      setIdCat(props.idCat);
      changeTab(props.name, props.idCat);
    }*/
  }, [props.idCat]);

  const changeTab = (tabName, id) => {
    setActiveTab(tabName);
    if (id !== '') {
      fetchDataTopCategory(id);
    }
  };

 
  const changeTabName = (nameChoice) => {   
    navigator.clipboard.writeText(nameChoice)  
    toast.success('Text Copied', {
      position: toast.POSITION.TOP_RIGHT
  });
  };
 
  
  const fetchDataTop3 = () => {
    fetch(`${API_BASE_URL}/list_trendingTopics`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.data) {
          setTop3(data.data);
        }
      });
  };

  const fetchDataTopCategory = (id) => {
    fetch(`${API_BASE_URL}/list_trendingTopics_category?id_category=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          setTopCategory([]);
        } else {
          if (data.data) {
            setTopCategory(data.data);
            changeTab(data.data[0]?.category_name, '');
          }
        }
      });
  };

  useEffect(() => {
    if (muestras.length === 0) {
      fetch(`${API_BASE_URL}/list_category_with_trendingTopics`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(data => {
          if (data.data) {
            setMuestras(data.data);
            fetchDataTop3();
            changeTab('Top Trending', '');
          }
        });
    }
  }, [muestras]);

  
    if (muestras.length === 0) {
      return <p>No se encontraron resultados.</p>;   
    }
    return (
      <div className='trending contenido mb-5'>
          <ToastContainer position="top-right"  autoClose={2000} closeOnClick theme="dark"/>    
        <div className="container">
        <div className='row'>
          <div className='col-md-12 text-center'>
            <h1 className='text-white titulo font-family-SpaceGrotesk-Light'>Trending Topics</h1> 
             <p className='text-gris descripcion'>What everyone's picking at this moment!</p>
          </div>          
        </div>
        <ul className="nav nav-tabs">
        <li className="nav-item" key={'0'}>
            <div
              to="#"
              className={`nav-link ${activeTab === 'Top Trending' ? 'active' : ''}`}               
              onClick={() => changeTab('Top Trending','')}
            >
              Top Trending
            </div>
          </li>
        {muestras.map(category => (
          <>          
         <li className="nav-item"  key={category.id_category}>
              <div
                to="#"
                className={`nav-link ${activeTab === category.category_name ? 'active' : ''}`} 
                onClick={() => changeTab(category.category_name,category.id_category)}
              >
              {category.category_name}
              </div>
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
                        <span className='d-block'></span> 
                       {top.category_name}
                      </h6>
                      <div className='box-tabs-img'>
                      <img src={`${API_BASE_URL}/see_photo?img=${encodeURIComponent(top.photo1_name)}`} alt='icon' />
                      </div>                    
                      <h2 className='font-family-SpaceGrotesk-Bold manito'onClick={() => changeTabName(top.trending_choice)}>                    
                        {top.trending_choice}
                      </h2>
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
            {topCategory.map(top_by_cat => (
              <div className='col-md-4 mb-3'>
                 <div className='box-tabs'>
                      <h6 className='font-family-SpaceMono-BoldItalic'>
                        <span className='d-block'>#1</span> 
                        {top_by_cat.category_name}
                      </h6>
                      <div className='box-tabs-img'>
                      <img src={`${API_BASE_URL}/see_photo?img=${encodeURIComponent(top_by_cat.photo1_name)}`} alt='icon' />
                      </div>                       
                      <h2 className='font-family-SpaceGrotesk-Bold manito'   onClick={() => changeTabName(top_by_cat.trending_choice)}>
                        {top_by_cat.trending_choice}
                      </h2>    
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
 

export default TrendingTopics;