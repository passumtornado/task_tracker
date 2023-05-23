import { Box, Typography } from '@mui/material'
import { indigo, red } from '@mui/material/colors'
import React from 'react'

const Header = () => {
  return (
    <Box 
     sx={{width:600,
     height:100,
     display:'flex',
     justifyContent:'center',
     alignItems:'center',
     backgroundColor:'#0D0745',
     textAlign:'center',
     color:red[50]}}>
      <Typography variant='h6'>
        Task Tracker Application
      </Typography>
    </Box>
  )
}

export default Header
