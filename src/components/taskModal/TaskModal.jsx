import { memo, useState } from 'react';
import Proptypes from 'prop-types';
import DatePicker from "react-datepicker";

import {Button, Form} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

import styles from './taskModal.module.css';

function TaskModal(props) {
    const {addTask, hideModal, changeEditableTask, task} = props;

    const [title="", setTitle] = useState(task.title);
    const [description="", setDescription] = useState(task.description);  
    const [date, setDate] = useState(new Date());   
    const [isTitleValid, setIsTitleValid] = useState(false);

    const onAdd = () => {
        if (!title.trim()) {
            return;      
        }

        addTask(title, description, date.toISOString().slice(0, 10));

        setTitle("");
        setDescription("");

        hideModal();  
    };
    
    const cancelChanges = () => {
        setTitle("");
        setDescription("");

        hideModal();
    };

    const saveChanges = () => {
        if (!title.trim()) {
            return;      
        }

        changeEditableTask(title, description, date.toISOString().slice(0, 10), task._id);
        setTitle("");
        setDescription("");
        hideModal();
    };

    const onTitleChange = (e)=> {
        const {value} = e.target;
        const trimmedTitle = value.trim();

        setIsTitleValid(!!trimmedTitle);

        setTitle(value);
    }

    return (
        <Modal
            size="md"
            show={true}
            onHide={cancelChanges}
        >
            <Modal.Header closeButton>
                <Modal.Title className={styles.title}>Input Task</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form.Control 
                    className={`mb-3 ${!isTitleValid ? styles.invalid : ""}`}
                    placeholder='title'
                    value={title}
                    onChange={onTitleChange}
                />
                <Form.Control
                    className={`mb-3 ${styles.textArea}`}
                    as="textarea"
                    placeholder='description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <h6 className= 'mx-1'>Deadline</h6>
                <DatePicker
                    className= 'mx-1'
                    showIcon
                    selected={date}
                    onChange={setDate}
                />
            </Modal.Body>
        
            <Modal.Footer className="d-flex justify-content-evenly">
                <Button 
                    variant='secondary'
                    onClick={cancelChanges}                      
                >
                    Cancel
                </Button>
                <Button 
                    className={`btn-modal-save-changes btn-style `}
                    onClick = {task.title ? saveChanges : onAdd}
                >
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

TaskModal.propTypes = {
    addTask: Proptypes.func.isRequired,
    hideModal: Proptypes.func.isRequired,
    changeEditableTask: Proptypes.func.isRequired,
    task: Proptypes.object
}
export default memo(TaskModal);
