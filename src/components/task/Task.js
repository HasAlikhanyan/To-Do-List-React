import './task.css'

function Task () {
    return (
        <div className="card-body">
            <div className="task-body task">
                <div className="title-checkbox-wrapper">
                    <h5 className="card-title">Task</h5>
                    <input className="form-check-input fa-xl checkbox-style border-dark task-checkbox" type="checkbox" 
                    value=""/>
                </div>
            
                <p className="card-text overflow-y-auto task-inner-text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. </p>
            
            </div>
        </div>
    )
}

export default Task;