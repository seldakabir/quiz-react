
export default function Question({ questions,index }) {
    
    return <div>
        <p>{questions[index].question}</p>
        {questions.map((question,index) =>
            <button>{question.options[index] }</button>)}
  </div>
}
