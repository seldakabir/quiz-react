import Options from "./Options"
export default function Question({ questions,dispatch,answer,point
 ,index,maxLength}) {
    console.log(index);
    return <>
        <h4>{questions.question}</h4>
        <Options questions={questions}
            dispatch={dispatch}
            answer={answer}
            point={point}
        />
        {index < maxLength - 1 &&
            <button className="btn btn-ui" onClick={() => dispatch({ type: 'nextQuestion' })}>Next</button>
        }
        {index === maxLength - 1 &&
                        <button className="btn btn-ui" onClick={() => dispatch({ type: 'finishQuiz' })}>Finished</button>

        }
    </>
    
}
