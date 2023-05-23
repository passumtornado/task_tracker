import { Box, Card, CardContent, Typography } from '@mui/material'
import { purple,red } from '@mui/material/colors'
import CloseIcon from '@mui/icons-material/Close';
import React from 'react'

const TaskList = ({task,onToggle,onDelete}) => {
  return (
    <div>
      <Card variant='contained' onDoubleClick={()=>onToggle(task.id)}  className={task.reminder ? 'active':''} sx={{background:'white',marginTop:'1rem',boxShadow:' 1px 1px 1px 1px rgba(0, 0, 0, 0.25)'}}>
        <CardContent>
           <Box sx={{display:'flex',justifyContent:'space-between',width:'100%'}}>
            <Box>
            <Typography>
                {task.title}
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
                {task.day}
            </Typography>
            </Box>
            <Box sx={{display:'flex',alignItems:'center',justifyContent:'center'}}>
            <CloseIcon sx={{ color: red[500] }} onClick={()=>onDelete(task.id)} />
            </Box>
           </Box>
        </CardContent>
      </Card>
    </div>
  )
}

export default TaskList
