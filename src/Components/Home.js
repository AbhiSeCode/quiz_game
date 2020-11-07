import React, {useEffect} from 'react'
import Cookies from 'js-cookie'
import {useHistory} from 'react-router-dom'
import {Form} from './Form'


export const Home = () => {
    const history = useHistory()
    useEffect(()=>{
        if(Cookies.get('id')){
            history.push('/dashboard')
        }
    },[])
    
    return (
        <>
            <header>
                <h1>Welcome</h1>
            </header>
            <Form/>
        </>
    )
}
