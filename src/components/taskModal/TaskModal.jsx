import { memo, useState, useEffect} from 'react';
import Proptypes from 'prop-types';
import DatePicker from "react-datepicker";

import {Button, Form} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import {formatDate} from '../../helpers/helpers';

import styles from './taskModal.module.css';

function TaskModal(props) {
    const {addTask, hideModal, changeEditableTask, task} = props;

    const [title="", setTitle] = useState("");
    const [description, setDescription] = useState("");  
    const [date, setDate] = useState(new Date());   
    const [isTitleValid, setIsTitleValid] = useState(false);
    const [hasSomethingChanged, setHasSomethingChanged] = useState(false);

    useEffect(()=>{
        if(task){
            setTitle(task.title);
            setDescription(task.description);
            setDate(task.date ? new Date(task.date) : new Date());
            setIsTitleValid(true);
        }
    }, [task]);

    const onAdd = () => {
        if (!title.trim()) {
            return;      
        }

        addTask(title, description, formatDate(date));

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
        if (!title.trim() || !hasSomethingChanged) {
            return;      
        }
        
        const updateTask = {
            ...task,
            title,
            description,
            date: formatDate(date)
        }

        changeEditableTask(updateTask);
        setTitle("");
        setDescription("");
        hideModal();
    };

    const onTitleChange = (e)=> {
        const {value} = e.target;
        const trimmedTitle = value.trim();

        setIsTitleValid(!!trimmedTitle);
        setTitle(value);
        setHasSomethingChanged(true);
    }

    const onDescriptionChange = (e)=> {
        const {value} = e.target;

        setDescription(value);
        setHasSomethingChanged(true);
    }

    const onDateChange = (date)=> {
        setDate(date);
        setHasSomethingChanged(true);
    }

    return (
        <Modal
            size="lg"
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
                    onChange={onDescriptionChange}
                />
                <h6 className= 'mx-1'>Deadline</h6>
                <DatePicker
                    className= 'mx-1'
                    showIcon
                    selected={date}
                    onChange={onDateChange}
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
                    className={hasSomethingChanged && !!title.trim() ? `btn-modal-save-changes btn-style ` : `btn-disabled btn-style`}
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
