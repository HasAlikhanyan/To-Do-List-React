import {Link} from 'react-router-dom';

import notFoundImage from '../../images/404-found-error-img.webp' 
import styles from './notFound.module.css';

function NotFound() {
    return (
        <div className={styles.wrapper}>
            <img src={notFoundImage} alt = "Page is not found." className={styles.notFoundImg}/>
            <Link to="/" className={styles.goToHomePage}>Go to homepage</Link>
        </div>
    )
}

export default NotFound;