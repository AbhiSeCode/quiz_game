import React from 'react'
import {Form} from './Form'
import { Players } from './Players'
import { useParams } from 'react-router-dom'


export const Result = () => {
    const value= useParams()
    return(
        <>
            <header>
                <h1>Create your own quiz here</h1>
            </header>
            <Form/>
            <Players id={value.id}/>
        </>
    )
}
