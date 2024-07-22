import React, { useEffect } from 'react'

export default function Timer({ dispatch, setTime }) {
    const min = Math.floor(setTime / 60)
    const sec=setTime%60
    useEffect(function () {
       
     setInterval(function () {
              dispatch({type:'changeTime'})
           

          },1000)
    },[dispatch])
  return (
      <div className='timer'>
          {min < 10 && '0'}{min}:{ sec<10&&'0'}{sec}    
    </div>
  )
}
