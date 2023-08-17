import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    setFormData((prevData) => ({ ...prevData, [name]: fieldValue }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Enviar el correo o realizar otras acciones con los datos del formulario
    console.log('Formulario enviado:', formData);
  };

  const validateForm = () => {
    const { name, email, subject, description, privacyPolicy } = formData;
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

    if (!privacyPolicy) {
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
                      value={formData.name}
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
                      value={formData.email}
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
                      value={formData.subject}
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
                      value={formData.description}
                      onChange={handleChange}
                    ></textarea>
                    {formErrors.description && (
                      <div className="invalid-feedback">
                        {formErrors.description}
                      </div>
                    )}
                  </div>
                </div>
                {/* <div class="custom-control custom-checkbox mr-sm-2">
                  <input type="checkbox" class="custom-control-input" id="customControlAutosizing" />
                  <label class="custom-control-label" for="customControlAutosizing">Remember my preference</label>
                </div> */}
                <div className="col-md-12">
                  <div className="form-group form-check custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className={`custom-control-input ${
                        formErrors.privacyPolicy ? "is-invalid" : ""
                      }`}
                      id="privacyPolicy"
                      name="privacyPolicy"
                      checked={formData.privacyPolicy}
                      onChange={handleChange}
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
                  <button type="submit" className="btn btn-enviar font-family-SpaceGrotesk-Bold">
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
