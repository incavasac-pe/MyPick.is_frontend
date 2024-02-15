import React, {useState, useEffect,useRef} from 'react'; 
import Like from './like';
import CreatePick from './modal/CreatePick';
import AuthLogin from './modal/AuthLogin'; 
import ModalRedes from './modal/ModalRedes';
import { checkAuth }  from '../AuthMiddleware'; 
import { useLocation } from 'react-router-dom'; 
 
const API_BASE_URL = process.env.REACT_APP_URL_API
const Home = (props) => { 
 
  const commentsSectionRef = useRef(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id_pick_search = searchParams.get('myPick') ?? '';

 
  const [currentStep, setcurrentStep] = useState(1);
  const [imagenActiva, setimagenActiva] = useState('');  
  const [textoActivo, settextoActivo] = useState('');  
  const [urlActivo, seturlActivo] = useState('');  
  const [login, setlogin] = useState('');
  const [muestras, setMuestras] = useState(null);
  const [porciento, setPorcentaje] = useState(null); 
  const [id_pick, setPick] = useState('');  
  const [ip, setIp] = useState('');
  const [y_nLikes, sety_nLikes] = useState(false); 

  const [comentarios, setCommentarios] = useState([]);    
  const [nuevoComentario, setnuevoComentario] = useState('');   
  const [nuevaRespuesta, setnuevaRespuesta] = useState('');    
  const [mostrarRespuestas, setmostrarRespuestas] = useState({});   
  const [mostrarFormularioRespuesta, setmostrarFormularioRespuesta] = useState({}); 
  
  const scrollToComments = () => {
   
  };

  const fetchIp = async () => {       
    fetch(`https://api.ipify.org?format=json`, {
      method: 'GET',       
    })
    .then(response => response.json())
    .then(data => {  
      setIp(data.ip)
      
     if(!props.origin){ 
      if(id_pick_search && id_pick_search!= ''){ 
        localStorage.setItem("id_pick_create",id_pick_search )   
           
      }
      fetchData(data.ip)
    }
     else{

      const storedPick = localStorage.getItem('pick');
      const parsePick = JSON.parse(storedPick);  
      setMuestras(parsePick)  
 
      setPick(localStorage.getItem("id_pick"))     
      sety_nLikes(localStorage.getItem("y_nLikes")) 

      const step = localStorage.getItem('step'); 
      setcurrentStep(parseInt(step, 10));

      if(step=='2' || step=='3'){  
          const storedPorce = localStorage.getItem('porcentaje');
          const parsePorc = JSON.parse(storedPorce); 
          setPorcentaje(parsePorc)
          setimagenActiva(localStorage.getItem('imagen'))  
          settextoActivo(localStorage.getItem('textoActivo'))  
          seturlActivo(localStorage.getItem('urlActivo'))
          fetchDataComments(localStorage.getItem("id_pick")) 
      }  
      
     }
    })    
  };
 
  const  nextStep = () => { 
    const totalSteps = document.getElementsByClassName('step').length; 
    if (currentStep < totalSteps) {
      setcurrentStep(  currentStep + 1 )  
      
      localStorage.setItem("step",currentStep + 1 ) 
    } else{
      if (currentStep < 3) {
        setcurrentStep(  currentStep + 1 )   
        localStorage.setItem("step",currentStep + 1 ) 
      } 
    }
    
  };
  
 const goToFirstStep = () => {
  fetchData(ip)
  setcurrentStep(1)   
 
  };
 
 const handleClickImagen = (id_choice,imagen, texto,url) => { 
 
 
      const storedUser = localStorage.getItem('user');
      let email = 'default@test.com';
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);     
        email = parsedUser.email 
      }
   
      fetch(`${API_BASE_URL}/select_picks`, {
        method: 'POST', 
        body: JSON.stringify({ id_pick: id_pick, id_choice: id_choice,email:email }),
        headers: {
          'Content-Type': 'application/json'      
        }  
      })
      .then(response => response.json())
      .then(data => { 
        if(!data.error && data.data){ 
          localStorage.setItem("step",2) 
          localStorage.setItem("porcentaje",JSON.stringify(data.data) )
          localStorage.setItem("imagen",imagen) 
          localStorage.setItem("textoActivo",texto) 
          localStorage.setItem("urlActivo",url) 
          setPorcentaje(data.data) 
          setimagenActiva(imagen)
          settextoActivo(texto)    
          seturlActivo(url)
          setcurrentStep(2)   
          fetchDataComments(id_pick)
        }
      })    
  };

  useEffect(() => { 
    const isAuthenticated = checkAuth();
    setlogin(isAuthenticated)    
    
    fetchIp(); 
    if (commentsSectionRef.current) {
     commentsSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }

  }, []);

 
  const fetchData = async (ip) => {    
    setMuestras(null)    
    let email
    const storedUser = localStorage.getItem('user'); 
    const id_pick_create = localStorage.getItem('id_pick_create') ?? ''; 
    let url = `${API_BASE_URL}/list_all_picks?limit=${1}&ip_maq=${ip}&email=${email}&id_pick=${id_pick}`;
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);     
      email = parsedUser.email 
    }
    if (id_pick_create && id_pick_create!='') {
        url = `${API_BASE_URL}/list_all_picks?limit=${1}&ip_maq=${ip}&email=${email}&id_pick=${id_pick_create}&flag=true`;
    } 
    fetch(url, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json'      
      }  
    })
    .then(response => response.json())
    .then(data => { 
      if(!data.error && data.data){   
        setcurrentStep(1)  
        setMuestras(data.data)  
        setPick(data.data?.[0]?.id)     
        sety_nLikes(data.other) 
        localStorage.removeItem("id_pick_create")
        localStorage.setItem("pick",JSON.stringify(data.data) )
        localStorage.setItem("id_pick",data.data?.[0]?.id )
        localStorage.setItem("y_nLikes",data.other)
        localStorage.setItem("step",1)
      }
    })  
  }; 
 

  const fetchDataComments = (id_pick) => { 
    fetch(`${API_BASE_URL}/list_comments_bypicks?id_pick=${id_pick}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json()).then(data => {
        if (data.error) {
          setCommentarios([]) 
        } else {
            if (data.data) {
              setCommentarios(data.data) 
            }
        }
    })
}

const registerComments = (nuevoComentario) => { 
    const storedUser = localStorage.getItem('user'); 
        const parsedUser = JSON.parse(storedUser);

        fetch(`${API_BASE_URL}/register_comments`, {
            method: 'POST',
            body: JSON.stringify(
                {id_pick: id_pick, contenido: nuevoComentario, email: parsedUser.email}
            ),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json()).then(data => {
            if (data.data) {
              setCommentarios(data.data) 
            } 
        }) 
}


const registerReply = (comentario_id, id_pick, nuevoComentario) => { 
    const storedUser = localStorage.getItem('user'); 
        const parsedUser = JSON.parse(storedUser); 
        fetch(`${API_BASE_URL}/register_reply`, {
            method: 'POST',
            body: JSON.stringify(
                {id_pick: id_pick, comentario_id: comentario_id, contenido: nuevoComentario, email: parsedUser.email}
            ),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json()).then(data => {
            if (data.data) {
              setCommentarios(data.data) 
            } 
        })
   
}

const registerLikeComments = async (comentario_id, id_pick) => {
    try {
        const storedUser = localStorage.getItem('user');
  
        const parsedUser = JSON.parse(storedUser);
         await fetch(`${API_BASE_URL}/register_like_comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {id_pick: id_pick, comentario_id: comentario_id, email: parsedUser.email}
            )
        });

         fetchDataComments(id_pick)
    } catch (error) {
        console.error('Error al registrar el like del comentario:', error);
        throw error;
    }
}; 

const handleChangeNuevoComentario = (event) => {
  setnuevoComentario(event.target.value) 
};

const agregarComentario = () => {    
    if(login){
       registerComments(nuevoComentario)
       setnuevoComentario('')
     }
};

const toggleMostrarRespuestas = (id) => {
  setmostrarRespuestas((prevState) => ({
    ...prevState,
    [id]: !prevState[id]
  }));
};


const toggleMostrarFormularioRespuesta = (id) => {
  setmostrarFormularioRespuesta((prevState) => ({
    ...prevState,
    [id]: !prevState[id]
  }));
}; 

const handleChangeNuevaRespuesta = (event) => {
  setnuevaRespuesta(event.target.value)
};

const agregarRespuesta = (id) => {
    if(login){
       registerReply(id, id_pick, nuevaRespuesta)
        setnuevaRespuesta('')
     }  
};
const agregarLikesComments = (id) => {
  if(login){
    registerLikeComments(id, id_pick)
  }
};

function removeQueryParams(url) {
  if(url!='' && url){
    const refIndex = url.indexOf("ref=");
    if (refIndex !== -1) {
      return url.slice(0, refIndex);
    }
  }
  return url ;
}
 
const manejarClick = (dato) => {  
  if(dato){
  commentsSectionRef.current.scrollIntoView({ behavior: 'smooth' });}
}
 
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
                      <div className='columna col_div_ajus'>
                        <div
                          className={`box-img ${imagenActiva === muestras?.[0]?.photo1_name ? 'activo' : ''}`}
                          onClick={() => handleClickImagen(muestras?.[0]?.id_choice1, muestras?.[0]?.photo1_name, muestras?.[0]?.choice1_name,muestras?.[0]?.url_choice1)}
                        >
                          <img src={`${API_BASE_URL}/see_photo?img=${encodeURIComponent(muestras?.[0]?.photo1_name)}`} width={"282px"}  height={"282px"} alt="ciudad"  />
                        </div>
                        <div className='nombre link_url' style={{ cursor: 'pointer' }}>
                           <a className='text-white font-family-SpaceGrotesk-Bold' href={removeQueryParams(muestras?.[0]?.url_choice1)+'?tag=plsq-20'} target="_blank">
                        {muestras?.[0]?.choice1_name.length > 70 ? `${muestras?.[0]?.choice1_name.substring(0, 70)}...` : muestras?.[0]?.choice1_name}
                      </a>
                        </div>
                      </div>
                      <div className='columna-refresh'>
                        <button class="reload-button" onClick={goToFirstStep}>
                          <i className="fas fa-redo"></i>
                        </button>
                      </div>
                      <div className='columna col_div_ajus'>
                        <div
                          className={`box-img ${imagenActiva === muestras?.[0]?.photo2_name ? 'activo' : ''}`}
                          onClick={() => handleClickImagen(muestras?.[0]?.id_choice2,  muestras?.[0]?.photo2_name, muestras?.[0]?.choice2_name,muestras?.[0]?.url_choice2)}
                        >
                          <img src={`${API_BASE_URL}/see_photo?img=${encodeURIComponent(muestras?.[0]?.photo2_name)}`} width={"282px"}  height={"282px"} alt="ciudad" />
                        </div>
                        
                        <div className='nombre link_url' style={{ cursor: 'pointer' }}>
                        <a className='text-white font-family-SpaceGrotesk-Bold' href={removeQueryParams(muestras?.[0]?.url_choice2)+'?tag=plsq-20'} target="_blank">
                            {muestras?.[0]?.choice2_name.length > 70 ? `${muestras?.[0]?.choice2_name.substring(0, 70)}...` : muestras?.[0]?.choice2_name}
                          </a>
                           </div>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-auto m-auto'>
                       { (<Like likes={muestras?.[0]?.likes ?? 0 } id_pick={id_pick} y_nLikes={y_nLikes}   onClick={manejarClick}  /> )} 
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
                          {imagenActiva === muestras?.[0]?.photo1_name && (
                            <img src={`${API_BASE_URL}/see_photo?img=${encodeURIComponent(muestras?.[0]?.photo1_name)}`} width={"282px"}  height={"282px"} alt="ciudad" onClick={nextStep}/>
                          )}
                          
                          {imagenActiva === muestras?.[0]?.photo2_name && (
                            <img src={`${API_BASE_URL}/see_photo?img=${encodeURIComponent(muestras?.[0]?.photo2_name)}`}  width={"282px"}  height={"282px"}alt="ciudad" onClick={nextStep} />
                          )}
                        
                        </div>
                        <div className='nombre text-center'>
                          <h3 className='text-morado font-family-SpaceGrotesk-Bold link_url2'>
                              I'm on team 
                              <span className='text-morado'>   
                              <a className='text-white font-family-SpaceGrotesk-Bold'  href={removeQueryParams(urlActivo)+'?tag=plsq-20'} target="_blank">
                               &nbsp;{ textoActivo}
                              </a></span>
                          </h3>
                          <a href="#" onClick={nextStep} className='text-morado d-inline-block font-family-SpaceGrotesk-Bold animate__heartBeat'>
                            Continue  <i class="fas fa-chevron-double-right arrow-top"></i>
                          </a>                      
                        </div>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-auto m-auto'>
                      {muestras && (<Like likes={muestras?.[0]?.likes} id_pick={id_pick}   onClick={(manejarClick)}  /> )} 
                      </div>
                    </div>                   
                  </div>
                  {porciento && ( 
                  <div className={`step ${currentStep === 3 ? 'current' : ''}`} id="step3">
                    <div className='row'>
                      <div className='col-md-12 mb-4'>
                        <h1 className='text-center text-white titulo font-family-SpaceGrotesk-Light'>
                        Picks and Comments from others
                        </h1>
                      </div>
                    </div>
                    <div className='box-flex'>
                      <div className='columna col_div_ajus' >
                        <div className='box-img'>
                           <div className='box-color bg-morado'>
                              {porciento.map((percen) => (
                                muestras?.[0]?.id_choice1 === percen.id_choice ? (
                                  <p  className='mb-0 font-family-SpaceGrotesk-Light text-white'> {percen.percentage_selected} %</p>
                                ) : null
                              ))}
                            </div>
                        </div>
                        <div className='nombre link_urlstep3'>
                          <a className='text-white font-family-SpaceGrotesk-Bold' href={removeQueryParams(muestras?.[0]?.url_choice1)+'?tag=plsq-20'} target="_blank"> 
                         {muestras?.[0]?.choice1_name.length > 70 ? `${muestras?.[0]?.choice1_name.substring(0, 70)}...` : muestras?.[0]?.choice1_name}</a>
                        </div>
                      </div>
                      <div className='columna-refresh1'>
                        <button onClick={goToFirstStep} >
                         Next pick
                        </button>
                      </div>
                      <div className='columna col_div_ajus'>
                        <div className='box-img'>                         
                          <div className='box-color bg-gris'>
                              {porciento.map((percen2) => (
                                muestras?.[0]?.id_choice2 === percen2.id_choice ? (
                                  <p  className='mb-0 font-family-SpaceGrotesk-Light text-white'> {percen2.percentage_selected} %</p>
                                ) : null
                              ))}
                            </div>
                        </div>
                        <div className='nombre link_urlstep3'>
                        <a className='text-white font-family-SpaceGrotesk-Bold' href={removeQueryParams(muestras?.[0]?.url_choice2)+'?tag=plsq-20'} target="_blank"> 
                          {muestras?.[0]?.choice2_name.length > 70 ? `${muestras?.[0]?.choice2_name.substring(0, 70)}...` : muestras?.[0]?.choice2_name}
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-auto m-auto'>
                      {muestras && (<Like likes={muestras?.[0]?.likes} id_pick={id_pick}  onClick={manejarClick} /> )} 
                      </div>
                    </div>
                    <div className='pc'>
                   
                    <div className="wrapper">
                   <div className="comment" >
                    <div className="commet-title">
                        <h3 className="text-white font-family-SpaceGrotesk-Bold">Comments  
                        </h3>
                        <button type="button" class="close cerrar-modal movil" data-dismiss="modal">
                            &times;
                        </button>
                    </div>

                    {
                    comentarios.map((comentario) => (
          
                        <div ref={commentsSectionRef} className="box-comentario"
                            key={
                                comentario.id
                        }>
                           { comentario.usuario !='' &&
                            <div   className="content">
                                <div className="avatar">
                                    <img src={
                                            `${API_BASE_URL}/see_photo?img=${
                                                comentario.foto
                                            }`
                                        }
                                        alt="user"/>
                                </div>
                                <div className="content-comment">
                                    <div className="user">
                                        <h5>{
                                            comentario.usuario
                                        }</h5>
                                        <span className="is-mute">
                                            {
                                            comentario.fecha
                                        }</span>
                                    </div>
                                    <p>{
                                        comentario.contenido
                                    }</p>
                                    <div className="content-footer">
                                        <button className="btn btn-outline"
                                            onClick={
                                                () => agregarLikesComments(comentario.id)
                                        }>
                                            <i className="fas fa-heart"></i>
                                            {
                                            comentario.likes +' ' ?? '0 ' 
                                        }
                                             Likes
                                        </button>
                                        <button className="btn"
                                            onClick={
                                                () => toggleMostrarFormularioRespuesta(comentario.id)
                                        }>
                                            <i class="fas fa-reply"></i>
                                            Reply
                                        </button>
                                        {
                                        comentario.respuestas.length > 0 && (
                                            <button className="btn"
                                                onClick={
                                                    () => toggleMostrarRespuestas(comentario.id)
                                            }>
                                                {
                                                mostrarRespuestas[comentario.id] ? 'Hide Replies -' : 'Show Replies +'
                                            } </button>
                                        )
                                    } </div>

                                    {
                                    mostrarRespuestas[comentario.id] && comentario.respuestas.length > 0 && (
                                        <div className='mt-3 mb-3'>
                                            {
                                            comentario.respuestas.map((respuesta) => (
                                                <div key={
                                                        respuesta.id
                                                    }
                                                    className="respuesta">
                                                    <div className="avatar">
                                                        <img src={
                                                                `${API_BASE_URL}/see_photo?img=${
                                                                    respuesta.foto
                                                                }`
                                                            }
                                                            alt="user"/>
                                                    </div>
                                                    <div className='content-comment'>
                                                        <h5>{
                                                            respuesta.usuario
                                                        }</h5>
                                                        <p>{
                                                            respuesta.contenido
                                                        }</p>
                                                    </div>
                                                </div>
                                            ))
                                        } </div>
                                    )
                                }

                                    {
                                    mostrarFormularioRespuesta[comentario.id] && (
                                        <div className="nueva-respuesta">
                                            <textarea value={nuevaRespuesta}
                                                onChange={
                                                    handleChangeNuevaRespuesta
                                                }
                                                placeholder=""/>
                                                 {!login && (
                                                    <div className="comments_login">
                                                   Sorry, to continue, you must login.
                                                    </div>
                                                )} 
                                            <div className='text-right mt-3 mb-3'>
                                                <button className="login mr-3"
                                                    onClick={
                                                        () => toggleMostrarFormularioRespuesta(comentario.id)
                                                }>
                                                    Cancel
                                                </button>
                                                <button className='login'
                                                    onClick={
                                                        () => agregarRespuesta(comentario.id)
                                                }>Reply</button>
                                            </div>
                                        </div>
                                    )
                                } </div>
                            </div>
                          }
                            <div className="footer"></div>
                        </div>
                    ))
                } </div>

                <div  className="box-comentario mt-4">
                    <textarea value={nuevoComentario}
                        onChange={
                            handleChangeNuevoComentario
                        }
                        placeholder="Leave a comment..."/>
                            {!login && (
                                <div className="comments_login">
                               Sorry, to continue, you must login.
                                </div>
                            )}  
                    <div className='text-right'>
                        <button className='btn-login'
                            onClick={
                                agregarComentario
                        }>Comment</button>
                    </div>
                
                </div>  
            </div>
                    </div>               
                  </div>
                      )}
                </div>
              </div>
            </div>
          </div>
          {/*<MenuFlotante />*/}
          <div class="modal fade" id="comentarios">
            <div class="modal-dialog modal-dialog-centered modal-md">
              <div class="modal-content">              
                <div class="modal-body p-0">
                  <div className='cuadro'>
                  <div className="wrapper">
                   <div className="comment">
                    <div className="commet-title">
                        <h3 className="text-white font-family-SpaceGrotesk-Bold">Comments  
                        </h3>
                        <button type="button" class="close cerrar-modal movil" data-dismiss="modal">
                            &times;
                        </button>
                    </div>

                    {
                    comentarios.map((comentario) => (
                        <div className="box-comentario"
                            key={
                                comentario.id
                        }>
                            <div className="content">
                                <div className="avatar">
                                    <img src={
                                            `${API_BASE_URL}/see_photo?img=${
                                                comentario.foto
                                            }`
                                        }
                                        alt="user"/>
                                </div>
                                <div className="content-comment">
                                    <div className="user">
                                        <h5>{
                                            comentario.usuario
                                        }</h5>
                                        <span className="is-mute">
                                            {
                                            comentario.fecha
                                        }</span>
                                    </div>
                                    <p>{
                                        comentario.contenido
                                    }</p>
                                    <div className="content-footer">
                                        <button className="btn btn-outline"
                                            onClick={
                                                () => agregarLikesComments(comentario.id)
                                        }>
                                            <i className="fas fa-heart"></i>
                                            {
                                            comentario.likes +' ' ?? '0 ' 
                                        }
                                             Likes
                                        </button>
                                        <button className="btn"
                                            onClick={
                                                () => toggleMostrarFormularioRespuesta(comentario.id)
                                        }>
                                            <i class="fas fa-reply"></i>
                                            Reply
                                        </button>
                                        {
                                        comentario.respuestas.length > 0 && (
                                            <button className="btn"
                                                onClick={
                                                    () => toggleMostrarRespuestas(comentario.id)
                                            }>
                                                {
                                                mostrarRespuestas[comentario.id] ? 'Hide Replies -' : 'Show Replies +'
                                            } </button>
                                        )
                                    } </div>

                                    {
                                    mostrarRespuestas[comentario.id] && comentario.respuestas.length > 0 && (
                                        <div className='mt-3 mb-3'>
                                            {
                                            comentario.respuestas.map((respuesta) => (
                                                <div key={
                                                        respuesta.id
                                                    }
                                                    className="respuesta">
                                                    <div className="avatar">
                                                        <img src={
                                                                `${API_BASE_URL}/see_photo?img=${
                                                                    respuesta.foto
                                                                }`
                                                            }
                                                            alt="user"/>
                                                    </div>
                                                    <div className='content-comment'>
                                                        <h5>{
                                                            respuesta.usuario
                                                        }</h5>
                                                        <p>{
                                                            respuesta.contenido
                                                        }</p>
                                                    </div>
                                                </div>
                                            ))
                                        } </div>
                                    )
                                }

                                    {
                                    mostrarFormularioRespuesta[comentario.id] && (
                                        <div className="nueva-respuesta">
                                            <textarea value={nuevaRespuesta}
                                                onChange={
                                                    handleChangeNuevaRespuesta
                                                }
                                                placeholder=""/>
                                                 {!login && (
                                                    <div className="comments_login">
                                                   Sorry, to continue, you must login.
                                                    </div>
                                                )} 
                                            <div className='text-right mt-3 mb-3'>
                                                <button className="login mr-3"
                                                    onClick={
                                                        () => toggleMostrarFormularioRespuesta(comentario.id)
                                                }>
                                                    Cancel
                                                </button>
                                                <button className='login'
                                                    onClick={
                                                        () => agregarRespuesta(comentario.id)
                                                }>Reply</button>
                                            </div>
                                        </div>
                                    )
                                } </div>
                            </div>
                            <div className="footer"></div>
                        </div>
                    ))
                } </div>

                <div  className="box-comentario mt-4">
                    <textarea value={nuevoComentario}
                        onChange={
                            handleChangeNuevoComentario
                        }
                        placeholder="Leave a comment..."/>
                            {!login && (
                                <div className="comments_login">
                               Sorry, to continue, you must login.
                                </div>
                            )}  
                    <div className='text-right'>
                        <button className='btn-login'
                            onClick={
                                agregarComentario
                        }>Comment</button>
                    </div>
                
                </div>  
            </div>
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
                        < AuthLogin label={'Create My Pick'} />  )}  
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
                        <ModalRedes id_pick={id_pick} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {!login && (   <div class="modal fade" id="login">
              <div class="modal-dialog modal-dialog-centered modal-md">
                <div class="modal-content">              
                  <div class="modal-body p-0">
                    <div className='cuadro'>
                      <div className='box-cuadro-modal'>                                    
                        < AuthLogin  label={'Bookmark'} />                       
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}  
        </div>        
      </div>
    );
  }
 

export default Home;