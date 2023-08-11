import React, { Component } from 'react';

class like extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeLink: null
    };
  }
  

  handleClick = (link) => {
    this.setState({ activeLink: link });
  };

  render() {
    const { activeLink } = this.state;

    return (
        <div className='like'>
            <a href='javascript:void(0);' className={activeLink === 'heart' ? 'activo' : ''} onClick={() => this.handleClick('heart')}>
            {/* <i className="far fa-heart"></i> */}
            <i class="fas fa-heart"></i>
            <p className='font-family-SpaceGrotesk-Light'>2134</p>
            </a>
            <a href='javascript:void(0);' className={activeLink === 'share' ? 'activo' : ''} onClick={() => this.handleClick('share')} data-toggle="modal" data-target="#redes">
            <i className="far fa-share-alt"></i>
            <p className='font-family-SpaceGrotesk-Light'>Share</p>
            </a>
            <a href='javascript:void(0);' className={activeLink === 'bookmark' ? 'activo' : ''} onClick={() => this.handleClick('bookmark')}>
            <i className="far fa-bookmark"></i>
            <p className='font-family-SpaceGrotesk-Light'>Bookmark</p>
            </a>
            <a href='javascript:void(0);' className={activeLink === 'create' ? 'activo' : ''} onClick={() => this.handleClick('create')} data-toggle="modal" data-target="#creapick">
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
}

export default like;
