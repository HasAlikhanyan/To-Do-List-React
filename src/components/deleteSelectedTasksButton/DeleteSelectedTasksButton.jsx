
import '../tasksAddForm/tasksAddForm.css';
import "./deleteSelectedTasksButton.css";

import { Button, Nav } from "react-bootstrap";

function DeleteSelectedTasksButton (props) {
    const {tasks, onDelete, tasksId} = props;
    const hasTasks = !!tasks.length;
    const hasCheckedTasks = !!tasksId.size;

    return (
        <Nav className="sticky-top bg-body-tertiary float-end">
            <div className="container-fluid">
                <Button 
                    className={`btn-style 
                        ${hasTasks ? "" : "btn-hide"}                     
                        ${hasCheckedTasks ? "" : "btn-disabled"}`}
                    type="button"
                    onClick={onDelete}
                >
                    Delelete selected
                </Button> 
            </div>
        </Nav>
    )
}

export default DeleteSelectedTasksButton;