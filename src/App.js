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
        tasks: [],
        tasksId: new Set()
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
            tasks : tasks.filter(task => task.id !== id)
        }
    })
}

  addCheckedTasksId = (id) => {
    const newTasksId= new Set(this.state.tasksId);
    if(newTasksId.has(id)) {
      newTasksId.delete(id);
    }
    else {
      newTasksId.add(id);
    }

    this.setState( {
      tasksId: newTasksId
    })
  }

  deleteSelectedTasks = () => {
    this.state.tasksId.forEach(id => {
      this.deleteItem(id);
    })
    this.setState({
      tasksId : new Set()
    })
  }

  render () {
    const taskComponents = this.state.tasks.map((task)=>{
      return (
        <TaskItem 
          key={task.id}
          id={task.id}
          title={task.title} 
          description={task.description}
          onDelete = {() => this.deleteItem(task.id)}
          addCheckedTasksId = {() => this.addCheckedTasksId(task.id)}
        />
      )
    });

    return (
      <Container className="App">
        <Title/>
        <TasksAddForm 
          onAdd={this.addTask}
        />
        <DeleteSelectedTasksButton 
          onDelete={this.deleteSelectedTasks}
          tasks={this.state.tasks}
          tasksId={this.state.tasksId}
        />
  
        <Row className='justify-content-center task-content'>
            {taskComponents}
        </Row>
  
      </Container>
  
    );
  }
}

export default App;
