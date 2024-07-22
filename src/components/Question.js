import Options from "./Options"
import NextButton from "./NextButton";
export default function Question({ questions,dispatch,answer,point
 ,index,maxLength}) {
   

    return <>
        <h4>{questions.question}</h4>
        <Options questions={questions}
            dispatch={dispatch}
            answer={answer}
            point={point}
        />
        {index < maxLength - 1 &&
            <NextButton dispatch={dispatch} answer={answer}>Next</NextButton>

        }
        {index === maxLength - 1 &&
<button className="btn btn-ui"
         onClick={() => dispatch({ type: 'finishQuiz' })}>
         Finished</button>        }
    </>
    
}
