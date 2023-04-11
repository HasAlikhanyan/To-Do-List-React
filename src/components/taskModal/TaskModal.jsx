import { PureComponent } from 'react';
import Proptypes from 'prop-types';

import {Button, Form} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

import styles from './taskModal.module.css'

class TaskModal extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            description: ""
        }
    }
    
    onChangeValue = (e) => {
        this.setState({  
            [e.target.name] : e.target.value 
        })        
    }

    cancelChanges = () => {
        this.setState({
            title : "",
            description: ""
        })
        this.props.hideModal();
    }

    saveChanges = () => {
        this.props.hideModal();
        this.props.changeEditableTask(this.state.title || this.props.task.title, 
                                        this.state.description || this.props.task.description, 
                                        this.props.task._id);
        this.setState({
            title : "",
            description: ""
        })
    }

    render() {
        const {title, description} = this.state;
        return (
            <Modal
                size="md"
                show={true}
                onHide={this.cancelChanges}
            >
                <Modal.Header closeButton>
                    <Modal.Title className={styles.title}>Input changes</Modal.Title>
                </Modal.Header>
    
                <Modal.Body>
                    <Form.Control 
                        className={`mb-2 ${styles.textArea}`}
                        as="textarea"
                        name = "title"
                        value={title ? title: this.props.task.title}
                        onChange={this.onChangeValue}
                    />
                    <Form.Control
                        className={styles.textArea}
                        as="textarea"
                        name = "description"
                        value={description ? description : this.props.task.description}
                        onChange={this.onChangeValue}

                    />
                </Modal.Body>
            
                <Modal.Footer className="d-flex justify-content-evenly">
                    <Button 
                        variant='secondary'
                        onClick={this.cancelChanges}                      
                    >
                        Cancel
                    </Button>
                    <Button 
                        className='btn-modal-save-changes'
                        onClick = {this.saveChanges}
                    >
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }       
} 

TaskModal.propTypes = {
    isOpenModal: Proptypes.bool.isRequired,
    hideModal: Proptypes.func.isRequired,
    changeEditableTask: Proptypes.func.isRequired,
    task: Proptypes.object.isRequired
}
    

export default TaskModal;