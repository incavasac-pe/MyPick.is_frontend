import React, { Component } from 'react';

class Comments extends Component {

  constructor(props) {
    super(props); 
    this.state = {
      comentarios: [],
      flag: 1,
      id_pick:props.id_pick,
      nuevoComentario: '',
      nuevaRespuesta: '',
      mostrarRespuestas: {},
      mostrarFormularioRespuesta: {},
    };
  }

  fetchDataComments = (id_pick) => {  
        fetch(`http://localhost:3100/list_comments_bypicks?id_pick=${id_pick}`, {
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json'      
          }  
        })
        .then(response => response.json())
        .then(data => { 
          if(data.error){        
            this.setState({ comentarios:[] ,flag:2}); 
          } else {              
              if (data.data) {    
                this.setState({ comentarios: data.data,flag:3 }); // Actualizar el estado con los valores de data.data                 
              }  
          }
        })   
  }

  registerComments = (nuevoComentario) => { 
    const { id_pick } = this.state; 
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
    const parsedUser = JSON.parse(storedUser);    
       
    fetch(`http://localhost:3100/register_comments`, {
      method: 'POST', 
      body: JSON.stringify({ id_pick: id_pick, contenido: nuevoComentario, email:parsedUser.email }),
      headers: {
        'Content-Type': 'application/json'      
      }  
    })
    .then(response => response.json())
    .then(data => {  
          if (data.data) {    
            this.setState({ comentarios: data.data }); // Actualizar el estado con los valores de data.data                 
          }  
      
    })    
  }
}


registerReply = (comentario_id,id_pick,nuevoComentario) => { 
 
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
  const parsedUser = JSON.parse(storedUser);    
     
  fetch(`http://localhost:3100/register_reply`, {
    method: 'POST', 
    body: JSON.stringify({ id_pick:id_pick, comentario_id: comentario_id, contenido: nuevoComentario, email:parsedUser.email }),
    headers: {
      'Content-Type': 'application/json'      
    }  
  })
  .then(response => response.json())
  .then(data => {  
        if (data.data) {    
          this.setState({ comentarios: data.data }); // Actualizar el estado con los valores de data.data                 
        }  
    
  })   
}
}

  handleChangeNuevoComentario = (event) => {
    this.setState({ nuevoComentario: event.target.value });
  };

  agregarComentario = () => {  
    const { nuevoComentario } = this.state;
    this.registerComments(nuevoComentario)
    this.setState( {      
      nuevoComentario: '',
    }); 
  };

  toggleMostrarRespuestas = (id) => {
    this.setState((prevState) => ({
      mostrarRespuestas: {
        ...prevState.mostrarRespuestas,
        [id]: !prevState.mostrarRespuestas[id],
      },
    }));
  };

  toggleMostrarFormularioRespuesta = (id) => {
    this.setState((prevState) => ({
      mostrarFormularioRespuesta: {
        ...prevState.mostrarFormularioRespuesta,
        [id]: !prevState.mostrarFormularioRespuesta[id],
      },
    }));
  };

  handleChangeNuevaRespuesta = (event) => {
    this.setState({ nuevaRespuesta: event.target.value });
  };

  agregarRespuesta = (id) => {
    const {  nuevaRespuesta ,id_pick} = this.state;
 
    this.registerReply(id,id_pick,nuevaRespuesta) 
    this.setState( {      
      nuevaRespuesta: '',
    }); 
  
  };

  render() {
    const { comentarios, nuevoComentario, nuevaRespuesta, mostrarRespuestas, mostrarFormularioRespuesta,id_pick,flag} = this.state;
      if( comentarios.length === 0 && id_pick && flag === 1){
       this.fetchDataComments(id_pick)
      }
    return (
      <div className="wrapper">
        <div className="comment">
          <div className="commet-title">
            <h3 className="text-white font-family-SpaceGrotesk-Bold">Comments </h3>
            <button
                type="button"
                class="close cerrar-modal movil"
                data-dismiss="modal"
              >
                &times;
              </button>
          </div>

          {comentarios.map((comentario) => (
            <div className="box-comentario" key={comentario.id}>
              <div className="content">
                <div className="avatar">
             <img src={`http://localhost:3100/see_photo?img=${comentario.foto}`} alt="user" />
                </div>
                <div className="content-comment">
                  <div className="user">
                    <h5>{comentario.usuario}</h5>
                    <span className="is-mute">{comentario.fecha}</span>
                  </div>
                  <p>{comentario.contenido}</p>
                  <div className="content-footer">
                    <button className="btn btn-outline">
                      <i className="fas fa-heart"></i> 10 Likes
                    </button>                    
                    <button className="btn" onClick={() => this.toggleMostrarFormularioRespuesta(comentario.id)}>
                    <i class="fas fa-reply"></i> Reply
                    </button>
                    {comentario.respuestas.length > 0 && (
                      <button className="btn" onClick={() => this.toggleMostrarRespuestas(comentario.id)}>
                        {mostrarRespuestas[comentario.id] ? 'Hide Replies -' : 'Show Replies +'}
                      </button>
                    )}
                  </div>

                  {mostrarRespuestas[comentario.id] && comentario.respuestas.length > 0 && (
                    <div className='mt-3 mb-3'>
                      {comentario.respuestas.map((respuesta) => (
                        <div key={respuesta.id} className="respuesta">
                          <div className="avatar">
                          <img src={`http://localhost:3100/see_photo?img=${respuesta.foto}`}  alt="user" />
                          </div>
                          <div className='content-comment'>
                            <h5>{respuesta.usuario}</h5>
                            <p>{respuesta.contenido}</p>
                          </div>                          
                        </div>
                      ))}
                    </div>
                  )}

                  {mostrarFormularioRespuesta[comentario.id] && (
                    <div className="nueva-respuesta">
                      <textarea
                        value={nuevaRespuesta}
                        onChange={this.handleChangeNuevaRespuesta}
                        placeholder=""
                      />
                      <div className='text-right mt-3 mb-3'>
                        <button className="login mr-3" onClick={() => this.toggleMostrarFormularioRespuesta(comentario.id)}>
                          Cancel
                        </button>
                        <button className='login' onClick={() => this.agregarRespuesta(comentario.id)}>Reply</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="footer"></div>
            </div>
          ))}
        </div>

        <div className="box-comentario mt-4">
          <textarea
            value={nuevoComentario}
            onChange={this.handleChangeNuevoComentario}
            placeholder="Leave a comment..."
          />
          <div className='text-right'>
            <button className='btn-login' onClick={this.agregarComentario}>comment</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Comments;
