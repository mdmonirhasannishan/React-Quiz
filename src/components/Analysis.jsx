/* eslint-disable react/prop-types */
import Question from "../components/Question"
export default function Analysis ({answers}) {

    return (
        <div>
           <h1>Question Analysis</h1>
           <Question answers={answers}/>
        </div>
    )
}