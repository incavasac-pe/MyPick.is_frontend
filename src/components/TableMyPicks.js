import React, { useState } from 'react';

const data = [
  { id: 1, pickName: 'Planet Earth', category: 'Nature', numOfPicks: '2.5K Picks', datePicked: '5m Ago', mostPicked: 'Flowers' },
  { id: 2, pickName: 'Premier League', category: 'Soccer', numOfPicks: '2.5K Picks', datePicked: '14m Ago', mostPicked: 'PSG' },
  { id: 3, pickName: 'Champions League', category: 'Soccer', numOfPicks: '8.5K Picks', datePicked: '52m Ago', mostPicked: 'Liverpool' },
  { id: 4, pickName: 'Nature', category: 'Nature', numOfPicks: '9.5K Picks', datePicked: '5m Ago', mostPicked: 'Flowers' },
  { id: 5, pickName: 'Musicians', category: 'Music', numOfPicks: '6.5K Picks', datePicked: '56m Ago', mostPicked: 'Otro' },
  { id: 6, pickName: 'Coffee', category: 'Snacks', numOfPicks: '9K Picks', datePicked: '50m Ago', mostPicked: 'Otros' },
];

const TableMyPicks = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  // Calcular el número total de páginas
//   const totalPages = Math.ceil(data.length / rowsPerPage);

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
            <tr key={row.id}>
              <td>
                <div className='table-img d-flex align-items-center justify-content-start'>
                    <div>
                      <img src={require('./img/paris.jpg')} alt="equipo" />
                      <img src={require('./img/washinton.jpg')} alt="Imagen 2" className='pc' />
                    </div>
                    <div>
                      <span className='ml-3 d-block'>- {row.datePicked}</span>
                      <span className='ml-3 d-block'>- {row.mostPicked}</span>
                    </div>
                </div>        
              </td>
              <td>{row.category}</td>
              <td className='pc'>{row.numOfPicks}</td>
              <td className='pc'>{row.datePicked}</td>
              <td>
                <div className='table-img d-flex align-items-center justify-content-start'>
                    <img src={require('./img/paris.jpg')} alt="equipo" />
                     <span className='ml-3'>{row.mostPicked}</span>
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
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
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
