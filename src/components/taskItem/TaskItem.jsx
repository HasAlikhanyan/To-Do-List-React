import { memo, useState } from 'react';
import PropTypes from 'prop-types';

import {Col, Card} from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faBoxArchive, faStar } from '@fortawesome/free-solid-svg-icons';

import {formatDate} from '../../helpers/helpers';

import styles from'./taskItem.module.css';

function TaskItem(props) {
    const {task, onDelete, addSelectedTasksId, showEditableTaskModal, checked} = props;
    
    return (
        <Col lg={4} md={6} xs={12} className = 'justify-content-center mt-3'>
            <Card className={styles.task}>
                <Card.Body className='card-body'>
                    <div className={`mb-2 mt-2 ${styles.titleCheckboxWrapper}`}>
                        <Card.Title 
                            className={styles.title}>
                            {task.title}
                        </Card.Title>

                        <input 
                            className={styles.taskCheckbox}
                            type={'checkbox'}
                            onChange={addSelectedTasksId}
                            checked={checked}
                            />     
                    </div>
                    
                    <Card.Text 
                        className={`${styles.description}`}>
                        {task.description}
                    </Card.Text>

                    <Card.Text 
                        className='mb-1'>
                        <span className={styles.fildsDescription}>Status:</span> {task.status}
                    </Card.Text>

                    <Card.Text 
                        className='mb-1'>
                        <span className={styles.fildsDescription}>Created at:</span> {formatDate(task.created_at)}
                    </Card.Text>

                    <Card.Text 
                        className='mb-1'>
                        <span className={styles.fildsDescription}>Deadline:</span> {formatDate(task.date)}
                    </Card.Text>

                    <div className={styles.iconsWrapper}>
                        <FontAwesomeIcon  
                            icon={faEdit} 
                            className={`fas ${styles.editIcon}`}
                            onClick={showEditableTaskModal}
                        />

                        <FontAwesomeIcon  
                            icon={faBoxArchive} 
                            className={`fa-solid fa-xl ${styles.archiveIcon}`}
                            onClick={onDelete}
                        />
                    </div>
                </Card.Body>
            </Card>
        </Col>
    )
}

TaskItem.propTypes = {
    task: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    addSelectedTasksId: PropTypes.func.isRequired,
    showEditableTaskModal: PropTypes.func.isRequired,
    checked:PropTypes.bool.isRequired
}
    
export default memo(TaskItem);