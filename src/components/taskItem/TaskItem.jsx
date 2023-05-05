import { memo} from 'react';
import PropTypes from 'prop-types';

import {Col, Card} from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit,
        faBoxArchive, 
        faStar,
        faCheck,
        faHistory,
        } from '@fortawesome/free-solid-svg-icons';

import {Link} from 'react-router-dom';

import {formatDate} from '../../helpers/helpers';

import styles from'./taskItem.module.css';

function TaskItem(props) {
    const {task, onDelete, addSelectedTasksId, showEditableTaskModal, checked, onStatusChange} = props;

    const newTask = {
        title: task.title, 
        description: task.description, 
        date:formatDate(task.date), 
        created_at: formatDate(task.created_at),
        _id: task._id
    }
    
    return (
        <Col lg={4} md={6} xs={12} className = 'justify-content-center mt-3'>
            <Card className={styles.task} >
                <Card.Body className='card-body'>
                    <div className={`mb-2 ${styles.titleCheckboxWrapper}`}>
                        <Card.Title 
                            className={`${styles.title} ${styles.elipsis}`}>
                            {task.title}
                        </Card.Title> 
                        <input 
                            className={styles.taskCheckbox}
                            type={'checkbox'}
                            title='Select the task'
                            onChange={addSelectedTasksId}
                            checked={checked}
                            />     
                    </div>

                    
                    <Card.Text 
                        className={`${styles.description} ${styles.elipsis}`}>
                        {task.description}
                    </Card.Text>

                    <Card.Text 
                        className='mb-1'>
                        <span className={styles.fildsDescription}
                        >Status: </span>{task.status}
                        {task.status === "active" &&   <FontAwesomeIcon 
                            icon={faStar}
                            className={`fas mt-1 ${styles.statusActiveStar}`}>
                        </FontAwesomeIcon>}
                    </Card.Text>

                    <Card.Text 
                        className='mb-1'>
                        <span className={styles.fildsDescription}>Created at:</span> {formatDate(task.created_at)}
                    </Card.Text>

                    <Card.Text 
                        className='mb-1'>
                        <span className={styles.fildsDescription}>Deadline:</span> {formatDate(task.date)}
                    </Card.Text>

                    <Link to={`/task/${task._id}`} className={styles.showDetails}>
                        <Card.Text>Show details</Card.Text>
                    </Link>

                    <div className={`mt-3 ${styles.iconsWrapper}`}>
                    {
                        task.status === 'active' ?
                        <FontAwesomeIcon
                        className={styles.statusActive} 
                            icon={faCheck}
                            title="Mark as done" 
                            onClick={() => onStatusChange({...newTask, status: 'done'})}>
                        </FontAwesomeIcon> :
                        <FontAwesomeIcon 
                            className={styles.statusDone} 
                            icon={faHistory}
                            title="Mark as active" 
                            variant="info" 
                            onClick={() => onStatusChange({...newTask, status: 'active'})}>
                        </FontAwesomeIcon>
                    }
                        <FontAwesomeIcon  
                            icon={faEdit} 
                            title="Edit"
                            className={`fas ${styles.editIcon}`}
                            onClick={showEditableTaskModal}
                        />

                        <FontAwesomeIcon  
                            icon={faBoxArchive} 
                            title="Delete"
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
    checked:PropTypes.bool.isRequired,
    onStatusChange: PropTypes.func.isRequired
}
    
export default memo(TaskItem);