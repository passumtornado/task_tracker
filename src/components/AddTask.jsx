
import React,{useState} from 'react'
import { Button, FormControlLabel, FormGroup, FormLabel, Stack, TextField,  Checkbox} from '@mui/material'

const AddTask = ({setShow,onAddTask}) => {
  const [title,setTitle] = useState('')
  const [day,setDay] = useState('')
  const [reminder,setReminder] = useState(false)

  const handleSubmit = (e)=>{
    e.preventDefault()
    if(!title){
      alert('Please enter task title')
      return
    }
    onAddTask({title,day,reminder})
    // setShow(false)
    setTitle('')
    setDay('')
    setReminder('')
  }
  return (
    <form onSubmit={handleSubmit}>
     <FormGroup sx={{marginBottom:'1rem'}}>
      <FormLabel htmlFor='task'>Task</FormLabel>
      <TextField type='text' id='task'  size='small' value={title} onChange={e=>setTitle(e.target.value)}/>
       </FormGroup>
       <FormGroup sx={{marginBottom:'1rem'}}>
        <FormLabel htmlFor='task'>Day & time</FormLabel>
        <TextField type='date' id='task' size='small' value={day} onChange={e=>setDay(e.target.value)}/>
       </FormGroup>
       <FormGroup sx={{marginBottom:'1rem'}}>
        <FormControlLabel label='Set reminder'  control={<Checkbox checked={reminder} onChange={e=>setReminder(e.target.checked)}/>}/>
       </FormGroup>
      <FormGroup>
      <Button type='submit' variant='contained' color='primary'>Save Task</Button>
      </FormGroup>
      </form>
  )
}

export default AddTask
