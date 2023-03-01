import './inputGroup.css';

function InputGroup () {
    return (
        <div className="input-group mb-5 mt-5">
                <input type="text" className="new-task-input new-task-text-input" id="new-task-input" placeholder="Input Task" />
                <input type="text" className="new-task-input new-task-description-input" id="new-task-input" placeholder="Input Description" />

                <button className="btn-style" id="btn-add" type="button">Add</button>
                <button className="btn-style btn-hide" id="btn-save" type="button">Save</button>
        </div>
    )
}

export default InputGroup;