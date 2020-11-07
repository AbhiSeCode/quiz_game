import React, {useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import {Question} from './Question'
import { useHistory } from 'react-router-dom'
import {Loading} from './Loading'

export const Quiz = () => {
 
    const [questions, setQuestions] =useState([])
    const [user, setUser] = useState(null)
    const [score, setScore] = useState(0)
    const [pointer, setPointer]= useState(0)
    const [name] = useState(Cookies.get('name'))
    const history = useHistory()

    const url = window.location.origin //"http://192.168.0.102:8080"

    const sendScore = async() =>{
        const id= Cookies.get('id')
        Cookies.remove('id')
        await fetch(`${url}/user/setscore`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id, score: {name, score} })
        })
        .then(response=> {
            if(response.status !== 200){
                throw new Error('Unable to send your score')
            }
            response.json()
            Cookies.remove('id')
            Cookies.remove('score')
            Cookies.remove('pointer')
            history.push(`/result/${id}`)
        })
        .catch(error=>{
            alert(error)
            Cookies.remove('name')
            Cookies.remove('id')
            Cookies.remove('score')
            Cookies.remove('pointer')
            history.push(`/playquiz/${id}`)
        })
    }

    const createQuiz = async() =>{
       await fetch(`${url}/user/createquiz`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, questions})
        })
        .then(response=>{
           if(response.status !== 201){
               throw new Error(response.statusText)
           }
            return response.json()
            
        })
        .then(data=>{
            Cookies.set('id', data.userID, {expires: 7})
            history.push('/dashboard')
        })
        .catch(error=>{
            alert(error)
            Cookies.remove('name')
            history.push('/')
        })
    }

    const gettingData = async()=>{
    await fetch(`${url}/questions/getquestions`)
       .then(response=> {
           if(response.status !== 200){
               throw new Error(response.statusText)
           }
           return response.json()
        })
       .then(data=> setQuestions(data))
       .catch(error=>{
            alert(error)
            Cookies.remove('name')
            history.push('/')
        })
    }

    const gettingQuiz = async()=>{
        await fetch(`${url}/user/getquiz?user=${Cookies.get('id')}`)
        .then(response=> {
            if(response.status !== 200){
                throw new Error('Link is not valid')
            }
            return response.json()})
       .then(data=> setUser(data))
       .catch(error=>{
            alert(error)
            Cookies.remove('name')
            Cookies.remove('id')
            Cookies.remove('score')
            Cookies.remove('pointer')
            history.push('/')
        })
    }

    useEffect(()=>{
        if(Cookies.get('id')){
            gettingQuiz()
            if(Cookies.get('pointer')){
                setPointer(parseInt(Cookies.get('pointer')))
                setScore(parseInt(Cookies.get('score')))
            }
        }else{
            gettingData()   
        }
    },[])


    useEffect(()=>{
        if(user){
            setQuestions(user.questions)
        }
    },[user])
   
    if(questions.length === 0){
      return  <Loading/>
    }
    else if(pointer === questions.length){
        if(user){
            sendScore()
        }else{
            createQuiz()
        }
        return <></>
    }
    else{
        return (
            <>
                <div className="questions">
                    <Question user={user} question={questions[pointer]} score={score} setScore={setScore} setPointer={setPointer} pointer={pointer}/>
                </div>
            </>
        )
    }
}
