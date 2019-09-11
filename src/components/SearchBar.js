import React,{useRef,useEffect} from 'react';
import './tasks.css'

function SearchBar(props) {
    console.log('SearchBar')
    let inputRef = useRef()

    useEffect(()=>{
        inputRef.current.focus()
    },[])

    let keyPressHandler=(e)=>{
        if(e.which === 13)
        props.submitHandler(e)
    }

    let setAllCompleted=()=>{
        let temp = JSON.parse(localStorage.getItem('temp'))
        temp.forEach((task)=>{
            task.isCompleted=true
        })
        localStorage.setItem('temp',JSON.stringify(temp))
        props.updater()
    }

    return (
        <div className='flex'>
        <div style={{'border':'2px solid black'}} className='items'>
            {(JSON.parse(localStorage.getItem('temp')).length)?<button 
            onClick={setAllCompleted}
            style={{'marginLeft':'-20px'}}>></button>:null}
            <input 
            ref={inputRef}
            type='text' 
            className='taskinput'
            placeholder='What needs to be done?'
            onChange={(e)=>props.updateText(e)}
            onKeyPress={keyPressHandler}
            value={props.textValue}
            style={{'marginLeft':'20px'}}
            />
        </div>
        </div>
    )
}

export default React.memo(SearchBar)