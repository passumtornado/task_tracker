import { useEffect, useState } from 'react'
import axios from 'axios'
import Header from './components/Header'
import { Box, Stack, Typography,Badge, Chip, Skeleton } from '@mui/material'
import CustomButton from './components/CustomButton'
import AddTask from './components/AddTask'
import TaskList from './components/TaskList'
import { blue } from '@mui/material/colors'


function App() {
  const [tasks, setTasks] = useState([])
  const [show,setShow] = useState(false)
  const [isLoading,setIsloading] = useState(false)
  const handleShow = () =>{
     setShow(prevState =>!prevState)
  }
 
  // Get All Tasks
  const getAllTask = async () =>{
    const response = await axios('http://localhost:5000/tasks')
    const data = await response.data
    console.log(data)
    return data
  }

  // Get a Single Task
  // const getSingleTask = async (id) =>{
  //   const response = await axios(`http://localhost:5000/tasks/${id}`)
  //   const data = await response.data
  //   console.log(data)
  //   return data
  // }
//  Fetch API 
const getTask = async (id) =>{
  const res = await fetch(`http://localhost:5000/tasks/${id}`)
  const data = res.json()
  return data
}
//  Add Task
const addTask = async (task) =>{
  // const res = await axios.post('http://localhost:5000/tasks',task)
  // const data = await res.data
  // setTasks([data,...tasks])
  const res = await fetch('http://localhost:5000/tasks',{
    method:'POST',
    headers:{
      'content-type':'application/json'
    },
    body:JSON.stringify(task)
  })
  const data = await res.json()
  setTasks([data,...tasks])
}
useEffect(()=>{
  setIsloading(true)
  const getTasks = async ()=>{
    const tasksFromAPI = await getAllTask()
    setIsloading(false)
    setTasks(tasksFromAPI)
  }
  getTasks()
},[])

  // useEffect(()=>{
  //   setIsloading(true)
  //   const getTask = async ()=>{
  //     const taskFromServer = await fetchTasks()
  //     setIsloading(false)
  //     setTasks(taskFromServer)
  //   }
  //   getTask()
  // },[])
  // Fetch Tasks using API
  // const fetchTasks = async () =>{
  //   const res = await axios(`${URL}/tasks`)
  //   const data = await res.data
  //   return data
  //  }
  //  Fetch Single Task
  // const fetchTask = async (id) =>{
  //   const res = await axios(`${URL}/tasks/${id}`)
  //   const data = await res.data
  //   return data
  //  }
  // Add Task
  // const addTask = (task)=>{
  //   const res = await axios.post(`${URL}/tasks`,task)
  //   const data = await res.data
  //   setTasks([data,...tasks])
  //   const id = Math.floor(Math.random()*10000)+1
  //   const newTask = {id,...task}
  //   setTasks([newTask,...tasks])
  // }

  //Update Reminder
  const toggleReminder = async (id) =>{
    const singleTask = await getTask(id)
    const updatedTask = {...singleTask,reminder:!singleTask.reminder}
   console.log(singleTask)
    // const res = await axios.put(`http://localhost:5000/tasks/${id}`,updatedTask)
    const res = await fetch(`http://localhost:5000/tasks/${id}`,{
      method:'PUT',
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify(updatedTask)
    })
    const data = await res.json()
    console.log(data)
    setTasks(tasks.map(task=>
      task.id === id ? {
        ...task,
        reminder:data.reminder,
      }:task
    ))
  }
// Delete Task
  const deleteTask = async (id)=>{
     await axios.delete(`http://localhost:5000/tasks/${id}`)
    setTasks(tasks.filter((task)=>task.id !==id))
  }
  return (
    <div className="App">
      <Header/>
      <Box sx={{width:600,maxHeight:'100%',minHeight:'100vh',background:'#fff',padding:'.8rem 2rem'}}>
        <Box sx={{width:'100%',
            display:'flex',
            justifyContent:'space-between',
            alignItems:'center',
            marginTop:'1rem'}}>
          <Stack direction='row' spacing={2} sx={{display:'flex',alignItems:'center',justifyContent:'center'}}>
             <Typography>Total task:</Typography>
             {/* <Chip color="primary" label={tasks.length} size='small' /> */}
             <Skeleton variant="rounded" 
             width={20} height={22} 
             bgColor='primary'
             sx={{display:'flex',justifyContent:'center',alignItems:'center',background:blue[700],color:'white'}}
            animation={false}>
              {tasks.length}
              </Skeleton>
            </Stack>    
          <CustomButton onShow={handleShow} show={show} />
        </Box>
        <Box sx={{marginTop:'1rem'}}>
          {
            show &&  <AddTask setShow={setShow} onAddTask={addTask}/>
          }
        </Box>
        <Box sx={{marginTop:'2rem'}}>
          {
             isLoading && <h1>Loading...</h1>
          }
          {
            tasks.length > 0 ? tasks.map(task=>(
              <TaskList key={task.id} task={task} onToggle={toggleReminder} onDelete={deleteTask}/>
            )):(<Typography>No Task</Typography>)
          }
        </Box>
      </Box>
    </div>
  )
}

export default App
