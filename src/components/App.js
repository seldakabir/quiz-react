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
import Timer from './Timer';
const initialState = {
  questions: [],
  //loading,start,active,answered,finish,error
  status: 'loading',
  index: 0,
  answer: null,
  point: 0,
  setTime:null,

  
  
  
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
       const time=state.questions.length*30

      return {
        ...state,
        status: 'active',
        
       setTime:time
    
        
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
    case 'changeTime':
      return {
        ...state,
        setTime: state.setTime > 0 ? state.setTime - 1 :
          state.setTime,
        status:state.setTime===0 ?'finished':state.status
      
      }
    case 'reset':
      return {
        ...initialState,
        status: 'ready',
        questions: state.questions
        
      }
    default:
      throw new Error('there is an error')
    
  }
}




function App() {
const [{questions,status,index,answer,point,setTime},dispatch]=useReducer(reduce,initialState)
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
    <div className="app">
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
          <Timer  setTime={setTime} dispatch={dispatch}/>
         
          </>
        } 
        {status === 'finished'
          
          && <FinishPage
          point={point} 
          dispatch={dispatch}
          maxPoint={maxPoint}
            />}
      </Main>
    
    </div>
  );
}

export default App;
