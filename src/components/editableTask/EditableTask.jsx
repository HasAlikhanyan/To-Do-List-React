import {Button, Form} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

import styles from './editableTask.module.css'

function EditableTask(props) {
    return (
        <Modal
            size="md"
            show={props.isOpenModal}
        >
            <Modal.Header 
                closeButton
                onClick={props.hideModal}
            >
                <Modal.Title className={styles.title}>Input changes</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form.Control className={`mb-2 ${styles.textArea}`}
                    as="textarea"
                    placeholder="Input Task"
                />
                <Form.Control
                    className={styles.textArea}
                    as="textarea"
                    placeholder="Input Description"
                />
            </Modal.Body>
        
            <Modal.Footer className="d-flex justify-content-evenly">
                <Button 
                    variant='secondary'
                    onClick={props.hideModal}
                >
                    Cancel
                </Button>
                <Button className='btn-modal-save-changes'>Save Changes</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default EditableTask;