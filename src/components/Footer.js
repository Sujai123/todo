import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom'
import './tasks.css'

function Footer(props) {
    console.log('footer')
    const [tasks,setTasks]= useState(props.tasks)
    const [displayClear,setDisplayClear] = useState(false)
    const [taskNotCompleted,setTaskNotCompleted] = useState(0)

    useEffect(()=>{
        setTasks(props.tasks)
        let flg, count=0
        props.tasks.forEach((task)=>{
            if(task.isCompleted){
                count++
                flg=true
            }
        })
        if(flg)
        setDisplayClear(true)
        else
        setDisplayClear(false)
        setTaskNotCompleted(count)
    },[props.tasks])

    let removeCompleted=()=>{
        let temp = props.tasks.filter((task)=>{
            return !task.isCompleted
        })
        localStorage.setItem('temp',JSON.stringify(temp))
        props.updater()
    }


    return (
        <div className='flex' style={{'fontSize':'0.8rem'}}>
            <div className='items' style={{'display':'flex','justifyContent':'space-between'}}>
            <p>{(tasks)?tasks.length-taskNotCompleted:null} items left</p>
            <p><Link to='/'>All</Link></p>
            <p><Link to='/active'>Active</Link></p>
            <p><Link to='/completed'>Completed</Link></p>
            <p>{displayClear?<span className='clearCompleted' onClick={removeCompleted}>clear completed</span>:''}</p>
            </div>
        </div>
    )
}

export default React.memo(Footer);
