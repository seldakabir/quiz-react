import { useEffect, useReducer } from 'react';
import '../App.css';
import '../index.css'
import Header from './Header'
import Loader from './Loader';
import Main from './Main';
import StartScreen from './StartScreen';
import Question from './Question';
import Error from './Error';
const initialState = {
  questions: [],
  //loading,start,active,answered,finish,error
  status: 'loading',
  index: 0,
  answer: null,
  
  
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
      return {
        ...state,
       answer:action.payload
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
const [{questions,status,index,answer},dispatch]=useReducer(reduce,initialState)
  useEffect(function () {
    fetch('http://localhost:9000/questions')
      .then(res => res.json())
      .then(data => dispatch({ type: 'dataRieved', payload: data }))
      .catch(err => dispatch({ type: 'errorFetch' }))
    
  },[dispatch])
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
          
          <Question
          questions={questions[index]}
          index={index} dispatch={dispatch}
          answer={answer}
         />} 
      </Main>
    
    </div>
  );
}

export default App;
