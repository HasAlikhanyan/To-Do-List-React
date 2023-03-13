
import '../tasksAddForm/tasksAddForm.css';
import "./deleteSelectedTasksButton.css";

import { Button, Nav } from "react-bootstrap";

function DeleteSelectedTasksButton () {
    return (
        <Nav className="sticky-top bg-body-tertiary float-end">
            <div className="container-fluid">
                <Button className="btn-style" type="button">Delelete selected</Button>     
            </div>
        </Nav>
    )
}

export default DeleteSelectedTasksButton;