import React, { useState,useEffect } from 'react'; 
import { formatearTiempo } from '../utils'; 
const API_BASE_URL = 'https://159.89.42.65:3200';

const TableMyPicks = (props) => {
  const [data, setMyPick] = useState([]);
  const idCat = props.idCat; 

  useEffect(() => { 
     
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);    
    fetch(`${API_BASE_URL}/list_my_picks?email=${parsedUser.email}&id_category=${idCat}`, {
      method: 'GET',      
      headers: {
        'Content-Type': 'application/json'      
      }
    })
    .then(response => response.json())
    .then(data => { 
      if(!data.error && data.data){     
        setMyPick(data.data);
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
  };

  
  // Paginar los datos
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <div className='Bookmarks border-linea'>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>CHOICHES</th>
            <th>CATEGORY</th>
            <th className='pc'>NO OF PICKS</th>
            <th className='pc'>DATE PICKED</th>
            <th>MOST PICKED</th>    
          </tr>
        </thead>        
        <tbody className='text-white'>
          {currentRows.map((row) => (
            <tr key={row.id_pick}>
              <td>
                <div className='table-img d-flex align-items-center justify-content-start'>
                    <div>
                      <img src={`${API_BASE_URL}/see_photo?img=${row.photo1_name}`} alt={`${row.photo1_name}`} />
                      <img src={`${API_BASE_URL}/see_photo?img=${row.photo2_name}`} alt={`${row.photo2_name}`}  className='pc'/>
                     </div>
                    <div>
                      <span className='ml-3 d-block'>- {row.choice1_name}</span>
                      <span className='ml-3 d-block'>- {row.choice2_name}</span>
                    </div>
                </div>        
              </td>
              <td>{row.category}</td>
              <td className='pc'>{row.pick_ranking ?? '0'} Picks</td>
              <td className='pc'>{formatearTiempo(row.dias)}</td>
              <td>
                <div className='table-img d-flex align-items-center justify-content-start'>
          
                    <img src={`${API_BASE_URL}/see_photo?img=${row.selectd1 >= row.selectd2 ? row.photo1_name : row.photo2_name}`} alt="equipo" />
                     <span className='ml-3'>{ row.selectd1 >= row.selectd2 ? row.choice1_name : row.choice2_name }</span>
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
                <p className='text-gris-claro mb-0'>{currentPage} - {Math.min(indexOfLastRow, data.length)} de {data.length}</p>
            </div>
            <nav aria-label="Page navigation" className='mb-0'>
                <ul className="pagination mb-0">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    <i class="far fa-angle-left"></i>
                    </button>
                </li>
                <li className={`page-item ${currentRows.length < rowsPerPage ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(currentPage + 1)} disabled={currentRows.length < rowsPerPage}>
                    <i class="far fa-angle-right"></i>
                    </button>
                </li>
                </ul>
            </nav>
        </div>
    </div>
  );
};

export default TableMyPicks;
