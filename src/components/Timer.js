import React, { useEffect } from 'react'

export default function Timer({ dispatch,setTime }) {
    useEffect(function () {
       
     setInterval(function () {
              dispatch({type:'changeTime'})
           

          },1000)
    },[dispatch])
  return (
      <div className='timer'>
      {setTime}    
    </div>
  )
}
