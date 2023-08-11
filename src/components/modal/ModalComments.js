import React, { Component } from 'react';

class ModalComments extends Component {
    render() {
        return (
            <div>
                <div className="row">
                <div className="col-md-12 position-relative">
                <h3 className="font-family-SpaceGrotesk-Bold text-white text-left">
                    Create your own pick
                </h3>
                <button
                    type="button"
                    class="close cerrar-modal"
                    data-dismiss="modal"
                >
                    &times;
                </button>
                </div>
                <div className="col-md-12 text-left">
                <p className="font-family-SpaceGrotesk-Medium">
                    Craft your very own picks and share it with your friends!
                </p>
                <form>
                    <div className="form-group">
                    <label for="magic">Pick Name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Pick Name"
                        id="magic"
                        name="magic"
                    />
                    <span className="icon fas fa-magic fa-lg"></span>
                    </div>
                    <div className="align-items-center d-flex form-group justify-content-center select-topic">
                    <label for="topic">Select Topic</label>
                    <span className="icon fas fa-check-double fa-lg"></span>
                    <select className="form-control" id="topic" name="topic">
                        <option selected className="d-none">
                        Select Topic
                        </option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                    </select>
                    </div>
                </form>
                </div>
            </div>
            </div>
        );
    }
}

export default ModalComments;
