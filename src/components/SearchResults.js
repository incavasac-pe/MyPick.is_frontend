import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const API_BASE_URL = process.env.REACT_APP_URL_API 

const SearchResults = (props) => { 
    const navigate = useNavigate(); // Hook de navegación
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [data, setSearch] = useState([]);

    useEffect(() => {  
       
        if(props.search!='') {
        fetch(`${API_BASE_URL}/list_all_picks_search?search=${props.search}`, {
          method: 'GET',      
          headers: {
            'Content-Type': 'application/json'      
          }
        })
        .then(response => response.json())
        .then(data => { 
          if(!data.error && data.data){     
            setSearch(data.data);
            setCurrentPage(1);
           }else{
            setSearch([])
           } 
        }) 
    }else {
        setSearch([])
    }
      }, [props.search]); 

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }; 

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(Number(event.target.value));
        setCurrentPage(1);
    };
    const handleRedirectMypick = (id) => { 
        localStorage.setItem("id_pick_create",id )    
        setTimeout(() => {     
            navigate('/'); // Redirigir al usuario a la página de perfil   
            },500);       
    }; 

    
    // Paginar los datos
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

    function removeQueryParams(url) {
        if(url!='' && url){
          const refIndex = url.indexOf("ref=");
          if (refIndex !== -1) {
            return url.slice(0, refIndex);
          }
        }
        return url ;
      }
      
    
    return (
        <div className='container'>
            <div className="contenido">
                <div className="row">
                    <div className="col-md-12 mt-4 text-center">
                        <h1 className="text-center text-white titulo font-family-SpaceGrotesk-Light">Search Results</h1>
                        <p className="text-gris-claro descripcion">Exploring all the picks related to your searched term.</p>
                    </div>
                    <div className="col-md-12">
                        <div className='Bookmarks border-linea tabla-contenedor'>
                            <table className="table table-striped table-bordered">
                                <thead>
                                <tr>
                                    <th>COMPARISON</th>
                                    <th>CATEGORY</th>
                                    <th>NO. OF PICKS	</th>
                                    <th>CONSENSUS</th>
                                    <th>DETAILS</th>
                                </tr>
                                </thead>
                                <tbody className='text-white'>
                                {currentRows.map((row) => (
                                    <tr key={row.id}  >
                                        <td>
                                            <div className='table-img d-flex align-items-center justify-content-start '>
                                                <div className='manito' onClick={() => handleRedirectMypick(row.id)}> 
                                                    <img src={`${API_BASE_URL}/see_photo?img=${encodeURIComponent(row.photo1_name)}`} alt={`${encodeURIComponent(row.photo1_name)}`} />
                                                    <img src={`${API_BASE_URL}/see_photo?img=${encodeURIComponent(row.photo2_name)}`} alt={`${encodeURIComponent(row.photo2_name)}`} className='pc' />
                                                </div>
                                                <div>
                                                <span className='ml-3 d-block manito' onClick={() => handleRedirectMypick(row.id)}>- {row.choice1_name}</span>
                                                <span className='ml-3 d-block manito' onClick={() => handleRedirectMypick(row.id)}>- {row.choice2_name}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{row.category}</td>
                                        <td>{row.pick_ranking ?? '0'} Picks</td>
                                        <td>
                                            <div  onClick={() => handleRedirectMypick(row.id)} className='table-img d-flex align-items-center justify-content-start manito'>
                                            <img src={`${API_BASE_URL}/see_photo?img=${row.selectd1 >= row.selectd2 ? encodeURIComponent(row.photo1_name) : encodeURIComponent(row.photo2_name)}`} alt="equipo" />
                                          
                                            <a className='text-white' href={removeQueryParams(row.selectd1 >= row.selectd2  ? row?.url_choice1 : row?.url_choice2 )+'?tag=plsq-20'} target="_blank">
                                             <span className='ml-3'> {row.selectd1 >= row.selectd2 ? row.choice1_name : row.choice2_name}</span>
                                            </a> 
                                            </div>

                                        </td>
                                        <td>  <button onClick={() => handleRedirectMypick(row.id)}   className='btn-login font-family-SpaceGrotesk-Bold solo-login'>See pick</button></td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            <div className="d-flex justify-content-end align-items-center mb-3 table-footer">
                                <div className='d-flex align-items-center justify-content-end'>
                                    <p className='text-gris-claro mb-0'>
                                        Rows per page
                                    </p>
                                    <select value={rowsPerPage} onChange={handleRowsPerPageChange}
                                            className='form-control seleccionar'>
                                        <option value={5}>5</option>
                                        <option value={10}>10</option>
                                        <option value={15}>15</option>
                                    </select>
                                </div>
                                <div className='ml-5 mr-5 margin-mobil'>
                                    <p className='text-gris-claro mb-0'>{currentPage} - {Math.min(indexOfLastRow, data.length)} of {data.length}</p>
                                </div>
                                <nav aria-label="Page navigation" className='mb-0'>
                                    <ul className="pagination mb-0">
                                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                            <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}
                                                    disabled={currentPage === 1}>
                                                <i className="far fa-angle-left"></i>
                                            </button>
                                        </li>
                                        <li className={`page-item ${currentRows.length < rowsPerPage ? 'disabled' : ''}`}>
                                            <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}
                                                    disabled={currentRows.length < rowsPerPage}>
                                                <i className="far fa-angle-right"></i>
                                            </button>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SearchResults;
