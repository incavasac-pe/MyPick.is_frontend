 const AuthLogin =  (props) => {
  const { label } = props;
  return (
    <div>     
        <div>
          <div className="row">
            <div className="col-md-12 position-relative">
              <h3 className="font-family-SpaceGrotesk-Bold text-white text-center">
              {label}
              </h3>
              <button type="button" class="close cerrar-modal" data-dismiss="modal">&times;</button>
            </div>
            <div className="col-md-12 text-center">
              <p className="font-family-SpaceGrotesk-Medium">
               Sorry, to continue, you must login.
              </p>             
            </div>
          </div>        
        </div> 
    </div>
  );
};

export default AuthLogin;