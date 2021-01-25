
import React, {useState} from "react";

import { Modal, Button } from 'react-bootstrap';
function MessageBox(props) {
  //const [isSuccess, setisSuccess] = useState(true);
 
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className={props.isSuccess ? 'message-box-success' : 'message-box-error'}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <i className={props.isSuccess ? 'fa fa-thumbs-up' : 'fa fa-warning'}></i>
             {props.heading}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>{props.message}</strong></p>
          {/* <p>
            {props.message}
            hello bilal
          </p> */}
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-dark" onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  

  export default MessageBox