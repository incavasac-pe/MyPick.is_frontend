import React, {useState, useEffect} from 'react'; 
 


const API_BASE_URL = process.env.REACT_APP_URL_API
 
    const Like = ({ likes, id_pick, y_nLikes, onClick }) => {
      const currentStep = parseInt(localStorage.getItem('step'), 10);
    const [activeLinkB, setactiveLinkB] = useState('');
    const [activeLink, setactiveLink] = useState('');
    const [nro_pick_like, setpick_like] = useState(likes);
    const [email, setEmail] = useState('');    
    const [ip, setIp] = useState('');

    useEffect(() => {    
    fetchIp();
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);   
       setEmail(parsedUser.email)      
        
      fetch(`${API_BASE_URL}/my_bookmarks?email=${parsedUser.email}`, {
        method: 'GET',      
        headers: {
          'Content-Type': 'application/json'      
        }
      })
      .then(response => response.json())
      .then(data => { 
        if(!data.error && data.data){     
          
          const valueId = data.data.map(item => item.id);
          const exists = valueId.includes(id_pick);
            if(exists){
              setactiveLinkB('bookmark')
            }else{
              setactiveLinkB('')
            } 
         }
      }) 
    } 
 
      setpick_like(likes) 
      if (y_nLikes) {         
        setactiveLink('heart')      
      } 
    }, [id_pick]);
 
    const handleClick = (link) => { 
      if(link === 'heart'){  
        fetchLike(); 
        setactiveLink(link)      
      } 

      if(link === 'bookmark' && email!==''){
        fetchBookmark();    
        setactiveLinkB(link)     
      } 
    
    };

    const fetchLike = async () => {       
      fetch(`${API_BASE_URL}/register_like`, {
        method: 'POST', 
        body: JSON.stringify({ id_pick: id_pick , ip_maq: ip,email: email }),
        headers: {
          'Content-Type': 'application/json'      
        }  
      })
      .then(response => response.json())
      .then(data => { 
        if(!data.error ){    
          setactiveLink(data.other ? 'heart':'')       
          setpick_like(data.data[0].likes) 
        }

      })    
    };
    const fetchIp = async () => {       
      fetch(`https://api.ipify.org?format=json`, {
        method: 'GET',       
      })
      .then(response => response.json())
      .then(data => {  
        setIp(data.ip)
      })    
    };

    
   const fetchBookmark = async () => {  
      fetch(`${API_BASE_URL}/register_bookmarks`, {
        method: 'POST',
        body: JSON.stringify({ id_pick: id_pick, email:email }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(data => {
          if (!data.error) {
            if(data.other){
              setactiveLinkB('bookmark')
            }else{  
              setactiveLinkB('')
            } 
           
          }
        });
    }
  

    const handleLike = () => {
      // Realiza cualquier lógica necesaria para obtener el valor booleano
      const isClicked = true; // Aquí establece el valor booleano que deseas enviar
      onClick(isClicked);
    };
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
    <div className='like'>
           {
  currentStep === 1 ? (
    <>
      <a
        href='javascript:void(0);'
        className={activeLink === 'heart' ? 'activo' : ''}
        onClick={() => { handleClick( 'heart'); handleButtonClick( 'HomeLike'); }}
      >
        <i className="fas fa-heart"></i>
        <p className='font-family-SpaceGrotesk-Light'>{nro_pick_like}</p>
      </a>
      <a
        href='javascript:void(0);'
        className={activeLink === 'share' ? 'activo' : ''}
        onClick={() => { handleClick('share'); handleButtonClick('HomeShare'); }}
        data-toggle="modal"
        data-target="#redes"
      >
        <i className="far fa-share-alt"></i>
        <p className='font-family-SpaceGrotesk-Light'>Share</p>
      </a>
      <a
        href='javascript:void(0);'
        className={activeLinkB === 'bookmark' ? 'activo' : ''}
        onClick={() => { handleClick('bookmark'); handleButtonClick('HomeBookmark'); }}
        data-toggle="modal"
        data-target="#login"
      >
        <i className="far fa-bookmark"></i>
        <p className='font-family-SpaceGrotesk-Light'>Bookmark</p>
      </a>
      <a
        href='javascript:void(0);'
        className={activeLink === 'create' ? 'activo' : ''}
        onClick={() => { handleClick('create'); handleButtonClick('HomeCreate'); }}
        data-toggle="modal"
        data-target="#creapick"
      >
        <i className="fas fa-plus"></i>
        <p className='font-family-SpaceGrotesk-Light'>Create</p>
      </a>
    </>
  ) : currentStep === 2 ? (
    <>
      <a
        href='javascript:void(0);'
        className={activeLink === 'heart' ? 'activo' : ''}
        onClick={() => { handleClick('heart'); handleButtonClick('2ndScreenLike'); }}
      >
        <i className="fas fa-heart"></i>
        <p className='font-family-SpaceGrotesk-Light'>{nro_pick_like}</p>
      </a>
      <a
        href='javascript:void(0);'
        className={activeLink === 'share' ? 'activo' : ''}
        onClick={() => { handleClick('share'); handleButtonClick('2ndScreenShare'); }}
        data-toggle="modal"
        data-target="#redes"
      >
        <i className="far fa-share-alt"></i>
        <p className='font-family-SpaceGrotesk-Light'>Share</p>
      </a>
      <a
        href='javascript:void(0);'
        className={activeLinkB === 'bookmark' ? 'activo' : ''}
        onClick={() => { handleClick('bookmark'); handleButtonClick('2ndScreenBookmark'); }}
        data-toggle="modal"
        data-target="#login"
      >
        <i className="far fa-bookmark"></i>
        <p className='font-family-SpaceGrotesk-Light'>Bookmark</p>
      </a>
      <a
        href='javascript:void(0);'
        className={activeLink === 'create' ? 'activo' : ''}
        onClick={() => { handleClick('create'); handleButtonClick('2ndScreenCreate'); }}
        data-toggle="modal"
        data-target="#creapick"
      >
        <i className="fas fa-plus"></i>
        <p className='font-family-SpaceGrotesk-Light'>Create</p>
      </a>
    </>
  ) : currentStep === 3 ? (
    <>
      <a
        href='javascript:void(0);'
        className={activeLink === 'heart' ? 'activo' : ''}
        onClick={() => { handleClick('heart'); handleButtonClick('3rdScreenLike'); }}
      >
        <i className="fas fa-heart"></i>
        <p className='font-family-SpaceGrotesk-Light'>{nro_pick_like}</p>
      </a>
      <a
        href='javascript:void(0);'
        className={activeLink === 'share' ? 'activo' : ''}
        onClick={() => { handleClick('share'); handleButtonClick('3rdScreenShare'); }}
        data-toggle="modal"
        data-target="#redes"
      >
        <i className="far fa-share-alt"></i>
        <p className='font-family-SpaceGrotesk-Light'>Share</p>
      </a>
      <a
        href='javascript:void(0);'
        className={activeLinkB === 'bookmark' ? 'activo' : ''}
        onClick={() => { handleClick('bookmark'); handleButtonClick('3rdScreenBookmark'); }}
        data-toggle="modal"
        data-target="#login"
      >
        <i className="far fa-bookmark"></i>
        <p className='font-family-SpaceGrotesk-Light'>Bookmark</p>
      </a>
      <a
        href='javascript:void(0);'
        className={activeLink === 'create' ? 'activo' : ''}
        onClick={() => { handleClick('create'); handleButtonClick('3rdScreenCreate'); }}
        data-toggle="modal"
        data-target="#creapick"
      >
        <i className="fas fa-plus"></i>
        <p className='font-family-SpaceGrotesk-Light'>Create</p>
      </a>
      
      <a href='javascript:void(0);' className='soloMovil' data-toggle="modal" data-target="#comentarios"   onClick={() => handleButtonClick('3rdScreenComment')}>
            <i class="fas fa-comment-alt-dots"></i>
            <p className='font-family-SpaceGrotesk-Light'>Comments</p>
          </a>
    </>
  ) : null
}

        </div>  
    );
  
}

export default Like;
