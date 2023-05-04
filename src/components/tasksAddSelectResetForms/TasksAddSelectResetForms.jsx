import { memo } from "react";
import PropTypes from 'prop-types';

import {Row, Col, Button} from 'react-bootstrap';

import styles from'./tasksAddSelectResetForms.module.css';

function TasksAddForm (props){

        return (
            <Row className="justify-content-center">
                <Col>
                    <Button 
                        className={`btn-style mb-5 mt-4 ${styles.btnAdd}`}
                        type="button"
                        onClick={props.showEditableTaskModal}
                    >
                        Add New Task
                    </Button>
                </Col>

                <Col className={props.hasTasks ? "" : "hide"} >
                    <Button 
                        className={`btn-style mb-5 mt-4 mx-4 ${styles.btnSelectAll}`}
                        type="button"
                        onClick={props.selectAllTasks}
                    >
                        Select all
                    </Button>
                </Col>

                <Col className={props.hasTasks ? "" : "hide"}>
                    <Button 
                        className={`btn-style mb-5 mt-4 ${styles.btnReset}`}
                        type="button"
                        onClick={props.resetSelected}
                    >
                        Reset selected
                    </Button>
                </Col>            
            </Row>
        )
    }

TasksAddForm.propTypes = {
    showEditableTaskModal: PropTypes.func.isRequired,
    resetSelected: PropTypes.func.isRequired,
    selectAllTasks: PropTypes.func.isRequired,
}

export default memo(TasksAddForm);
