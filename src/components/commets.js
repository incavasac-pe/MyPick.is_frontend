import React, { Component } from 'react';

class Comments extends Component {

  constructor(props) {
    super(props);
    this.state = {
      comentarios: [],
    /*   comentarios: [
        {
          id: 1,
          usuario: 'Comment as cawong',
          contenido:
            'Serious astronomy fanatic like a lot of us are, you can probably remember that one event in childhood that started you along this exciting hobby.',
          fecha: '20 ENE 2023',
          respuestas: [],
        },
        {
          id: 2,
          usuario: 'Cameron Williamson',
          contenido:
            'Serious astronomy fanatic like a lot of us are, you can probably remember that one event in childhood that started you along this exciting hobby.',
          fecha: '17 JUN 2023',
          respuestas: [
            {
              id: 1,
              usuario: 'Bessie Cooper',
              contenido: 'Serious astronomy fanatic like.',
              fecha: '17 JUN 2023',
            },
            {
              id: 2,
              usuario: 'Kathryn Murphy',
              contenido: 'Serious astronomy fanatic like.',
              fecha: '17 JUN 2023',
            },
          ],
        },
      ], */
      id_pick:4,
      nuevoComentario: '',
      nuevaRespuesta: '',
      mostrarRespuestas: {},
      mostrarFormularioRespuesta: {},
    };
  }


  fetchDataComments = () => {
    console.log("buscar el top")
        fetch(`http://localhost:3100/list_comments_bypicks?id_pick=${this.id_pick}`, {
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json'      
          }  
        })
        .then(response => response.json())
        .then(data => { 
          if(data.error){        
            this.setState({ comentarios:[] }); 
          } else {              
              if (data.data) {    
                this.setState({ comentarios: data.data }); // Actualizar el estado con los valores de data.data                 
              }  
          }
        }).catch(error => {
          // Manejar el error en caso de que ocurra
          console.error('Error:', error);
        });   
  }


  handleChangeNuevoComentario = (event) => {
    this.setState({ nuevoComentario: event.target.value });
  };

  agregarComentario = () => {
    const { comentarios, nuevoComentario } = this.state;
    const nuevoComentarioObj = {
      id: comentarios.length + 1,
      usuario: 'Usuario Personalizado',
      contenido: nuevoComentario,
      fecha: '26 JUN 2023',
      respuestas: [],
    };
    this.setState((prevState) => ({
      comentarios: [...prevState.comentarios, nuevoComentarioObj],
      nuevoComentario: '',
    }));
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
    const { comentarios, nuevaRespuesta } = this.state;
    const comentarioIndex = comentarios.findIndex((comentario) => comentario.id === id);
    const comentario = comentarios[comentarioIndex];
    const nuevaRespuestaObj = {
      id: comentario.respuestas.length + 1,
      usuario: 'Usuario Personalizado',
      contenido: nuevaRespuesta,
      fecha: '26 JUN 2023',
    };
    const comentariosActualizados = [
      ...comentarios.slice(0, comentarioIndex),
      {
        ...comentario,
        respuestas: [...comentario.respuestas, nuevaRespuestaObj],
      },
      ...comentarios.slice(comentarioIndex + 1),
    ];
    this.setState({
      comentarios: comentariosActualizados,
      nuevaRespuesta: '',
    });
  };

  render() {
    const { comentarios, nuevoComentario, nuevaRespuesta, mostrarRespuestas, mostrarFormularioRespuesta } = this.state;
      if( comentarios.length === 0){
      this.fetchDataComments()
      }
    return (
      <div className="wrapper">
        <div className="comment">
          <div className="commet-title">
            <h3 className="text-white font-family-SpaceGrotesk-Bold">Comments {comentarios.length}</h3>
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
                  <img src={require('./img/user.jpg')} alt="user" />
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
                            <img src={require('./img/user.jpg')} alt="user" />
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
                        placeholder="@CameronWilliamson"
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
