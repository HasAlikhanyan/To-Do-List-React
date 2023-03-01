import './App.css';

import Title from './components/title/Title'
import InputGroup from './components/inputGroup/InputGroup';
import Task from './components/task/Task';
import DeleteSelectedButton from './components/deleteSelectedButton/DeleteSelectedButton';

function App() {
  return (
    <div className="App">
      <Title/>
      <InputGroup/>

      <div className="tasks-wrapper">
        <Task/>
        <Task/>
        <Task/>
        <Task/>
      </div>

      <DeleteSelectedButton/>
    
    </div>
  );
}

export default App;
