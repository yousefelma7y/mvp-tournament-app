import React from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './LoadingSpinner.css';

const ErrorModal = props => {
  return (
    <Modal
    onHide={props.onClear}
    header="An Error Occurred!"
    show={!!props.error} 
    className="main-content "
    >    
      <Modal.Header className=' p-4'>
        <Modal.Title className="text-shadow">
          <p>{props.error}</p> 
        </Modal.Title>
      </Modal.Header>
      <Modal.Footer className='row justify-content-center p-4'>
        <Button onClick={props.onClear} className="col-8 p-3 modal-delete-btn rounded text-center fw-bold">Okay</Button>
      </Modal.Footer>

    </Modal>
  );
};

export default ErrorModal;
