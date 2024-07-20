import { useEffect, useReducer } from 'react';
import '../App.css';
import Header from './Header'
import Loader from './Loader';
import Main from './Main';
import Question from './Question';
const initialState = {
  questions: [],
  //loading,start,active,finish,error
  status: 'loading',
  index: 0,
  
}
function reduce(action,state) {
  switch (action.type) {
    case 'loading':
      return { ...state }
    case 'active':
      return {...state,questions:action.payload}
    case 'error':
      return {}
    
    default:
      throw new Error('there is an error')
    
  }
}




function App() {
const [{questions,status,index},dispatch]=useReducer(reduce,initialState)
  useEffect(function () {
    fetch('http://localhost:9000/questions')
      .then(res => res.json())
      .then(data =>dispatch({type:'active',payload:data}))
    .catch(err=>dispatch({type:'error'}))
  },[dispatch])
  return (
    <div className="App">
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        
        <Question/>
      </Main>
    
    </div>
  );
}

export default App;
