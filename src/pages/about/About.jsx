import {Row, Col, Card, Container} from 'react-bootstrap';

import styles from './about.module.css';


function About() {
    return (
        <>
            <div className={`mt-5 ${styles.aboutSection}`}>
                <h1 className={styles.titles}>About Us Page</h1>
                <p>ToDo list page is a list of tasks you need to complete or things that you want to do. 
                A to do list acts as an external memory aid. Keep a to do list and you'll be able to keep, track of everything, rather than just a few of the tasks you need to do. Your to do list will also reinforce the information, which makes it less likely you're going to forget something.
                </p>

            <h2 className={`mt-4 ${styles.titles}`}>Our Team</h2>
            <Row>
            <Col>
                <Card >
                <Container>
                    <h4>Hasmik Al</h4>
                    <p>CEO & Founder</p>
                    <p>hasmikal@gmail.com</p>
                </Container>
                </Card>
            </Col>
            </Row>
            </div>
        </>     
    )
}

export default About;