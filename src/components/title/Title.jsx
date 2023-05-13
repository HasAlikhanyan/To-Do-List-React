import { useSelector } from 'react-redux';

import styles from'./title.module.css';

function Title(props) {
    const tasksCount = useSelector(store => store.tasks.tasksAmount);
    const activeTasksCount = useSelector(store => store.tasks.activeTasksAmount);

    return (
        <>
            <h1 className={`mb-2 mt-1 ${styles.title}`}>To Do List</h1> 
            <div className={`mb-4 ${styles.tasksCountContainer}`}>
                <span className={styles.tasksCount}>Total tasks - {tasksCount}</span>
                <span className={styles.tasksCount}>Active tasks - {activeTasksCount}</span>
                <span className={styles.tasksCount}>Complated tasks - {tasksCount - activeTasksCount}</span>



            </div>
        </>
    ) 
}

export default Title;
