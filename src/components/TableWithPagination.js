import React, { useState,useEffect } from 'react'; 
import { formatearTiempo } from '../utils';  
const API_BASE_URL = process.env.REACT_APP_URL_API

const TableWithPagination = (props) => { 
  function decodeHtmlEntities(text) {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
  }
  const [data, setMyBookmark] = useState([]);
  const idCat = props.idCat; 
 
  useEffect(() => { 
     
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);    

    fetch(`${API_BASE_URL}/my_bookmarks?email=${parsedUser.email}&id_category=${idCat}`, {
      method: 'GET',      
      headers: {
        'Content-Type': 'application/json'      
      }
    })
    .then(response => response.json())
    .then(data => { 
      if(!data.error && data.data){    
        setMyBookmark(data.data);
       }else{
        setMyBookmark([])
       }
    }) 
  }
  }, [idCat]); 
  

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(Number(event.target.value));
    setCurrentPage(1);
    handleButtonClick(`MyBookmarks${event.target.value}rows`);
  };

  
  // Paginar los datos
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  const handleRedirectMypick = (id) => {  
    localStorage.setItem("id_pick_create",id )    
    setTimeout(() => {     
      window.location.reload(false);
   },500);       
}

function removeQueryParams(url) {
  if(url!='' && url){
    const refIndex = url.indexOf("ref=");
    if (refIndex !== -1) {
      return url.slice(0, refIndex);
    }
  }
  return url ;
}
const handleButtonClick = (eventName) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    event_category: 'User',
    event_action: 'Click',
    event_label: eventName
  });
};
  return (
    <div className='Bookmarks border-linea mb-5 tabla-contenedor'>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>COMPARISON</th>
            <th>CATEGORY</th>
            <th>NO. OF PICKS</th>
            <th>TIME OF PICK</th>
            <th>CONSENSUS</th> 
          </tr>
        </thead>
        <tbody className='text-white'>
          {currentRows.map((row) => (
            
            <tr key={row.id}>
              <td>
                <div className='table-img '>
                 <div className='manito d-flex align-items-start justify-content-start' onClick={() => handleRedirectMypick(row.id)}> 
                    <div>  <img src={`${API_BASE_URL}/see_photo?img=${encodeURIComponent(row.photo1_name)}`} alt={`${row.photo1_name}`} /></div>
                      <span className='ml-3 d-block manito' onClick={() => handleRedirectMypick(row.id)}>- {decodeHtmlEntities(row.choice1_name)}</span>
                    </div>                    
                    <div>
                    <div className='table-img '>
                    <div className='manito d-flex align-items-start justify-content-start' onClick={() => handleRedirectMypick(row.id)}> 
                  <div> <img src={`${API_BASE_URL}/see_photo?img=${encodeURIComponent(row.photo2_name)}`} alt={`${row.photo2_name}`} className='pc' /></div> 
                  
                    <span className='ml-3 d-block manito' onClick={() => handleRedirectMypick(row.id)}>- {decodeHtmlEntities(row.choice2_name)}</span>
                    </div>
                    </div>
                    </div>
                </div>        
              </td>
              <td>{row.category}</td>
              <td>
                {row.pick_ranking} Picks
              </td>
              <td> {formatearTiempo(row.dias)}</td>
              <td>
                <div className='table-img d-flex align-items-start justify-content-start' >
              <div> <img src={`${API_BASE_URL}/see_photo?img=${row.selectd1 >= row.selectd2 ? encodeURIComponent(row.photo1_name) : encodeURIComponent(row.photo2_name)}`} className='bookmark-img'/> </div> 
{
   row?.url1 === null && row?.url2 === null ||  row?.url1 === "www" && row?.url2 === "www" ? (
    <span > {decodeHtmlEntities(row.selectd1 >= row.selectd2 ? row.choice1_name : row.choice2_name)}</span>
   ):(
   
    <a className='text-white' href={removeQueryParams(row.selectd1 >= row.selectd2  ? row?.url1 : row?.url2 )+'?tag=plsq06-20'} target="_blank">
    <span> {decodeHtmlEntities(row.selectd1 >= row.selectd2 ? row.choice1_name : row.choice2_name)}</span>
          </a>    
   
       
   ) 
}             
                </div>
                
              </td>
           
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-end align-items-center mb-3 table-footer">
            <div className='d-flex align-items-center justify-content-end'>
                <p className='text-gris-claro mb-0'>
                    Rows per page
                </p>
                <select value={rowsPerPage} onChange={handleRowsPerPageChange} className='form-control seleccionar'>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={25}>25</option>
                </select>
            </div>
            <div className='ml-5 mr-5 margin-mobil'>
                <p className='text-gris-claro mb-0'>{currentPage} - {Math.min(indexOfLastRow, data.length)} of {data.length}</p>
            </div>
            <nav aria-label="Page navigation" className='mb-0'>
                <ul className="pagination mb-0">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => {handlePageChange(currentPage - 1);  handleButtonClick('MyBookmarksPrev');}} disabled={currentPage === 1}>
                    <i class="far fa-angle-left"></i>
                    </button>
                </li>
                <li className={`page-item ${currentRows.length < rowsPerPage ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => {handlePageChange(currentPage + 1); handleButtonClick('MyBookmarksNext');}} disabled={currentRows.length < rowsPerPage}>
                    <i class="far fa-angle-right"></i>
                    </button>
                </li>
                </ul>
            </nav>
        </div>
    </div>
  );
};

export default TableWithPagination;
