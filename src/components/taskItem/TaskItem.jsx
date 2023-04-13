import { memo } from 'react';
import PropTypes from 'prop-types';

import {Col, Card} from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faBoxArchive } from '@fortawesome/free-solid-svg-icons';

import styles from'./taskItem.module.css';

function TaskItem(props) {
    const {title, description, date, onDelete, addSelectedTasksId, showEditableTaskModal} = props;
    return (
        <Col lg={4} md={6} xs={12} className = 'justify-content-center mt-3'>
            <Card className={styles.task}>
                <Card.Body className='card-body'>
                    <div className={`mb-2 mt-2 ${styles.titleCheckboxWrapper}`}>
                        <Card.Title 
                            className={styles.title}>
                            {title}
                        </Card.Title>

                        <input 
                            className={styles.taskCheckbox}
                            type={'checkbox'}
                            onClick={addSelectedTasksId}
                            />     
                    </div>
                    
                    <Card.Text 
                        className={`overflow-y-auto ${styles.taskInnerText}`}>
                        {description}
                    </Card.Text>


                    <div className={`${styles.iconsWrapper} mt-2`}>
                        <FontAwesomeIcon  
                            icon={faEdit} 
                            className={`fas ${styles.editIcon}`}
                            onClick={showEditableTaskModal}
                        />

                        <FontAwesomeIcon  
                            icon={faBoxArchive} 
                            className={`fa-solid fa-xl mt-1 mb-3 ${styles.archiveIcon}`}
                            onClick={onDelete}
                        />
                    </div>

                  
                

                </Card.Body>
            </Card>
        </Col>
    )
}

TaskItem.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    onDelete: PropTypes.func.isRequired,
    addSelectedTasksId: PropTypes.func.isRequired,
    showEditableTaskModal: PropTypes.func.isRequired
}
    
export default memo(TaskItem);