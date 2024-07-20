

export default function StartScreen ({index,questions}) {
    return <div className="start">
        <h2>Wlcome to the ract quiz!</h2>
        <h3 >{questions.length} questions to test your react mastery</h3>
        <button className="btn " >Let's start</button>
    </div>
  
}
