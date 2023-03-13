import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { Component } from 'react';
import { Container } from 'react-bootstrap';
import {Row} from 'react-bootstrap';

import Title from './components/title/Title';
import TasksAddForm from './components/tasksAddForm/TasksAddForm';
import TaskItem from './components/taskItem/TaskItem';
import DeleteSelectedTasksButton from './components/deleteSelectedTasksButton/DeleteSelectedTasksButton';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
        tasks: []
    }
  }

  idGenerator = () => {
    return Math.random().toString() + Math.random.toString();
  }

  addTask = (title, description, id) => {
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
            tasks : tasks.filter(task => task.id !== id)
        }
    })
}

  render () {
    const taskComponents = this.state.tasks.map((task)=>{
      return (
        <TaskItem 
        key={task.id}
        title={task.title} 
        description={task.description}
        onDelete = {() => this.deleteItem(task.id)}
        />
      )
    });

    return (
      <Container className="App">
        <Title/>
        <TasksAddForm onAdd={this.addTask}/>
        <DeleteSelectedTasksButton/>
  
        <Row className='justify-content-center task-content'>
            {taskComponents}
        </Row>
  
      </Container>
  
    );
  }
}

export default App;
