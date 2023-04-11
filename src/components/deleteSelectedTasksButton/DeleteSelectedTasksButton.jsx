import Proptypes from 'prop-types';

import { Button, Nav } from "react-bootstrap";

function DeleteSelectedTasksButton (props) {
    const {tasks, selectedTasks, showModal} = props;
    const hasTasks = !!tasks.length;
    const hasSelectedTasks = !!selectedTasks;

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

DeleteSelectedTasksButton.propTypes = {
    tasks: Proptypes.array.isRequired,
    selectedTasks: Proptypes.number.isRequired,
    showModal: Proptypes.func
}

export default DeleteSelectedTasksButton;