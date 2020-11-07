import React, {useState} from 'react'
import Cookies from 'js-cookie'

export const Question = ({ user, question, pointer, setPointer, score, setScore}) => {

    const [isClicked, setIsClicked]= useState(false)
    const [inputs, setInputs] = useState({r:null, w:null})


    const handleQuestion = (index) =>{
        const value=parseInt(index)
        if(user){
            if(question.answer === value){
                setInputs({r:value, w:null})
                setScore(score+1)
                setIsClicked(true)
            }
            else{
                setInputs({r:question.answer, w:value})
                setIsClicked(true)
            }
            Cookies.set('pointer', pointer+1,{expires:7})
            Cookies.set('score', score+1, {expires: 7})
        }
        else{
            question.answer = value
            setIsClicked(true)
        }
    }
    
    return (
        <div>
            {user && <h3>{Cookies.get('name')} : {score}</h3>}
            <section>
                <h4>Q.No.{pointer+1} { user ? user.name: 'You'} {question.question}</h4>
                <div className="options">
                    {question.options.map((option, index)=>{
                        return(
                        <button key={index} value={index}  className={isClicked? `option disabled ${inputs.r === parseInt(index) && 'right'} ${inputs.w === parseInt(index) && 'wrong'} ` : 'option'} onClick={(e)=>handleQuestion(e.target.value)} disabled={isClicked}>
                            {option}
                        </button>)
                    })}
                </div>
            </section>
            <button onClick={()=>{
                setPointer(pointer+1)
                setIsClicked(false)
                }} className={ isClicked ? "next":"next disabled"}>
                Next</button>
        </div>
    )
}
