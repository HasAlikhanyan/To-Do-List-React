import { useEffect, useRef } from "react";
import { Form, Button } from "react-bootstrap";

import styles from './contact.module.css';

function Contact() {
    const nameInputRef = useRef(null);
    const surnameInputRef = useRef();
    const emailInputRef = useRef();
    const phoneNumberInputRef = useRef();
    const notificationsRef = useRef();

    useEffect(()=> {
        nameInputRef.current.focus();
    },[])

    const getValue = (event) => {
        event.preventDefault();

        console.log("name:", nameInputRef.current.value);
        console.log("surname:", surnameInputRef.current.value);
        console.log("email:", emailInputRef.current.value);
        console.log("phone number:", phoneNumberInputRef.current.value);
        console.log("notifications:", notificationsRef.current.value);

        nameInputRef.current.value="";
        surnameInputRef.current.value="";
        emailInputRef.current.value="";
        phoneNumberInputRef.current.value="";
        notificationsRef.current.value="";
    }

    return (
        <div className={styles.formContainer}>
            <h2>Contact information</h2>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className={styles.labelStyle}>Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter Name" 
                        className={styles.inputStyle}
                        ref={nameInputRef}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className={styles.labelStyle}>Surname</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter Surname" 
                        className={styles.inputStyle}
                        ref={surnameInputRef}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className={styles.labelStyle}>Email address</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email" 
                        className={styles.inputStyle}
                        ref={emailInputRef}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className={styles.labelStyle}>Phone</Form.Label>
                    <Form.Control
                        type="number" 
                        placeholder="Enter phone number" 
                        className={styles.inputStyle}
                        ref={phoneNumberInputRef}
                    />
                </Form.Group>

                <Form.Control
                    className={`mb-3 ${styles.textArea} ${styles.inputStyle}`}
                    as="textarea"
                    placeholder="Enter notifications"
                    ref={notificationsRef}
                /> 
            
                <Button 
                    className={`btn-style ${styles.sendInfoButton}`} 
                    type="submit"
                    onClick={getValue}
                >
                    Send
                </Button>
            </Form>
        </div>
        
    );
}

export default Contact;