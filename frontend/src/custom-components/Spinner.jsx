import React from 'react'
import {HashLoader} from "react-spinners"

const Spinner = () => {
  return (
    <div className='w-full min-h-[600px] flex justify-center items-center'>
      <HashLoader size={130} color='#362bd6'/>
    </div>
  )
}

export default Spinner