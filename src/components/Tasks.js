import React from 'react';
import './tasks.css'

function Tasks(props) {
    console.log('tasks')

    let xHandler=(i)=>{
        let temp = JSON.parse(localStorage.getItem('temp'))
        temp.splice(i,1)
        storageSetter(temp)
    }

    let checkBoxHandler=(i)=>{
        let temp = JSON.parse(localStorage.getItem('temp'))
        temp[i].isCompleted=!temp[i].isCompleted
        storageSetter(temp)
    }

    let taskNameUpdater=(e,i)=>{
        let temp = JSON.parse(localStorage.getItem('temp'))
        temp[i].task=e.target.value
        storageSetter(temp)
    }

    let storageSetter=(temp)=>{
        localStorage.setItem('temp',JSON.stringify(temp))
        props.updater()
    }

    return (
        <div className='flex'>
            <div>
            {(props.tasks)?props.tasks.map((task,i)=>{
                return  <div className='items' key={i}>
                        <input type='checkbox' 
                        className='checkboxStyle'
                        checked={task.isCompleted}
                        onChange={()=>checkBoxHandler(i)} />
                        {(!task.isCompleted)?
                        <input 
                        value={task.task} 
                        className='taskinput'
                        onChange={(e)=>taskNameUpdater(e,i)} />
                        :<input 
                        value={task.task} 
                        className='strike taskinput' 
                        onChange={taskNameUpdater} />}
                        <button className='button' onClick={()=>xHandler(i)} >X</button>
                        </div>
            }):null}
            </div>
        </div>
    )
}

export default React.memo(Tasks);
