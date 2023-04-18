import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import {Row} from 'react-bootstrap';

import { ToastContainer, toast } from 'react-toastify';

import Title from './components/title/Title';
import TaskItem from './components/taskItem/TaskItem';
import DeleteSelectedTasksButton from './components/deleteSelectedTasksButton/DeleteSelectedTasksButton';
import ConfirmDialog from './components/confirmDialog/ConfirmDialog';
import TaskModal from './components/taskModal/TaskModal';
import TaskApi from './api/taskApi';
import TasksAddSelectResetForms from './components/tasksAddSelectResetForms/TasksAddSelectResetForms';
import Spinner from './components/spinner/Spinner';

const taskApi = new TaskApi();

function App () {

  const [tasks, setTasks] = useState([]);
  const [selectedTasksId, setSelectedTasksId] = useState(new Set());
  const [isOpenConfirmDialogModal, setIsOpenConfirmDialogModal] = useState(false);
  const [isOpenEditableTaskModal, setIsOpenEditableTaskModal] = useState(false);
  const [editableTask, setEditableTask] = useState(null);
  const [editableTaskIndex, setEditableTaskIndex] = useState(-1);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    taskApi
    .getAll()
    .then((tasks) => {
      setTasks(tasks);
    });
  }, []);

  const addTask = (title, description, date) => {
    const newTask = {
        title,
        description,
        date, 
    };
    
    setLoading(true);

    taskApi
    .add(newTask)
    .then((task) => {
      const tasksCopy = [...tasks, task];
      setTasks(tasksCopy);
      setLoading(false);
      toast.success('The task has been added successfully!');
    })
    .catch((err) => {
      toast.error(err.message);
    });
  } 

  const deleteItem = (taskId) => {
    setLoading(true);

    taskApi
    .delete(taskId)
    .then(() => {
      const newTasks = tasks.filter(task => task._id !== taskId);
      setTasks(newTasks);
      setLoading(false);
    
      if(selectedTasksId.has(taskId)) {
        const newSelectedTasksId = new Set(selectedTasksId);
        newSelectedTasksId.delete(taskId);
        setSelectedTasksId(newSelectedTasksId);
      } 
    
      toast.success('The task has been deleted successfully!');
    })
    .catch((err) => {
      toast.error(err.message);
    });  
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
  
  const showEditableTaskModal = (task, index) => {
    setIsOpenEditableTaskModal(true);
    setEditableTask(task);
    setEditableTaskIndex(index);   
  }

  const hideEditableTaskModal = () => {
    setIsOpenEditableTaskModal(false);
  }

  const changeEditableTask = (title, description, date, _id) => {
    const changedTask = {
      title,
      description,
      date,
      _id,
    }

    setLoading(true);

    taskApi
    .update(changedTask, _id)
    .then(() => {
      changedTask[_id] = _id;
      const tasksCopy = [...tasks];
      tasksCopy.splice(editableTaskIndex, 1, changedTask);
  
      setTasks(tasksCopy);
      setEditableTask(null);
      setEditableTaskIndex(-1);
      setLoading(false);
    
      toast.success('The task has been updated successfully!');
    })
    .catch((err) => {
      toast.error(err.message);
    });  

  }


  const deleteSelectedTasks = () => {
    setLoading(true);

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
      setLoading(false);
      toast.success(`Selected ${selectedTasksCount} ${selectedTasksCount > 1 ? 'tasks have' : 'task has'} been deleted successfully!`);
    })
    .catch((err) => {
      toast.error(err.message);
    });   
  }

    const taskComponents = tasks.map((task, i)=>{
      return (
        <TaskItem 
          key={task._id}
          task={task}
          onDelete = {() => deleteItem(task._id)}
          addSelectedTasksId = {() => addSelectedTasksId(task._id)}
          showEditableTaskModal ={() => showEditableTaskModal(task, i)}
          checked={selectedTasksId.has(task._id)}
        />
      )
    });

    return (
      <Container className="App">
        <Title/>
        <TasksAddSelectResetForms 
          showEditableTaskModal= {showEditableTaskModal}
          resetSelected ={resetSelected}
          selectAllTasks = {selectAllTasks}
        />
        <DeleteSelectedTasksButton 
          tasks={tasks}
          selectedTasks={selectedTasksId.size}
          showModal = {toggleConfirmDialogModal}
          onClick = {toggleConfirmDialogModal}
        />
  
        <Row className='justify-content-center task-content align-items-center'>
          {loading ? <Spinner/> : taskComponents}
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

        <ToastContainer
          position="bottom-left"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
  
      </Container>
  
    );
  }

export default App;
