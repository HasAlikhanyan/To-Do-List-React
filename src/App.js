import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import {Row} from 'react-bootstrap';

import Title from './components/title/Title';
import TasksAddForm from './components/tasksAddForm/TasksAddForm';
import TaskItem from './components/taskItem/TaskItem';
import DeleteSelectedTasksButton from './components/deleteSelectedTasksButton/DeleteSelectedTasksButton';
import ConfirmDialog from './components/confirmDialog/ConfirmDialog';
import TaskModal from './components/taskModal/TaskModal';
import TaskApi from './api/taskApi';

const taskApi = new TaskApi();

function App () {

  const [tasks, setTasks] = useState([]);
  const [selectedTasksId, setSelectedTasksId] = useState(new Set());
  const [isOpenConfirmDialogModal, setIsOpenConfirmDialogModal] = useState(false);
  const [isOpenEditableTaskModal, setIsOpenEditableTaskModal] = useState(false);
  const [editableTask, setEditableTask] = useState({});
  const [editableTaskIndex, setEditableTaskIndex] = useState(-1);


  useEffect(() => {
    taskApi
    .getAll()
    .then((tasks) => {
      setTasks(tasks);
    });
  }, []);

  const addTask = (title, description) => {
    const newTask = {
        title,
        description,
    };

    taskApi
    .add(newTask)
    .then((task) => {
      const tasksCopy = [...tasks, task];
      setTasks(tasksCopy);
    });
  } 

  const deleteItem = (taskId) => {
    const newTasks = tasks.filter(task => task._id !== taskId);
    setTasks(newTasks);
  
    if(selectedTasksId.has(taskId)) {
      const newSelectedTasksId = new Set(selectedTasksId);
      newSelectedTasksId.delete(taskId);
      setSelectedTasksId(newSelectedTasksId);
    }   
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

  const changeEditableTask = (title, description, _id) => {
    const changedTask = {
      title,
      description,
      _id,
    }
    const tasksCopy = [...tasks];
    tasksCopy.splice(editableTaskIndex, 1, changedTask);

    setTasks(tasksCopy);
    setEditableTask({});
    setEditableTaskIndex(-1)
  }


  const deleteSelectedTasks = () => {
    const newTasks = [];  
    tasks.forEach((task)=>{
          if(!selectedTasksId.has(task._id)){
            newTasks.push(task);
          }
    });

    setTasks(newTasks);
    setSelectedTasksId(new Set());
    setIsOpenConfirmDialogModal(false);
  }

    const taskComponents = tasks.map((task, i)=>{
      return (
        <TaskItem 
          key={task._id}
          title={task.title} 
          description={task.description}
          onDelete = {() => deleteItem(task._id)}
          addSelectedTasksId = {() => addSelectedTasksId(task._id)}
          showEditableTaskModal ={() => showEditableTaskModal(task, i)}
        />
      )
    });

    return (
      <Container className="App">
        <Title/>
        <TasksAddForm 
          onAdd={addTask}
        />
        <DeleteSelectedTasksButton 
          tasks={tasks}
          selectedTasks={selectedTasksId.size}
          showModal = {toggleConfirmDialogModal}
          onClick = {toggleConfirmDialogModal}
        />
  
        <Row className='justify-content-center task-content'>
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
            isOpenModal = {isOpenEditableTaskModal}
            hideModal = {hideEditableTaskModal}
            task = {editableTask}
            changeEditableTask = {changeEditableTask}
          />
        }
  
      </Container>
  
    );
  }

export default App;
