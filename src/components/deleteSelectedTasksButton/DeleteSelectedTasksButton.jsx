
import { Button, Nav } from "react-bootstrap";

function DeleteSelectedTasksButton (props) {
    const {tasks, selectedTasksId, showModal} = props;
    const hasTasks = !!tasks.length;
    const hasSelectedTasks = !!selectedTasksId.size;

    return (
        <Nav className="sticky-top bg-body-tertiary float-end">
            <div className="container-fluid">
                <Button 
                    className={`btn-style 
                        ${hasTasks ? "" : "hide"}                     
                        ${hasSelectedTasks ? "" : "btn-disabled"}`}
                    type="button"
                    onClick={showModal}
                >
                    Delelete selected
                </Button> 
            </div>
        </Nav>
    )
}

export default DeleteSelectedTasksButton;