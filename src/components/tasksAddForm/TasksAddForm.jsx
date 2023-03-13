import { Component } from "react";
import {Row, Col, InputGroup, Form, Button} from 'react-bootstrap';

import './tasksAddForm.css';

class TasksAddForm extends Component {
    constructor (props) {
        super(props);

        this.state = {
            title: "",
            description: ""
        }
    }

    onChangeValue = (e) => {
        this.setState({  
            [e.target.name] : e.target.value 
        })
    }

    onAdd = (e) => {
        if (!this.state.title || !this.state.description) return;
        this.props.onAdd(this.state.title, this.state.description);
        this.setState({
            title: '',
            description: ''
        })
    }

    render () {
        const {title, description} = this.state;
        return (
            <Row className="justify-content-center">
                <Col lg={6} xs={10}>
                    <InputGroup className="mb-5 mt-5">
                        <Form.Control 
                            type="text" 
                            className="border-secondary new-task-input new-task-text-input" 
                            name = "title"
                            onChange={this.onChangeValue}
                            value = {title}
                            placeholder="Input Task"  aria-label=""      
                        />
                        <Form.Control 
                            type="text" 
                            className="border-secondary mx-2 new-task-input new-task-description-input" 
                            name = "description"
                            onChange={this.onChangeValue}
                            value = {description}
                            placeholder="Input Description"    
                        />

                        <Button 
                            className="btn-style"
                            type="button"
                            onClick={this.onAdd}
                        >
                            Add
                        </Button>
                        <Button 
                            className="btn-style btn-hide"
                            type="button"
                        >
                            Save
                        </Button>
                    </InputGroup>
                </Col>
            </Row>
        )
    }
}

export default TasksAddForm;
