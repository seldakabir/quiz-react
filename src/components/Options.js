import React from 'react'

export default function Options({ questions, dispatch, answer ,point}) {
    const hasAnswer = answer != null

  console.log(hasAnswer);
    return (<div className='options'>
        
        {questions.options.map((option, index) => (
          
            <button className={`btn btn-options 
            
            ${hasAnswer ? index === questions.correctOption ?
                    'correct' : 'wrong':''}
                   `}
                key={option}
                disabled={answer!=null}
              onClick={() => dispatch({ type:'getAnswer',payload: index })}>
          {option}
        </button>
      ))}
    </div>
   
  );
}


