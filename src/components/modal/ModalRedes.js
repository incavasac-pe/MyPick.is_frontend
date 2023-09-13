import React, { Component } from 'react';

class ModalRedes extends Component {
    render() {
        return (
            <div className='row'>
                <div className="col-md-12 position-relative">
                    <h3 className="font-family-SpaceGrotesk-Bold text-white text-left">
                        Share your pick!
                    </h3>
                    <button type="button" class="close cerrar-modal" data-dismiss="modal">&times;</button>
                </div>
                <div className='col-md-12 mb-5'>
                    <p className="font-family-SpaceGrotesk-Medium">
                        Thanks for your vote, share this pick with your friends!
                    </p>
                </div>
                <div className='col-md-12 d-flex align-items-center justify-content-around mb-3 font-family-SpaceGrotesk-Bold'>
                    <a href='#' target="_blank" className='redes'>
                        <span className='d-block twitter mb-2'><i class="fab fa-twitter"></i></span>
                        Twitter
                    </a>
                  {/*   <a href='#' className='redes'>
                        <span className='d-block whatsapp mb-2'><i class="fab fa-whatsapp"></i></span>
                        Whatsapp
                    </a> */}
                    <a href='#' className='redes'>
                        <span className='d-block reddit mb-2'><i class="fab fa-reddit-alien"></i></span>
                        Reddit
                    </a>
                    <a href='https://es-la.facebook.com/' className='redes'>
                        <span className='d-block facebook mb-2'><i class="fab fa-facebook-f"></i></span>
                        Facebook
                    </a>
                </div>
            </div>
        );
    }
}

export default ModalRedes;
