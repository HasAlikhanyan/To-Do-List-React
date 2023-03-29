import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { Component } from 'react';
import { Container } from 'react-bootstrap';
import {Row} from 'react-bootstrap';

import Title from './components/title/Title';
import TasksAddForm from './components/tasksAddForm/TasksAddForm';
import TaskItem from './components/taskItem/TaskItem';
import DeleteSelectedTasksButton from './components/deleteSelectedTasksButton/DeleteSelectedTasksButton';
import ConfirmDialog from './components/confirmDialog/ConfirmDialog';
import EditableTask from './components/editableTask/EditableTask';

import Counter from './components/counter/Counter';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
        tasks: [],
        selectedTasksId: new Set(),
        isOpenConfirmDialogModal: false,
        isOpenEditableTaskModal: false,
        editableTask: {},
        editableTaskIndex: -1
    }
    
  }

  idGenerator = () => {
    return Math.random(32).toString() + Math.random.toString(32);
  }

  addTask = (title, description) => {
    const newTask = {
        title,
        description,
        id : this.idGenerator()
    }

    this.setState(({tasks}) => {
        const newTasksArr = [...tasks, newTask];
        return {
            tasks: newTasksArr
        }
    });
  } 

  deleteItem = (id) => {
    this.setState(({tasks}) => {
        return {
            tasks : tasks.filter(task => task.id !== id),
            
        }
    })
    if(this.state.selectedTasksId.has(id)) {
      this.setState(({selectedTasksId}) => {
        return {
            selectedTasksId : selectedTasksId.delete(id),
        }
      })
    }   
  }

  addSelectedTasksId = (id) => {
    const newTasksId= new Set(this.state.selectedTasksId);
    if(newTasksId.has(id)) {
      newTasksId.delete(id);
    }
    else {
      newTasksId.add(id);
    }

    this.setState( {
      selectedTasksId: newTasksId
    })
  }

  showConfirmDialogModal = () => {
    this.setState({
      isOpenConfirmDialogModal: true
    })
  }

  hideConfirmDialogModal = () => {
    this.setState({
      isOpenConfirmDialogModal: false
    })
  }

  showEditableTaskModal = (task, index) => {
    this.setState({
      isOpenEditableTaskModal: true,
      editableTask: task,
      editableTaskIndex: index
    })    
  }

  hideEditableTaskModal = () => {
    this.setState({
      isOpenEditableTaskModal: false
    })
  }

  changeEditableTask = (title, description, id) => {
    const changedTask = {
      title,
      description,
      id
    }
    const tasksCopy = [...this.state.tasks];
    tasksCopy.splice(this.state.editableTaskIndex, 1, changedTask);

    this.setState({
      tasks: tasksCopy,
      editableTask: {},
      editableTaskIndex: -1
    })
  }


  deleteSelectedTasks = () => {
    const newTasks = [];
    const {selectedTasksId, tasks} = this.state;
  
    tasks.forEach((task)=>{
          if(!selectedTasksId.has(task.id)){
            newTasks.push(task);
          }
    });
    this.setState({
      tasks: newTasks,
      selectedTasksId: new Set(),
      isOpenConfirmDialogModal: false
    });
  }

  render () {
    const taskComponents = this.state.tasks.map((task, i)=>{
      return (
        <TaskItem 
          key={task.id}
          id={task.id}
          title={task.title} 
          description={task.description}
          onDelete = {() => this.deleteItem(task.id)}
          addSelectedTasksId = {() => this.addSelectedTasksId(task.id)}
          showEditableTaskModal ={() => this.showEditableTaskModal(task, i)}
        />
      )
    });

    return (
      <Container className="App">
        <Counter/>

        <Title/>
        <TasksAddForm 
          onAdd={this.addTask}
        />
        <DeleteSelectedTasksButton 
          tasks={this.state.tasks}
          selectedTasksId={this.state.selectedTasksId}
          showModal = {this.showConfirmDialogModal}
        />
  
        <Row className='justify-content-center task-content'>
          {taskComponents}
        </Row>

        <ConfirmDialog
          onDelete={this.deleteSelectedTasks}
          hideModal = {this.hideConfirmDialogModal}
          isOpenModal = {this.state.isOpenConfirmDialogModal}
          selectedTasksNumber = {this.state.selectedTasksId.size}
        />
        <EditableTask
          isOpenModal = {this.state.isOpenEditableTaskModal}
          hideModal = {this.hideEditableTaskModal}
          task = {this.state.editableTask}
          changeEditableTask = {this.changeEditableTask}
        />
  
      </Container>
  
    );
  }
}

export default App;
