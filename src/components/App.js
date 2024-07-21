import { useEffect, useReducer } from 'react';
import '../App.css';
import '../index.css'
import Header from './Header'
import Loader from './Loader';
import Main from './Main';
import StartScreen from './StartScreen';
import Question from './Question';
import Error from './Error';
import Progress from './Progress';
import FinishPage from './FinishPage'
const initialState = {
  questions: [],
  //loading,start,active,answered,finish,error
  status: 'loading',
  index: 0,
  answer: null,
  point:0
  
  
  
}
function reduce(state,action) {
  switch (action.type) {
    case 'dataRieved':
      return {
        ...state,
        questions: action.payload,
        status: 'ready'
      }
    case 'showQuestions':
      return {
        ...state,
        status: 'active',
    
        
      }
    case 'getAnswer':
      const question=state.questions.at(state.index)
      return {
        ...state,
        answer: action.payload,
        point: question.correctOption === action.payload ?
          state.point + question.points :
          state.point
      }
     case 'nextQuestion':
     return {
       ...state,
       index: state.index + 1,
        answer:null
     }
    case 'finishQuiz':
      return {
        ...state,
        status:'finished'
      }
    case 'errorFetch':
      return {
        ...state,
        status: 'error'
      }
    
    default:
      throw new Error('there is an error')
    
  }
}




function App() {
const [{questions,status,index,answer,point},dispatch]=useReducer(reduce,initialState)
  useEffect(function () {
    fetch('http://localhost:9000/questions')
      .then(res => res.json())
      .then(data => dispatch({ type: 'dataRieved', payload: data }))
      .catch(err => dispatch({ type: 'errorFetch' }))
    
  }, [dispatch])
   const maxPoint = questions.reduce((cur, next)=>{
    return cur + next.points;
   }, 0)
  const maxLength=questions.length
  return (
    <div className="App">
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen 
          index={index}
          questions={questions}
          dispatch={dispatch}

        />}
       {status === 'active' &&
          <>
          <Progress 
            questions={questions}
            index={index}
            point={point}
            maxPoint={maxPoint}
            answer={answer}
           />
          <Question
          questions={questions[index]}
          index={index}
          dispatch={dispatch}
          answer={answer}
            point={point}
            maxLength={maxLength}
            
          />
          
         
          </>
        } 
        {status === 'finished'
          
         && <FinishPage/>}
      </Main>
    
    </div>
  );
}

export default App;
