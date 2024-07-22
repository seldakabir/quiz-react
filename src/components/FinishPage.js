import React from 'react'

export default function FinishPage({ point, dispatch,maxPoint }) {
     const percentage = (point / maxPoint) * 100
     let imoji
    if (percentage === 100) imoji = '💰'
    if (percentage>=80&& percentage<100) imoji = '😁'
    if (percentage >=60&& percentage<80) imoji = '⭐️'
    if (percentage <60) imoji = '😧'
   
  return (
       <>
        <p className="result">
            <span>{imoji }</span> You scored <strong>{point}</strong>
            out of {maxPoint}({Math.ceil(percentage)}%)
        </p>
            <button className="btn btn-ui" onClick={()=>dispatch({type:'reset'})}>Restart quiz</button>
            </>
  )
}
