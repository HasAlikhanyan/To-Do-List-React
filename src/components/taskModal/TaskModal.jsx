import { PureComponent } from 'react';
import Proptypes from 'prop-types';

import {Button, Form} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

import styles from './taskModal.module.css'

class TaskModal extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            title: this.props.task.title,
            description: this.props.task.description
        }
    }

    onChangeValue = (e) => {
        this.setState({  
            [e.target.name] : e.target.value 
        })
    }

    onAdd = (e) => {
        if (!this.state.title.trim() || !this.state.description.trim()) {
            return;      
        }

        this.props.onAdd(this.state.title, this.state.description);

        this.setState({
            title: '',
            description: ''
        })
        this.props.hideModal();  
    }

    handleInputKeyDown = (event) => {
        if(event.keyCode === 13) {
            this.onAdd();
        }
    };
    
    cancelChanges = () => {
        this.setState({
            title : "",
            description: ""
        })
        this.props.hideModal();
    }

    saveChanges = () => {
        if (!this.state.title.trim() || !this.state.description.trim()) {
            return;      
        }
        this.props.hideModal();
        this.props.changeEditableTask(this.state.title, this.state.description, this.props.task._id);
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
                    <Modal.Title className={styles.title}>Input Task</Modal.Title>
                </Modal.Header>
    
                <Modal.Body>
                    <Form.Control 
                        className={`mb-2 ${styles.textArea}`}
                        as="textarea"
                        name = "title"
                        value={title}
                        onChange={this.onChangeValue}
                    />
                    <Form.Control
                        className={styles.textArea}
                        as="textarea"
                        name = "description"
                        value={description}
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
                        onClick = {this.props.task.title ? this.saveChanges : this.onAdd}
                    >
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }       
} 

TaskModal.propTypes = {
    onAdd: Proptypes.func.isRequired,
    isOpenModal: Proptypes.bool.isRequired,
    hideModal: Proptypes.func.isRequired,
    changeEditableTask: Proptypes.func.isRequired,
    task: Proptypes.object.isRequired
}
    
export default TaskModal;