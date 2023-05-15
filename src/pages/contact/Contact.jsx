import { useEffect, useState, useRef } from "react";
import { useDispatch } from 'react-redux';
import { changeLoading } from "../../redux/reducers/loaderSlice";

import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";

import FormApi from "../../api/formApi";

import styles from './contact.module.css';

const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const formApi = new FormApi();

function Contact() {
    const nameRef = useRef(null);
    const emailRef = useRef();
    const messageRef = useRef();

    const [emailErrorMessage, setEmailErrorMessage] = useState(null);
    const [nameErrorMessage, setNameErrorMessage] = useState(null);
    const [notificationsErrorMessage, setNotificationsErrorMessage] = useState(null);

    const dispatch = useDispatch();

    useEffect(()=> {
        nameRef.current.focus();
    },[])

    const handleSubmit = async () => {
        const email = emailRef.current.value;
        const name = nameRef.current.value;
        const message = messageRef.current.value;
        if (!name) {
            setNameErrorMessage("Name is required!");
        } else {
            setNameErrorMessage(null);
        }

        if (!message) {
            setNotificationsErrorMessage("Message is required!");
        }
        else {
            setNotificationsErrorMessage(null);
        }
    
        if (!email) {
            setEmailErrorMessage("Email address is required!");
            return;
        } 
        setEmailErrorMessage(null);  
    
        if (!emailRegex.test(email)) {
            setEmailErrorMessage("Email address is not valid!");
            return;
        }

        setEmailErrorMessage(null);

        if (nameErrorMessage) {
            return;
        }

        const form = {
            name,
            email,
            message,
        };
        try {
            dispatch(changeLoading(true));
            await formApi.sendForm(form);
            toast.success("Thank you for contacting us, the form has been sent!");
            dispatch(changeLoading(false));

            nameRef.current.value = "";
            messageRef.current.value = "";
            emailRef.current.value = "";
        } 
        catch (err) {
            toast.error(err.message);
        }
        finally { 
            dispatch(changeLoading(false));
        };
    };
    

    return (
        <div className={styles.formContainer}>
            <h2 className="mb-3">Contact information</h2>
            <div>
                <Form.Group className="mb-4">
                    <Form.Label className={styles.labelStyle}>Full Name*</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Input Full Name" 
                        className={`${styles.inputStyle} ${
                            nameErrorMessage ? styles.invalid : ""
                        }`}
                        ref={nameRef}
                    />
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label className={styles.labelStyle}>Email address*</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Input email" 
                        className={`${styles.inputStyle} ${
                            emailErrorMessage ? styles.invalid : ""
                        }`}
                        ref={emailRef}
                    />
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label className={styles.labelStyle}>Message*</Form.Label>
                    <Form.Control
                    className={`${styles.inputStyle} ${styles.textArea} ${
                        notificationsErrorMessage ? styles.invalid : ""
                    }`}
                    as="textarea"
                    placeholder="Input message"
                    ref={messageRef}
                /> 
                </Form.Group> 
            
                <Button 
                    className={`btn-style ${styles.sendInfoButton}`} 
                    type="submit"
                    onClick={handleSubmit}
                >
                    Send
                </Button>

                {nameErrorMessage && (
                    <h5 className={`${styles.errorMessage} mt-2`}>
                        {nameErrorMessage}
                    </h5>
                )}
                {emailErrorMessage && (
                    <h5 className={`${styles.errorMessage} mt-2`}>
                        {emailErrorMessage}
                    </h5>
                )}

                {notificationsErrorMessage && (
                    <h5 className={`${styles.errorMessage} mt-2`}>
                        {notificationsErrorMessage}
                    </h5>
                )}

            </div>
        </div>
        
    );
}

export default Contact;