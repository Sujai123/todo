import React from 'react';
import './tasks.css'

function Completed(props) {
    console.log('Completed')

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
            {(props.tasks)?props.tasks.map((task,i)=>{
                return  <div key={i}>
                        {(task.isCompleted)?
                            <div className='items'>
                            <input type='checkbox' 
                            className='checkboxStyle'
                            checked={task.isCompleted}
                            onChange={()=>checkBoxHandler(i)} />
                            <input value={task.task} className='strike taskinput' onChange={taskNameUpdater} />
                            <button onClick={()=>xHandler(i)} >X</button>
                            </div>
                        :null}
                        </div>
            }):null}
        </div>
    )
}

export default React.memo(Completed);
