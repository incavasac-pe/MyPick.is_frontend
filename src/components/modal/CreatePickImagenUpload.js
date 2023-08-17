import React, { useState } from 'react';

const CreatePickImagenUpload = () => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');

  const handleImageChange1 = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage1(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleImageChange2 = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage2(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className='row'>
      {/* Primer cuadro */}
      <div className='col-md-6 mb-3'>
        <div className='boxUpload'>
            <input
            type="file"
            id="fileInput1"
            style={{ display: 'none' }}
            onChange={handleImageChange1}
            />
            <label   style={{ display: 'block' }} className='uploadPick'>
            {image1 ? (
                <img src={image1} alt="Pick"/>
            ) : (
                <span><i class="fas fa-plus"></i></span>
            )}
            </label>
            <input className='font-family-SpaceGrotesk-Bold'
            type="text"
            value={text1}
            onChange={(e) => setText1(e.target.value)}
            placeholder="Type your choice..."
            />
        </div>        
      </div>

      {/* Segundo cuadro */}
      <div className='col-md-6 mb-3'>
        <div className='boxUpload'>
            <input
            type="file"
            id="fileInput2"
            style={{ display: 'none' }}
            onChange={handleImageChange2}
            />
            <label   style={{ display: 'block' }} className='uploadPick'>
            {image2 ? (
                <img src={image2} alt="Pick" />
            ) : (
                <span><i class="fas fa-plus"></i></span>
            )}
            </label>
            <input className='font-family-SpaceGrotesk-Bold'
            type="text"
            value={text2}
            onChange={(e) => setText2(e.target.value)}
            placeholder="Type your choice..."
            />
        </div>        
      </div>
    </div>
  );
};

export default CreatePickImagenUpload;
