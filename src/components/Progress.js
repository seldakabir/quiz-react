import React from 'react'

export default function Progress({index,questions,point,maxPoint,answer}) {
  return (
      <header className='progress'>
          <progress value={index+Number(answer!==null)} max={questions.length}></progress>
          <p>{index + 1}/{questions.length}</p>
          <p>{ point}/{maxPoint} Points</p>
    </header>
  )
}
