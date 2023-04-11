import { memo } from "react";
import PropTypes from 'prop-types';

import {Row, Col, Button} from 'react-bootstrap';

import styles from'./tasksAddForm.module.css';

function TasksAddForm (props){

        return (
            <Row className="justify-content-center">
                <Col>
                <Button 
                    className={`btn-style mb-5 mt-5 ${styles.btnAdd}`}
                    type="button"
                    onClick={props.showEditableTaskModal}
                >
                    Add New Task
                </Button>
                </Col>
            </Row>
        )
    }

TasksAddForm.propTypes = {
    showEditableTaskModal: PropTypes.func.isRequired
}

export default memo(TasksAddForm);
