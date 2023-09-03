import React, {useState, useEffect} from 'react'; 
 
  const Like = (props) => {
    const { likes, id_pick } = props;

    const [activeLink, setactiveLink] = useState('');
    const [pick_like, setpick_like] = useState('');
    const [email, setEmail] = useState(''); 
    useEffect(() => { 
      
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);   
      setEmail(parsedUser.email)      
      }  
      setpick_like(likes)
   
    }, []);
 
    const handleClick = (link) => { 
      if(link === 'heart' && email!==''){
        fetchLike();
        setpick_like(  likes + 1 ) 
        setactiveLink(link)      
      } 

      if(link === 'bookmark' && email!==''){
        fetchBookmark();    
        setactiveLink(link)     
      } 
    
    };

    const fetchLike = async () => {       
      fetch(`http://localhost:3100/register_like`, {
        method: 'POST', 
        body: JSON.stringify({ id_pick: id_pick }),
        headers: {
          'Content-Type': 'application/json'      
        }  
      })
      .then(response => response.json())
      .then(data => { 
        if(data.error ){   
          setpick_like( likes - 1 ) 
        }
      })    
    };

    
   const fetchBookmark = async () => {  
      fetch(`http://localhost:3100/register_bookmarks`, {
        method: 'POST',
        body: JSON.stringify({ id_pick: id_pick, email:email }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(data => {
          if (data.error) {
           
          }
        });
    }
    return (
    <div className='like'>
          <a href='javascript:void(0);' className={activeLink === 'heart' ? 'activo' : ''} onClick={() => handleClick('heart')} data-toggle="modal" data-target="#login">
            <i class="fas fa-heart"></i>
            <p className='font-family-SpaceGrotesk-Light'> {pick_like}</p>
          </a>
          <a href='javascript:void(0);' className={activeLink === 'share' ? 'activo' : ''} onClick={() => handleClick('share')} data-toggle="modal" data-target="#redes">
            <i className="far fa-share-alt"></i>
            <p className='font-family-SpaceGrotesk-Light'>Share</p>
          </a>
          <a href='javascript:void(0);' className={activeLink === 'bookmark' ? 'activo' : ''} onClick={() => handleClick('bookmark')}  data-toggle="modal" data-target="#login">
            <i className="far fa-bookmark"></i>
            <p className='font-family-SpaceGrotesk-Light'>Bookmark</p>
          </a>
          <a href='javascript:void(0);' className={activeLink === 'create' ? 'activo' : ''} onClick={() => handleClick('create')} data-toggle="modal" data-target="#creapick">
            <i className="fas fa-plus"></i>
            <p className='font-family-SpaceGrotesk-Light'>Create</p>
          </a>

          <a href='javascript:void(0);' className='soloMovil' data-toggle="modal" data-target="#comentarios">
            <i class="fas fa-comment-alt-dots"></i>
            <p className='font-family-SpaceGrotesk-Light'>Commets</p>
          </a>
        </div>  
    );
  
}

export default Like;
