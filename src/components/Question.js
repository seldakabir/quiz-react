import Options from "./Options"
export default function Question({ questions,dispatch,answer
 }) {
    
    return <>
        <h4>{questions.question}</h4>
        <Options questions={questions} dispatch={dispatch } answer={answer} />
        <button className="btn btn-ui">Next</button>
    </>
    
}
