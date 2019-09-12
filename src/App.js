import React,{useState} from 'react';
import './App.css';
import Searchbar from './components/SearchBar'
import Tasks from './components/Tasks'
import Footer from './components/Footer'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Active from './components/Active'
import Completed from './components/Completed'

function App() {
  console.log('app')
  const [task, setTask] = useState('')
  const [updatedTask,setUpdatedTask] = useState(JSON.parse(localStorage.getItem('temp')))

  let textHandler = (e)=>{
    setTask(e.target.value)
  }

  let taskUpdater=()=>{
    setUpdatedTask(JSON.parse(localStorage.getItem('temp')))
  }
  

  let submitHandler=(e)=>{
    if(task.length>0){
      let tempArr = JSON.parse(localStorage.getItem('temp')) || []
      let obj = {task,isCompleted:false}
      tempArr.push(obj)
      localStorage.setItem('temp',JSON.stringify(tempArr))
      setUpdatedTask(JSON.parse(localStorage.getItem('temp')))
      setTask('')
    }
  }

  
  return (
    <div className="App">
      <h1>Todos</h1>
      <Searchbar 
      textValue={task} 
      updateText={textHandler}
      submitHandler={submitHandler}
      updater={taskUpdater} />
      <Router>
        <Switch>
          <Route exact path='/'>
            <Tasks tasks={updatedTask} updater={taskUpdater} />
          </Route>
          <Route exact path='/active'>
            <Active tasks={updatedTask} updater={taskUpdater} />
          </Route>
          <Route exact path='/completed'>
            <Completed tasks={updatedTask} updater={taskUpdater} />
          </Route>
          <Route>
            <div>Not Found</div>
          </Route>
        </Switch>
        {(updatedTask&&updatedTask.length)?<Footer tasks={updatedTask} updater={taskUpdater} />:null}
      </Router>
    </div>
  );
}

export default App;
