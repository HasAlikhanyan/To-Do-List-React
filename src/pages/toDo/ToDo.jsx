import { useState, useEffect } from 'react';
import {Row} from 'react-bootstrap';

import { toast } from 'react-toastify';

import { useDispatch } from 'react-redux';
import { changeTasksAmount, changeActiveTasksAmount } from '../../redux/reducers/tasksSlice';
import { changeLoading } from '../../redux/reducers/loaderSlice';

import Title from '../../components/title/Title';
import TaskItem from '../../components/taskItem/TaskItem';
import DeleteSelectedTasksButton from '../../components/deleteSelectedTasksButton/DeleteSelectedTasksButton';
import ConfirmDialog from '../../components/confirmDialog/ConfirmDialog';
import TaskModal from '../../components/taskModal/TaskModal';
import TaskApi from '../../api/taskApi';
import TasksAddSelectResetForms from '../../components/tasksAddSelectResetForms/TasksAddSelectResetForms';
import Filters from '../../components/filters/Filters';

const taskApi = new TaskApi();

function ToDo () {
    const dispatch = useDispatch();

    const [tasks, setTasks] = useState([]);
    const [selectedTasksId, setSelectedTasksId] = useState(new Set());
    const [isOpenConfirmDialogModal, setIsOpenConfirmDialogModal] = useState(false);
    const [isOpenEditableTaskModal, setIsOpenEditableTaskModal] = useState(false);
    const [editableTask, setEditableTask] = useState(null);

    const activTasks = tasks.filter(task => task.status === "active");

    useEffect(() => {
        getTasks();
    }, []);

    useEffect(() => {
        dispatch(changeTasksAmount(tasks.length));
    }, [tasks.length]);

    useEffect(() => {
        dispatch(changeActiveTasksAmount(activTasks.length));
    }, [activTasks.length]);

    const getTasks = (filters)=>{
        dispatch(changeLoading(true));

        taskApi
        .getAll(filters)
        .then((tasks) => {
            setTasks(tasks);
            dispatch(changeLoading(false));
        })
        .catch((err) => {
            toast.error(err.message);
        })
        .finally(()=>{
            dispatch(changeLoading(false));
        });
    };

    const addTask = (title, description, date) => {
        const newTask = {
            title,
            description,
            date, 
        };
        dispatch(changeLoading(true));

        taskApi
        .add(newTask)
        .then((task) => {
            const tasksCopy = [...tasks, task];
            setTasks(tasksCopy);
            dispatch(changeLoading(false));

            toast.success('The task has been added successfully!');
        })
        .catch((err) => {
            toast.error(err.message);
        })
        .finally(()=>{
            dispatch(changeLoading(false));
        });
    } 

    const deleteItem = (taskId) => {
        dispatch(changeLoading(true));

        taskApi
        .delete(taskId)
        .then(() => {
            const newTasks = tasks.filter(task => task._id !== taskId);
            setTasks(newTasks);
            dispatch(changeLoading(false));
            
            if(selectedTasksId.has(taskId)) {
                const newSelectedTasksId = new Set(selectedTasksId);
                newSelectedTasksId.delete(taskId);
                setSelectedTasksId(newSelectedTasksId);
            } 
        
            toast.success('The task has been deleted successfully!');
        })
        .catch((err) => {
            toast.error(err.message);
        })
        .finally(()=>{
            dispatch(changeLoading(false));
        });;  
    }

    const addSelectedTasksId = (taskId) => {
        const newTasksId= new Set(selectedTasksId);
        if(newTasksId.has(taskId)) {
            newTasksId.delete(taskId);
        }
        else {
            newTasksId.add(taskId);
        }

        setSelectedTasksId(newTasksId);
    }

    const resetSelected = () => {
        setSelectedTasksId(new Set());
    }

    const selectAllTasks = () => {
        const tasksId = tasks.map(task => task._id);
        setSelectedTasksId(new Set(tasksId));
    }

    const toggleConfirmDialogModal = () => {
        setIsOpenConfirmDialogModal(!isOpenConfirmDialogModal);
    }
    
    const showEditableTaskModal = (task) => {
        setIsOpenEditableTaskModal(true);
        setEditableTask(task);
    }

    const hideEditableTaskModal = () => {
        setIsOpenEditableTaskModal(false);
    }

    const changeEditableTask = (task) => {
        dispatch(changeLoading(true));

        taskApi
        .update(task)
        .then(() => {
        const newTasks = [...tasks];
        const foundIndex = newTasks.findIndex((t)=>t._id === task._id);
        newTasks[foundIndex] = task;
    
        setTasks(newTasks);
        setEditableTask(null);
        dispatch(changeLoading(false));
        
        toast.success('The task has been updated successfully!');
        })
        .catch((err) => {
        toast.error(err.message);
        })
        .finally(()=>{
            dispatch(changeLoading(false));
        });;  
    }

    const deleteSelectedTasks = () => {
        dispatch(changeLoading(true));

        taskApi
        .deleteMany([...selectedTasksId])
        .then(() => {
            const newTasks = [];  
            tasks.forEach((task)=>{
                    if(!selectedTasksId.has(task._id)){
                    newTasks.push(task);
                    }
            });

            const selectedTasksCount = selectedTasksId.size;
    
            setTasks(newTasks);
            setSelectedTasksId(new Set());
            setIsOpenConfirmDialogModal(false);
            dispatch(changeLoading(false));

            toast.success(`Selected ${selectedTasksCount} ${selectedTasksCount > 1 ? 'tasks have' : 'task has'} been deleted successfully!`);
        })
        .catch((err) => {
            toast.error(err.message);
        })
        .finally(()=>{
            dispatch(changeLoading(false));
        });   
    }

    const onFilter = (filters)=>{
        getTasks(filters);
    };

    const taskComponents = tasks.map((task)=>{
    return (
        <TaskItem 
        key={task._id}
        task={task}   
        onDelete = {() => deleteItem(task._id)}
        addSelectedTasksId = {() => addSelectedTasksId(task._id)}
        showEditableTaskModal ={() => showEditableTaskModal(task)}
        checked={selectedTasksId.has(task._id)}
        onStatusChange = {changeEditableTask}
        />
    )
    });

    return (
        <>
            <Title
            hasTasks={tasks.length}
            />
            
            <Filters 
            className="mt-2"
            onFilter={onFilter}
            /> 
        
            <TasksAddSelectResetForms 
            showEditableTaskModal= {showEditableTaskModal}
            resetSelected ={resetSelected}
            selectAllTasks = {selectAllTasks}
            hasTasks={tasks.length}
            />
            <DeleteSelectedTasksButton 
            tasks={tasks}
            selectedTasks={selectedTasksId.size}
            showModal = {toggleConfirmDialogModal}
            onClick = {toggleConfirmDialogModal}
            />

            <Row className='justify-content-center task-content-center align-items-center'>
                {taskComponents}
            </Row>

            {isOpenConfirmDialogModal && 
            <ConfirmDialog
                onDelete={deleteSelectedTasks}
                hideModal = {toggleConfirmDialogModal}
                selectedTasksNumber = {selectedTasksId.size}
            />
            }

            {isOpenEditableTaskModal && 
            <TaskModal
                hideModal = {hideEditableTaskModal}
                task = {editableTask}
                changeEditableTask = {changeEditableTask}
                addTask={addTask}
            />
            }

        </>
    );
}

export default ToDo;
