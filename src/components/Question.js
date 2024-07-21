import Options from "./Options"
export default function Question({ questions,dispatch,answer,point
 }) {
    
    return <>
        <h4>{questions.question}</h4>
        <Options questions={questions}
            dispatch={dispatch}
            answer={answer}
            point={point}
        />
        <button className="btn btn-ui" onClick={()=>dispatch({type:'nextQuestion'})}>Next</button>
    </>
    
}
