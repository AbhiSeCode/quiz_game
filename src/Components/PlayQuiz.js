import React,{useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import Cookies from 'js-cookie'
import {Form} from './Form'

export const PlayQuiz = () => {
    const [user] = useState(useParams())

    useEffect(()=>{
        Cookies.set('id', user.id)
    },[user])
    return (
        <div>
            <header>
                <h1>Let's Play</h1>
            </header>
            <Form/>
        </div>
    )
}
