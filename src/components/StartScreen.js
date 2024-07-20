

export default function StartScreen ({index,questions,dispatch}) {
    return <div className="start">
        <h2>Wlcome to the ract quiz!</h2>
        <h3 >{questions.length} questions to test your react mastery</h3>
        <button className="btn " onClick={()=>dispatch({type:'showQuestions'})} >Let's start</button>
    </div>
  
}
