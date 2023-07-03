import { Button, Modal } from "react-bootstrap";

function DeleteConfirmation(props) {
    return (
      <>
        <Modal show={props.showModal} onHide={()=> { props.closeConfirmDeletePopupHandler() }}>
          <Modal.Header closeButton>
            <Modal.Title>{props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{props.body}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={()=> { props.closeConfirmDeletePopupHandler() }}>
              Close
            </Button>
            <Button variant="danger" onClick={()=> { props.deleteConfirmHandler() }}>
              Confirm Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
  export default DeleteConfirmation;
  