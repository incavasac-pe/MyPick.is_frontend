import React, { Component } from 'react';
import twitter from '../img/x-corp-logo.png'

const urlToShare = 'https://www.mypick.is/';
const urlToShareEndFace = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlToShare)}`;  
const urlToShareEndReddit = `https://www.reddit.com/submit?url=${encodeURIComponent(urlToShare)}`;  
const urlToShareEndTwitter = `https://www.reddit.com/submit?url=${encodeURIComponent(urlToShare)}`;  

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
                    <a href='https://twitter.com/mypick_is' target="_blank" className='redes'>
                        <span className='d-block twitter mb-2'><img className="logo-twitter" src={twitter} width={"17px"} ></img></span>
                        X
                    </a>                 
                    <a href={urlToShareEndReddit} target="_blank" className='redes'>
                        <span className='d-block reddit mb-2'><i class="fab fa-reddit-alien"></i></span>
                        Reddit
                    </a> 
                    <a href={urlToShareEndFace} target="_blank" className='redes'>
                        <span className='d-block facebook mb-2'><i class="fab fa-facebook-f"></i></span>
                        Facebook
                    </a>
                </div>
            </div>
        );
    }
}

export default ModalRedes;
