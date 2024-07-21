import React from 'react'

export default function Progress({index,questions,point,maxPoint}) {
  return (
      <div className='progress'>
          <p>{index + 1}/{questions.length}</p>
          <p>{ point}/{maxPoint} Points</p>
    </div>
  )
}
