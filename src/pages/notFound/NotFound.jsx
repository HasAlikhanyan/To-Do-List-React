import {Link} from 'react-router-dom';

import notFoundImage from '../../images/flat-modern-character-trying-connecting-cables-web-online-page-with-404-found-error_372769-2127.webp' 
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