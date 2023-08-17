import React, { useState } from 'react';
import CreatePickImagenUpload from './CreatePickImagenUpload';

const CreatePick = () => {
  const [showBox1, setShowBox1] = useState(true);
  const [showBox2, setShowBox2] = useState(false);

  const handleShowBox2 = () => {
    setShowBox1(false);
    setShowBox2(true);
  };

  const handleShowBox1 = () => {
    setShowBox1(true);
    setShowBox2(false);
  };

  return (
    <div>
      {showBox1 && (
        <div>
          <div className="row">
            <div className="col-md-12 position-relative">
              <h3 className="font-family-SpaceGrotesk-Bold text-white text-left">
                Create your own pick
              </h3>
              <button type="button" class="close cerrar-modal" data-dismiss="modal">&times;</button>
            </div>
            <div className="col-md-12 text-left">
              <p className="font-family-SpaceGrotesk-Medium">
                Craft your very own picks and share it with your friends!
              </p>
              <form>                
                <div className="align-items-center d-flex form-group justify-content-center select-topic mb-5">
                  <label>Select Topic</label>
                  <span className="icon fas fa-magic fa-lg"></span>                  
                  <select className="form-control" id="topic" name="topic">
                    <option selected className="d-none">
                      Select Topic
                    </option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                  </select>
                </div>
                <button type="button" className="btn btn-login-modal font-family-SpaceGrotesk-Bold"  onClick={handleShowBox2}>
                  Next
                </button>
              </form>
            </div>
          </div>        
        </div>
      )}

      {showBox2 && (
        <div className='row'>
            <div className='col-md-12 position-relative'>
                <h3 className='font-family-SpaceGrotesk-Bold text-white text-left'>
                <button onClick={handleShowBox1} className='btn-back'><i class="far fa-arrow-left"></i></button>
                    Add your choices
                </h3>
                <button type="button" class="close cerrar-modal" data-dismiss="modal">&times;</button>
            </div>
            <div className='col-md-12'>
                <p className="font-family-SpaceGrotesk-Medium text-left">
                    Craft your very own picks and share it with your friends!
                </p>
            </div>

            <div className='col-md-12'><CreatePickImagenUpload /></div>
                     
            <div className='col-md-12'>
                <form>
                    <div className='form-group'>
                        <button type="button" className="btn btn-login-modal font-family-SpaceGrotesk-Bold">
                            Publish My Picks
                        </button>
                    </div>
                </form>
            </div>         
        </div>
      )}
    </div>
  );
};

export default CreatePick;
