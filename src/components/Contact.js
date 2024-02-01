import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
const API_BASE_URL = process.env.REACT_APP_URL_API
const Contact = () => {

  const [formDataForm, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    description: '', 
    privacyPolicy: false,
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    subject: '',
    description: '', 
    privacyPolicy: '',
  });
    const [isDisable, setIsDisable] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
 
   
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;  
    const fieldValue = type === 'checkbox' ? checked : value;
    setFormData((prevData) => ({ ...prevData, [name]: fieldValue }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };
  
  const handleCheckboxChange = () => {   
    setIsChecked(!isChecked);   
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    setIsDisable(true)
   
    const html = `
<!DOCTYPE html>
<html>
<head> 
</head>
<body>
<table>
  <tr>
    <th>Name:</th>
    <td>${formDataForm.name}</td>
  </tr>
  <tr>
    <th>Subject:</th>
    <td>${formDataForm.subject}</td>
  </tr>
  <tr>
    <th>Email:</th>
    <td>${formDataForm.email}</td>
  </tr>
  <tr>
  <th>Description:</th>
  <td>${formDataForm.description}</td>
</tr> 
</table>
</body>
</html>`;
    const formDataSend = new FormData();
       formDataSend.append("content", html );
       formDataSend.append("subject", `My Picks Contact Request`);
       formDataSend.append("to", "contactmypickdev.is@gmail.com");   

        fetch(`${API_BASE_URL}/send_email_contact`, {
          method: 'POST', 
           body: formDataSend,          
        })
        .then(response => response.json())
        .then(data => { 
          if(!data.error){   
              toast.success('Contact request sent', {
                position: toast.POSITION.TOP_RIGHT
            });
            
          } else {            
            toast.error("An error has occurred"); 
          }
          setIsDisable(false)
      }).catch(() => {          
          toast.error("An error has occurred"); 
          setIsDisable(false)
        }); 

  };

  const validateForm = () => {
    const { name, email, subject, description  } = formDataForm;
    let isValid = true;
    const errors = {};

    if (!name.trim()) {
      errors.name = 'Please enter your full name.';
      isValid = false;
    }

    if (!email.trim()) {
      errors.email = 'Please enter your email.';
      isValid = false;
    } else if (!isValidEmail(email)) {
      errors.email = 'Please enter a valid email.';
      isValid = false;
    }

    if (!subject.trim()) {
      errors.subject = 'Please enter the subject of the message.';
      isValid = false;
    }

    if (!description.trim()) {
      errors.description = 'Please enter the message description.';
      isValid = false;
    }
 
     if (!isChecked) {
      errors.privacyPolicy = 'You must accept the privacy policies.';
      isValid = false;
    } 

    setFormErrors(errors);
    return isValid;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return emailRegex.test(email);
  };

  return (
    <div className="container contenido">
      <div className="row">
        <div className="col-md-12 mb-4">
          <h1 className="text-center text-white titulo font-family-SpaceGrotesk-Light">
            Contact
          </h1>
        </div>
        <div className="col-md-10 m-auto">
          <div className="box-contacto">
            <form onSubmit={handleSubmit}>
              <div className="row"> 
               <ToastContainer position="top-center" autoClose={3000} closeOnClick theme="dark"/>  
                <div className='col-md-12'>
                  <p className='text-white font-family-SpaceGrotesk-Light'>
                  Connect with us at Mypick.is for support, consultation and collaboration.
                  </p>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label  className='font-family-SpaceGrotesk-Medium'>Complete Name</label>
                    <input
                      type="text"
                      className={`form-control ${
                        formErrors.name ? "is-invalid" : ""
                      }`}
                      id="name"
                      name="name"
                      value={formDataForm.name}
                      onChange={handleChange}
                    />
                    {formErrors.name && (
                      <div className="invalid-feedback">{formErrors.name}</div>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label  className='font-family-SpaceGrotesk-Medium'>Email</label>
                    <input
                      type="email"
                      className={`form-control ${
                        formErrors.email ? "is-invalid" : ""
                      }`}
                      id="email"
                      name="email"
                      value={formDataForm.email}
                      onChange={handleChange}
                    />
                    {formErrors.email && (
                      <div className="invalid-feedback">{formErrors.email}</div>
                    )}
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label  className='font-family-SpaceGrotesk-Medium'>Subject</label>
                    <input
                      type="text"
                      className={`form-control ${
                        formErrors.subject ? "is-invalid" : ""
                      }`}
                      id="subject"
                      name="subject"
                      value={formDataForm.subject}
                      onChange={handleChange}
                    />
                    {formErrors.subject && (
                      <div className="invalid-feedback">
                        {formErrors.subject}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label className='font-family-SpaceGrotesk-Medium'>Description</label>
                    <textarea
                      className={`form-control ${
                        formErrors.description ? "is-invalid" : ""
                      }`}
                      id="description"
                      name="description"
                      rows="4"
                      value={formDataForm.description}
                      onChange={handleChange}
                    ></textarea>
                    {formErrors.description && (
                      <div className="invalid-feedback">
                        {formErrors.description}
                      </div>
                    )}
                  </div>
                </div>
            
                <div className="col-md-12">
                      <div class="custom-control form-control-lg custom-checkbox row_space">  
                      <label class="form-check-label">
                    <input type="checkbox" class="custom-control-input" id="customCheck1"  checked={isChecked} onChange={handleCheckboxChange}/>  
                  
                    <label className="custom-control-label font-family-SpaceGrotesk-Medium"  for="customCheck1">
                            I Agree To The <a href='https://www.mypick.is/terms' className='text-morado'>Terms And Conditions</a> and <a href='https://www.mypick.is/privacy' className='text-morado'>Privacy Policy</a>
                          </label>
                      {formErrors.privacyPolicy && (
                          <div className="invalid-feedback show_message">
                            {formErrors.privacyPolicy}
                          </div>
                        )}
                          </label>

                </div>   
                </div>
                <br/>   <br/>
                <div className="col-md-12">
                  <button type="submit" disabled={isDisable} className="btn btn-enviar font-family-SpaceGrotesk-Bold">
                  Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
