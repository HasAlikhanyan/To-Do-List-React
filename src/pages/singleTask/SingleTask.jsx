import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import {Link} from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';

import TaskApi from "../../api/taskApi";
import Spinner from "../../components/spinner/Spinner";


import {Row, Col, Card} from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit,
        faBoxArchive, 
        faStar,
        faCheck,
        faHistory,
        } from '@fortawesome/free-solid-svg-icons';


import { formatDate } from "../../helpers/helpers";

import styles from './singleTask.module.css';

const taskApi = new TaskApi();

function SingleTask() {
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(false); 

    const {taskId} = useParams();
    const history = useNavigate();

    useEffect(() => {
        setLoading(true);

        taskApi
        .getSingle(taskId)
        .then((task) => {
        setTask(task);
        setLoading(false);
        })
        .catch((err) => {
        toast.error(err.message);
        })
        .finally(()=>{
        setLoading(false)
        });
    }, [taskId]);

    // const changeTask = () => {

    //     setLoading(true);

    //     taskApi
    //     .update(task)
    //     .then(() => {
    
    //     setLoading(false);
    //         toast.success('The task has been updated successfully!');
    //     })
    //     .catch((err) => {
    //         toast.error(err.message);
    //     })
    //     .finally(()=>{
    //         setLoading(false)
    //     });;  
    // }

    const deleteTask = () => {
        setLoading(true);

        taskApi
        .delete(taskId)
        .then(() => {
            setLoading(false);        
            toast.success('The task has been deleted successfully!');
            history("/");
        })
        .catch((err) => {
            toast.error(err.message);
        })
        .finally(()=>{
            setLoading(false)
        });;  
    }

    if(loading) {
        return <Spinner/>;
    }

    return (
        <Row>
            
            {
                task ? 
                <Col className = 'justify-content-center mt-3'>
                <h1>Task page</h1> 

                <Card className={styles.task} >
                    <Card.Body className='card-body'>
                            <Card.Title 
                                className={styles.title}>
                                {task.title}
                            </Card.Title>     

                        <Card.Text 
                            className={`${styles.description} ${styles.elipsis}`}>
                            {task.description}
                        </Card.Text>

                        <Card.Text 
                            className='mb-3'>
                            <span className={styles.fildsDescription}
                            >Status: </span>
                            <span className={styles.taskDescription}>{task.status}</span>
                            {task.status === "active" &&   <FontAwesomeIcon 
                                icon={faStar}
                                className={`fas mt-1 ${styles.statusActiveStar}`}>
                            </FontAwesomeIcon>}
                        </Card.Text>

                        <Card.Text 
                            className='mb-3'>
                            <span className={styles.fildsDescription}>Created at:</span> 
                            <span className={styles.taskDescription}>{formatDate(task.created_at)}</span>
                        </Card.Text>

                        <Card.Text 
                            className='mb-3'>
                            <span className={styles.fildsDescription}>Deadline:</span>
                            <span className={styles.taskDescription}>{formatDate(task.date)}</span> 
                        </Card.Text>

                        <Link to='/' className={styles.showDetails}>
                            <Card.Text>Go to homepage</Card.Text>
                        </Link>

                        <div className={`mt-4 ${styles.iconsWrapper}`}>
                        {
                            task.status === 'active' ?
                            <FontAwesomeIcon
                            className={styles.statusActive} 
                                icon={faCheck}
                                title="Mark as done" 
                                // onClick={() => changeTask({...task, status: 'done'})}
                                >
                            </FontAwesomeIcon> :
                            <FontAwesomeIcon 
                                className={styles.statusDone} 
                                icon={faHistory}
                                title="Mark as active" 
                                variant="info" 
                                // onClick={() => changeTask({...task, status: 'active'})}
                                >
                            </FontAwesomeIcon>
                        }
                            <FontAwesomeIcon  
                                icon={faEdit} 
                                title="Edit"
                                className={`fas ${styles.editIcon}`}
                                // onClick={showEditableTaskModal}
                            />

                            <FontAwesomeIcon  
                                icon={faBoxArchive} 
                                title="Delete"
                                className={`fa-solid fa-xl ${styles.archiveIcon}`}
                                onClick={deleteTask}
                            />                       
                        </div>
                        
                    </Card.Body>
                </Card>
                </Col> : 
                <>
                    <div className={styles.taskNotFound}>Task not found</div>
                    <Link to="/" className={styles.goToHomePage}>Go to homepage</Link>
                </>
            } 
            
            <ToastContainer
                position="bottom-left"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </Row>
    )
}

export default SingleTask;