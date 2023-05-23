import { Button } from '@mui/material'
import React from 'react'

const CustomButton = ({onShow,show}) => {
  return (
    <>
    <Button variant='contained' color={show ? 'error':'primary'} onClick={onShow}>
     {show ? 'Close':'Add Task'}
    </Button>
     {/* <button onClick={onShow}
      className={show ?'btn btn-red':'btn btn-blue'}>
        {show ?'Close':'Add Task'}</button> */}
    </>
   
  )
}

export default CustomButton
