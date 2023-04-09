import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ConfirmDialog (props) {
        return (
            <Modal className='modal'
                size="sm"
                show={true}
                onHide = {props.hideModal}
            >
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    Are you sure to delete the selected {props.selectedTasksNumber} {props.selectedTasksNumber > 1 ? "tasks" : "task"}?
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-evenly">
                    <Button
                        onClick={props.hideModal} 
                        variant='secondary'
                    >
                        Cancel
                    </Button>
                    <Button 
                        className='btn-modal-save-changes'
                        onClick={props.onDelete}
                    >
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }

export default ConfirmDialog;
