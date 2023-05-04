import styles from'./title.module.css';

function Title(props) {
    return <h1 className={`mb-3 mt-1 ${styles.title}`}>To Do List</h1>      
}

export default Title;
