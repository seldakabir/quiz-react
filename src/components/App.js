import { useEffect, useReducer } from 'react';
import '../App.css';
import Header from './Header'
import Loader from './Loader';
import Main from './Main';
import StartScreen from './StartScreen';
import Question from './Question';
import Error from './Error';
const initialState = {
  questions: [],
  //loading,start,active,finish,error
  status: 'loading',
  index: 0,
  
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
        status:'active'
        
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
const [{questions,status,index},dispatch]=useReducer(reduce,initialState)
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
          questions={questions}
          index={index}
         />} 
      </Main>
    
    </div>
  );
}

export default App;
