import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
const Contact = () => {

  const [formDataForm, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    description: '', 
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    subject: '',
    description: '', 
  });
  const [isChecked, setIsChecked] = useState(false);
  const [isDisable, setIsDisable] = useState(false);

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
    // Enviar el correo o realizar otras acciones con los datos del formulario
    console.log('Formulario enviado:', formDataForm);

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

        fetch(`https://159.89.42.65:3200/send_email_contact`, {
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
    const { name, email, subject, description } = formDataForm;
    let isValid = true;
    const errors = {};

    if (!name.trim()) {
      errors.name = 'Por favor, ingresa tu nombre completo.';
      isValid = false;
    }

    if (!email.trim()) {
      errors.email = 'Por favor, ingresa tu correo electrónico.';
      isValid = false;
    } else if (!isValidEmail(email)) {
      errors.email = 'Por favor, ingresa un correo electrónico válido.';
      isValid = false;
    }

    if (!subject.trim()) {
      errors.subject = 'Por favor, ingresa el asunto del mensaje.';
      isValid = false;
    }

    if (!description.trim()) {
      errors.description = 'Por favor, ingresa la descripción del mensaje.';
      isValid = false;
    }
 
     if (!isChecked) {
      errors.privacyPolicy = 'Debes aceptar las políticas de privacidad.';
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
                    Praesent Maximus Nisl At Interdum Sodales. Fusce Fermentum
                    Ligula Quis Velit Accumsan, Eu Mattis Magna Lobortis.
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
                  <div className="form-group form-check custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className={`custom-control-input ${
                        formErrors.privacyPolicy ? "is-invalid" : ""
                      }`} 
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                    />
                    <label className="font-family-SpaceGrotesk-Medium custom-control-label"  >
                      I Agree To The <a href='#terminos' className='text-morado'>Terms And Conditions</a> and <a href='#politica' className='text-morado'>Privacy Policy</a>
                    </label>
                    {formErrors.privacyPolicy && (
                      <div className="invalid-feedback">
                        {formErrors.privacyPolicy}
                      </div>
                    )}
                  </div>
                </div>
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
