import { Component } from 'react';

import {Col, Card} from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faBoxArchive } from '@fortawesome/free-solid-svg-icons';

import './taskItem.css';

class TaskItem extends Component {

    render () {
        const {title, description, onDelete, addCheckedTasksId} = this.props;
        return (
            <Col lg={4} md={6} xs={12} className = 'justify-content-center mt-3'>
                <Card className="task">
                    <Card.Body className='card-body'>
                        <div className="title-checkbox-wrapper mb-2 mt-2">
                            <Card.Title 
                                className="title">
                                {title}
                            </Card.Title>

                            <input 
                                className="task-checkbox" 
                                type={'checkbox'}
                                onClick={addCheckedTasksId}
                                />     
                        </div>
                        
                        <Card.Text 
                            className="overflow-y-auto task-inner-text">
                            {description}
                        </Card.Text>

                        <div className="icons-wrapper mt-2">
                            <FontAwesomeIcon  
                                icon={faEdit} 
                                className="fas edit-icon"
                            />

                            <FontAwesomeIcon  
                                icon={faBoxArchive} 
                                className="fa-solid fa-xl mt-1 mb-3 archive-icon"
                                onClick={onDelete}
                            />
                        </div>

                    </Card.Body>
                </Card>
            </Col>
        )
    }
    
}

export default TaskItem;